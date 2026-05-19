import { Router } from 'express';
import { getProducts, searchProducts, getProductById, debugProducts } from '../controllers/productController.js';
import cacheMiddleware from '../middleware/cache.js';

const router = Router();

router.get('/', cacheMiddleware(), getProducts);
router.get('/search', searchProducts);
router.get('/debug', debugProducts);
router.get('/:id', cacheMiddleware(), getProductById);

export default router;

