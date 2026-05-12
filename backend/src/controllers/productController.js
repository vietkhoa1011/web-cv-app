import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
    try {
        const { category, page = 1, limit = 12 } = req.query;
        let filter = {};

        if (category && category.trim() !== '') {
            const cleanCategory = category.trim();
            if (mongoose.Types.ObjectId.isValid(cleanCategory)) {
                filter.category = new mongoose.Types.ObjectId(cleanCategory);
            } else {
                filter.category = { $regex: new RegExp(`^${cleanCategory}`, 'i') };
            }
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 12;
        const skip = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter).skip(skip).limit(limitNum).lean();

        res.json({
            success: true,
            data: products,
            pagination: { totalPages: Math.ceil(total / limitNum), totalItems: total },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logic debug
export const debugProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(5).lean();
        const categories = await Product.distinct('category');
        res.json({ sampleProducts: products, allCategories: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
