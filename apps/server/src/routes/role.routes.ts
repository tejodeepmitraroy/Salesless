import { Router } from 'express';
import {

	localAuthMiddleware,
} from '../middleware/auth.middleware';
import {
	generateRefreshToken,
	// googleCallback,
	loginUser,
	logoutUser,

	// generateRefreshToken,
} from '../controllers/auth.controllers';
import {} from '../controllers/user.controllers';
import { createRole } from '../controllers/role.controllers';


const router = Router();

router.route('/create').post(createRole);
// router.route('/google/callback').get(googleOAuthCallback, googleCallback);
router.route('/refresh-token').get(generateRefreshToken);
router.route('/user/login').post(localAuthMiddleware, loginUser);
router.route('/customer/login').post(localAuthMiddleware, loginUser);

router.route('/logout').post(logoutUser);

export default router;
