import { Router } from 'express';
import {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore,
    getStoreSettings,
   
    // updateStore,
    // deleteStore,
    // updateStoreSettings,
} from '../controllers/store.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Store routes
router
    .route('/')
    .get(jwtAuthMiddleware, getStores)
    .post(jwtAuthMiddleware, createStore)
    .put(jwtAuthMiddleware, updateStore)

router
    .route('/:id')
    .get(jwtAuthMiddleware, getStoreById)
    .delete(jwtAuthMiddleware, deleteStore);

router
    .route('/settings/:id')
    .get(jwtAuthMiddleware, getStoreSettings)
    // .put(jwtAuthMiddleware, updateStoreSettings);

export default router;