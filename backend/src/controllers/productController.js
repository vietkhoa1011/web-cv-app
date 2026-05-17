import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Lấy danh sách sản phẩm với tìm kiếm và lọc
export const getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            priceMin,
            priceMax,
            rating,
            page = 1,
            limit = 12
        } = req.query;

        let filter = {};

        // Text search in title/description using $regex
        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i');
            filter.$or = [
                { title: searchRegex },
                { description: searchRegex }
            ];
        }

        // Category filter
        if (category && category.trim()) {
            const cleanCategory = category.trim();
            if (mongoose.Types.ObjectId.isValid(cleanCategory)) {
                filter.category = new mongoose.Types.ObjectId(cleanCategory);
            } else {
                filter.category = { $regex: new RegExp(`^${cleanCategory}`, 'i') };
            }
        }

        // Price range filter
        const priceConditions = {};
        if (priceMin !== undefined && priceMin !== '' && !isNaN(priceMin)) {
            priceConditions.$gte = parseFloat(priceMin);
        }
        if (priceMax !== undefined && priceMax !== '' && !isNaN(priceMax)) {
            priceConditions.$lte = parseFloat(priceMax);
        }
        if (Object.keys(priceConditions).length > 0) {
            filter.price = priceConditions;
        }

        // Rating filter (minimum rating)
        if (rating !== undefined && rating !== '' && !isNaN(rating)) {
            const minRating = parseFloat(rating);
            if (minRating > 0) {
                filter['rating.rate'] = { $gte: minRating };
            }
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 12;
        const skip = (pageNum - 1) * limitNum;

        console.log('🔍 Backend Filter:', JSON.stringify(filter, null, 2)); // Debug log

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
            .skip(skip)
            .limit(limitNum)
            .lean();

        console.log(`📊 Results: ${products.length} items (total ${total})`); // Debug log

        // Get available filter options for frontend
        const allCategories = await Product.distinct('category');
        const priceStats = await Product.aggregate([
            { $group: { _id: null, minPrice: { $min: '$price' }, maxPrice: { $max: '$price' } } }
        ]);

        res.json({
            success: true,
            data: products,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalItems: total,
                itemsPerPage: limitNum
            },
            filters: {
                categories: allCategories || [],
                priceRange: priceStats[0] || { minPrice: 0, maxPrice: 0 }
            }
        });
    } catch (error) {
        console.error('❌ Search error:', error); // Debug log
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID sản phẩm không hợp lệ',
            });
        }
        const product = await Product.findById(id).lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy sản phẩm',
            });
        }

        res.json({
            success: true,
            data: product,
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

