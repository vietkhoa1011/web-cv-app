// models/Order.js
import mongoose from "mongoose";
const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    // Snapshot: lưu thông tin sản phẩm tại thời điểm đặt hàng
    snapshot: {
        title: { type: String, required: true },
        image: { type: String, required: true },
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
        index: true
    },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema, "orders");
