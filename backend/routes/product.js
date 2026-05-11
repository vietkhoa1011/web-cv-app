import { Router } from 'express';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

const router = Router();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const { category, page = 1, limit = 12 } = req.query;

        console.log('=== API CALLED ===');
        console.log('Category param:', category);
        // Xây dựng filter
        let filter = {};

        if (category && category.trim() !== '') {
            const cleanCategory = category.trim();

            // Kiểm tra xem category có phải là ObjectId không
            const isObjectId = mongoose.Types.ObjectId.isValid(cleanCategory);

            if (isObjectId) {
                filter.category = new mongoose.Types.ObjectId(cleanCategory);
            } else {
                // Dùng regex case-insensitive
                filter.category = {
                    $regex: new RegExp(`^${cleanCategory.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
                };
            }

            // Debug
            const matchCount = await Product.countDocuments(filter);
            console.log(`Category "${cleanCategory}" matches: ${matchCount} products`);

            if (matchCount === 0) {
                const allCats = await Product.distinct('category');
                console.log('Available categories:', allCats);
            }
        }
        // Pagination
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 12;
        const skip = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .skip(skip)
            .limit(limitNum)
            .lean();

        console.log(`Found ${products.length}/${total} products`);
        res.json({
            success: true,
            data: products,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                itemsPerPage: limitNum,
            },
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Debug route
router.get('/debug', async (req, res) => {
    try {
        const products = await Product.find().limit(5).lean();
        const categories = await Product.distinct('category');

        res.json({
            sampleProducts: products.map(p => ({
                title: p.title?.substring(0, 30),
                category: p.category,
                categoryType: typeof p.category,
                isObjectId: mongoose.Types.ObjectId.isValid(p.category?.toString() || '')
            })),
            allCategories: categories,
            categoryTypes: categories.map(c => typeof c),
            totalProducts: await Product.countDocuments()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

