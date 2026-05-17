import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
});

// Indices for search performance
productSchema.index({ title: 1, description: 1 });
productSchema.index({ category: 1, price: 1, 'rating.rate': 1 });

export default mongoose.model("Product", productSchema, "products");


