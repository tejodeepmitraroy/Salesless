import { Router } from 'express';
import {
	customerProfile,
	deleteCustomerProfile,
	updateCustomerProfile,
	forgetPassword,
	registerCustomer,
	resetLink,
	logoutCustomer,
	createCustomerAddress,
	getCustomerAddresses,
	updateCustomerAddress,
	deleteCustomerAddress,
	updateCustomerDefaultAddress,
} from '../controllers/customer.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';
import { getStoreCustomers } from '../controllers/store.controllers';
import { storeMiddleware } from '../middleware/store.middleware';

const router = Router();

//Register routes
router.route('/register').post(registerCustomer);

router
	.route('/account')
	.get(jwtAuthMiddleware, customerProfile)
	.put(jwtAuthMiddleware, updateCustomerProfile)
	.delete(jwtAuthMiddleware, deleteCustomerProfile);

router
	.route('/address')
	.post(jwtAuthMiddleware, createCustomerAddress)
	.get(jwtAuthMiddleware, getCustomerAddresses);

router
	.route('/address/:addressId')
	.get(jwtAuthMiddleware, getCustomerAddresses)
	.put(jwtAuthMiddleware, updateCustomerAddress)
	.delete(jwtAuthMiddleware, deleteCustomerAddress)
	.patch(jwtAuthMiddleware, updateCustomerDefaultAddress);

router.route('/forget-password').post(forgetPassword);
router.route('/reset-link').post(resetLink);
router.route('/logout').post(logoutCustomer);

//Store Customer routes
router.route('/').get(jwtAuthMiddleware, storeMiddleware, getStoreCustomers);
router
	.route('/:customerId')
	.get(jwtAuthMiddleware, storeMiddleware, getStoreCustomers);

export default router;
