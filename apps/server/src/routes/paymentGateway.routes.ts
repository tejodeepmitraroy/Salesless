import { Router } from 'express';

import {
	initiatePayment,
	verifyPayment,
} from '../controllers/payment.controllers';

// import { jwtAuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Product routes
router.route('/').get(initiatePayment);

router.route('/create').get(initiatePayment);
router.route('/verifyPayment').post(verifyPayment);

export default router;
