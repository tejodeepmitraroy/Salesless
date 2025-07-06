import { Request, Response } from 'express';
import ApiResponse from '../utils/ApiResponse';
import asyncHandler from '../utils/asyncHandler';

// Import email components

// Email Verification
export const sendEmailVerification = asyncHandler(
	async (request: Request, response: Response) => {
		const { to, userFirstName, verificationLink } = request.body;

		try {
			// console.log("Email Verification",<EmailVerificationTemplate />)
			// const html = await pretty(await render(<EmailVerificationTemplate />));

			// const { data, error } = await resend.emails.send({
			//   from: 'SalesSync <info@salesless.tejodeepmitraroy.com>',
			//   to: Array.isArray(to) ? to : [to],
			//   subject: 'Verify Your Email Address',
			//   html: html
			// });

			response
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ to, userFirstName, verificationLink },
						'Verification email sent successfully'
					)
				);
		} catch (error) {
			console.log(error);
			response
				.status(500)
				.json(new ApiResponse(500, null, 'Failed to send verification email'));
		}
	}
);

// // Password Reset
// export const sendPasswordReset = asyncHandler(
//   async (request: Request, response: Response) => {
//     const { to, userFirstName, resetLink } = request.body;

//     try {
//       const emailComponent = React.createElement(PasswordReset, {
//         userFirstName,
//         resetLink,
//       }, null);

//       const data = await sendEmail({
//         to: Array.isArray(to) ? to : [to],
//         subject: "Password Reset Request",
//         template: emailComponent,
//       });

//       response
//         .status(200)
//         .json(
//           new ApiResponse(200, data, "Password reset email sent successfully")
//         );
//     } catch (error) {
//       console.log(error);
//       response
//         .status(500)
//         .json(
//           new ApiResponse(500, null, "Failed to send password reset email")
//         );
//     }
//   }
// );

// // Password Change Alert
// export const sendPasswordChangeAlert = asyncHandler(
//   async (request: Request, response: Response) => {
//     const { to, userFirstName } = request.body;

//     try {
//       const emailComponent = React.createElement(PasswordChangeAlert, {
//         userFirstName,
//       }, null);

//       const data = await sendEmail({
//         to: Array.isArray(to) ? to : [to],
//         subject: "Password Changed Successfully",
//         template: emailComponent,
//       });

//       response
//         .status(200)
//         .json(
//           new ApiResponse(200, data, "Password change alert sent successfully")
//         );
//     } catch (error) {
//       console.log(error);
//       response
//         .status(500)
//         .json(
//           new ApiResponse(500, null, "Failed to send password change alert")
//         );
//     }
//   }
// );

// // New Device Login Alert
// export const sendNewDeviceLoginAlert = asyncHandler(
//   async (request: Request, response: Response) => {
//     const { to, userFirstName, deviceInfo, timestamp } = request.body;

//     try {
//       const emailComponent = React.createElement(NewDeviceLoginAlert, {
//         userFirstName,
//         deviceInfo,
//         timestamp,
//       }, null);

//       const data = await sendEmail({
//         to: Array.isArray(to) ? to : [to],
//         subject: "New Login Detected",
//         template: emailComponent,
//       });

//       response
//         .status(200)
//         .json(new ApiResponse(200, data, "Login alert sent successfully"));
//     } catch (error) {
//       console.log(error);
//       response
//         .status(500)
//         .json(new ApiResponse(500, null, "Failed to send login alert"));
//     }
//   }
// );

// // Welcome Email
// export const sendWelcomeEmail = asyncHandler(
//   async (request: Request, response: Response) => {
//     const { to, userFirstName } = request.body;

//     try {
//       const emailComponent = React.createElement(WelcomeEmail, {
//         userFirstName,
//       }, null);

//       const data = await sendEmail({
//         to: Array.isArray(to) ? to : [to],
//         subject: "Welcome to SalesSync!",
//         template: emailComponent,
//       });

//       response
//         .status(200)
//         .json(new ApiResponse(200, data, "Welcome email sent successfully"));
//     } catch (error) {
//       console.log(error);
//       response
//         .status(500)
//         .json(new ApiResponse(500, null, "Failed to send welcome email"));
//     }
//   }
// );
