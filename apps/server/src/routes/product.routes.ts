import { Router } from 'express';

import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller';

const router = Router();


// Product routes
router
    .route('/')
    .get(jwtAuthMiddleware, getAllProducts)
    .post(jwtAuthMiddleware, createProduct);

router
    .route('/:id')
    .get(jwtAuthMiddleware, getProductById)
    .put(jwtAuthMiddleware, updateProduct)
    .delete(jwtAuthMiddleware, deleteProduct);

export default router;