import Order from "../models/Order.js";
import Product from "../models/Product.js";

/**
 * POST /api/orders
 * Tạo đơn hàng mới từ danh sách sản phẩm được chọn trong giỏ hàng.
 *
 * Body: { items: [{ productId, quantity }] }
 *
 * Logic bảo mật:
 * - Lấy giá từ database (không dùng giá từ frontend)
 * - Tạo snapshot (tên, ảnh) tại thời điểm đặt
 */
export async function createOrder(req, res) {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty. Please add items." });
        }

        // Lấy danh sách product IDs
        const productIds = items.map(item => item.productId);
        const uniqueIds = [...new Set(productIds)];

        // Fetch products từ database (lấy giá thật, không dùng giá từ frontend)
        const products = await Product.find({ _id: { $in: uniqueIds } }).lean();

        if (products.length === 0) {
            return res.status(400).json({ success: false, message: "No valid products found." });
        }

        // Build order items với giá từ database + snapshot
        const orderItems = [];
        let total = 0;

        for (const item of items) {
            const product = products.find(p => p._id.toString() === item.productId);

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.productId} not found.`
                });
            }

            const quantity = Math.max(1, Math.floor(Number(item.quantity)));

            orderItems.push({
                product: product._id,
                quantity,
                price: product.price, // Lấy giá từ DB, KHÔNG từ frontend
                snapshot: {
                    title: product.title,
                    image: product.image,
                },
            });

            total += product.price * quantity;
        }

        // Tạo đơn hàng
        const order = await Order.create({
            user: userId,
            items: orderItems,
            total: Math.round(total * 100) / 100, // Làm tròn 2 chữ số
            status: "pending",
        });

        // Populate để trả về dữ liệu đầy đủ
        const populatedOrder = await Order.findById(order._id)
            .populate("user", "username email")
            .lean();

        return res.status(201).json({
            success: true,
            data: populatedOrder,
            message: "Order created successfully.",
        });

    } catch (err) {
        console.error("❌ createOrder error:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to create order.",
        });
    }
}

/**
 * GET /api/orders
 * Lấy danh sách đơn hàng của user hiện tại (phân trang).
 */
export async function getMyOrders(req, res) {
    try {
        const userId = req.user.id;
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(20, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            Order.find({ user: userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments({ user: userId }),
        ]);

        return res.json({
            success: true,
            data: orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: limit,
            },
        });

    } catch (err) {
        console.error("❌ getMyOrders error:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch orders.",
        });
    }
}

/**
 * GET /api/orders/:id
 * Lấy chi tiết một đơn hàng (chỉ chủ sở hữu hoặc admin).
 */
export async function getOrderById(req, res) {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "username email")
            .lean();

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        // Chỉ cho phép chủ sở hữu hoặc admin xem
        if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied." });
        }

        return res.json({ success: true, data: order });

    } catch (err) {
        console.error("❌ getOrderById error:", err.message);
        return res.status(500).json({
            success: false,
            message: err.message || "Failed to fetch order.",
        });
    }
}
