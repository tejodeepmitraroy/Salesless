import { Router } from 'express';
import {
	sendEmailVerification,
	sendPasswordReset,
	// sendPasswordReset,
	// sendPasswordChangeAlert,
	// sendNewDeviceLoginAlert,
	// sendWelcomeEmail,
} from '../controllers/auth.controller';

const router = Router();

// Authentication related emails
router.route('/verify-email').post(sendEmailVerification);
router.route('/password-reset').post(sendPasswordReset);
// router.route("/password-change-alert").post(sendPasswordChangeAlert);
// router.route("/new-device-login").post(sendNewDeviceLoginAlert);
// router.route("/welcome").post(sendWelcomeEmail);

export default router;
