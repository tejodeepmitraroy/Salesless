// // Order Confirmation
// export const sendOrderConfirmation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, orderDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Order Confirmation - #${orderDetails.orderNumber}`,
//       template: `Hi ${userFirstName},\n\nThank you for your order! We've received it and are processing it.\n\nOrder Details:\n- Order #: ${orderDetails.orderNumber}\n- Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}\n- Total: $${orderDetails.totalAmount.toFixed(2)}\n\nWe'll notify you once your items are on their way.`,
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Order confirmation email sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send order confirmation email")
//       );
//   }
// });

// // Payment Receipt
// export const sendPaymentReceipt = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, paymentDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Payment Receipt - Order #${paymentDetails.orderNumber}`,
//       template: `Hi ${userFirstName},\n\nYour payment has been received. Thank you!\n\nPayment Details:\n- Order #: ${paymentDetails.orderNumber}\n- Amount: $${paymentDetails.amount.toFixed(2)}\n- Payment Method: ${paymentDetails.paymentMethod}\n- Transaction ID: ${paymentDetails.transactionId}`,
//     });

//     response
//       .status(200)
//       .json(new ApiResponse(200, data, "Payment receipt sent successfully"));
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send payment receipt"));
//   }
// });

// // Shipping Confirmation
// export const sendShippingConfirmation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, shippingDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Your Order #${shippingDetails.orderNumber} Has Shipped!`,
//       template: `Hi ${userFirstName},\n\nGreat news! Your order has been shipped.\n\nShipping Details:\n- Order #: ${shippingDetails.orderNumber}\n- Carrier: ${shippingDetails.carrier}\n- Tracking #: ${shippingDetails.trackingNumber}\n- Estimated Delivery: ${shippingDetails.estimatedDelivery}`,
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Shipping confirmation sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send shipping confirmation"));
//   }
// });

// // Delivery Confirmation
// export const sendDeliveryConfirmation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstname, orderNumber } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Your Order #${orderNumber} Has Been Delivered`,
//       template: `Hi ${userFirstname},\n\nYour order #${orderNumber} has been delivered!\n\nWe hope you love your purchase. If you have any questions, please don't hesitate to contact our support team.`,
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Delivery confirmation sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send delivery confirmation"));
//   }
// });

// // Order Cancellation
// export const sendOrderCancellation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, orderDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Order #${orderDetails.orderNumber} Cancellation`,
//       template: `Hi ${userFirstName},\n\nYour order #${orderDetails.orderNumber} has been cancelled.\n\n${orderDetails.refundInfo ? `A refund of $${orderDetails.refundAmount.toFixed(2)} will be processed within 5-7 business days.` : ""}\n\nIf you didn't request this cancellation, please contact us immediately.`,
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Order cancellation email sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send order cancellation email")
//       );
//   }
// });

// // Refund Processed
// export const sendRefundProcessed = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, refundDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Refund Processed - Order #${refundDetails.orderNumber}`,
//       template: `Hi ${userFirstName},\n\nYour refund for Order #${refundDetails.orderNumber} has been processed.\n\nRefund Details:\n- Amount: $${refundDetails.amount.toFixed(2)}\n- Payment Method: ${refundDetails.paymentMethod}\n- Transaction ID: ${refundDetails.transactionId}\n\nPlease allow 5-7 business days for the refund to appear in your account.`,
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Refund notification sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send refund notification"));
//   }
// });
