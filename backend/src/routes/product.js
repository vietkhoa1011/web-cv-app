import { Router } from 'express';
import { getProducts, debugProducts } from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.get('/debug', debugProducts);

export default router;
