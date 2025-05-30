import { Router } from 'express';
import {
	customerProfile,
	deleteCustomerProfile,
	updateCustomerProfile,
	forgetPassword,
	registerCustomer,
	resetLink,
	
} from '../controllers/customer.controllers';
import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

//Register routes
router.route('/register').post(registerCustomer);

router
	.route('/account')
	.get(jwtAuthMiddleware, customerProfile)
	.put(jwtAuthMiddleware, updateCustomerProfile)
	.delete(jwtAuthMiddleware, deleteCustomerProfile);
// router
// 	.route('/address/:id')
// 	.post(jwtAuthMiddleware, createAddress)
// 	.get(jwtAuthMiddleware, getAddresses)
// 	.put(jwtAuthMiddleware, updateAddress)
// 	.delete(jwtAuthMiddleware, deleteAddress);

// router
// 	.route('/settings')
// 	.get(jwtAuthMiddleware, getUserSettings)
// 	.put(jwtAuthMiddleware, updateUserSettings);

// router.route('/notification').get(jwtAuthMiddleware, getUserNotification);
router.route('/forget-password').post(forgetPassword);
router.route('/reset-link').post(resetLink);

export default router;
