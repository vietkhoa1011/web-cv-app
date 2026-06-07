import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

// Tất cả các route đều yêu cầu xác thực
router.use(verifyToken);

// POST /api/orders - Tạo đơn hàng mới
router.post("/", createOrder);

// GET /api/orders - Lấy danh sách đơn hàng của user
router.get("/", getMyOrders);

// GET /api/orders/:id - Lấy chi tiết đơn hàng
router.get("/:id", getOrderById);

export default router;
