import { Router } from 'express';
import {
	createStore,
	getStores,
	getStoreById,
	updateStore,
	deleteStore,
	getStoreSettings,
	updateStoreAddressSettings,
	updateStoreGeneralSettings,

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
	.put(jwtAuthMiddleware, updateStore);

router
	.route('/:storeId')
	.get(jwtAuthMiddleware, getStoreById)
	.delete(jwtAuthMiddleware, deleteStore);

// //customers Routes
// router.route('/:storeId/customers').get(jwtAuthMiddleware, getStoreCustomers);
// router
// 	.route('/:storeId/customers/:customerId')
// 	.get(jwtAuthMiddleware, getStoreCustomers);

//orders Routes
// router.route('/:storeId/orders').get(jwtAuthMiddleware, getStoreOrders);
// router
// 	.route('/:storeId/orders/:orderId')
// 	.get(jwtAuthMiddleware, getStoreOrders);
// .put(jwtAuthMiddleware, updateStoreSettings);

//Settings Routes
router
	.route('/:storeId/address-settings')
	.put(jwtAuthMiddleware, updateStoreAddressSettings);
router.route('/:storeId/settings').get(jwtAuthMiddleware, getStoreSettings);
// .put(jwtAuthMiddleware, updateStoreSettings);
router
	.route('/:storeId/general-settings')
	.put(jwtAuthMiddleware, updateStoreGeneralSettings);

export default router;
