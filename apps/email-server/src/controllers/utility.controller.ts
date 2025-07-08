// // Subscription Confirmation
// export const sendSubscriptionConfirmation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, subscriptionDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: "Subscription Confirmation",
//       template:
//         `Hi ${userFirstName},\n\nThank you for subscribing to ${subscriptionDetails.newsletterName || "our newsletter"}!\n\n` +
//         "You will now receive updates, promotions, and news from us.",
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(
//           200,
//           data,
//           "Subscription confirmation sent successfully"
//         )
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send subscription confirmation")
//       );
//   }
// });

// // Wishlist Reminder
// export const sendWishlistReminder = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, wishlistItems } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: "Items in Your Wishlist Are on Sale!",
//       template:
//         `Hi ${userFirstName},\n\nGood news! Items in your wishlist are now on special offer.\n\n` +
//         "Items on Sale:\n" +
//         wishlistItems
//           .map(
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             (item: any) =>
//               `• ${item.name} - Now $${item.discountedPrice} (Was $${item.originalPrice})`
//           )
//           .join("\n") +
//         "\n\nHurry, these offers won't last long!",
//     });

//     response
//       .status(200)
//       .json(new ApiResponse(200, data, "Wishlist reminder sent successfully"));
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send wishlist reminder"));
//   }
// });

// // Back in Stock Notification
// export const sendBackInStockNotification = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, productDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `${productDetails.name} is Back in Stock!`,
//       template:
//         `Hi ${userFirstName},\n\nGreat news! The following item you were interested in is back in stock.\n\n` +
//         `Product: ${productDetails.name}\n` +
//         `Price: $${productDetails.price.toFixed(2)}\n\n` +
//         "Hurry, limited stock available!",
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(
//           200,
//           data,
//           "Back in stock notification sent successfully"
//         )
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send back in stock notification")
//       );
// }});

// // Product Recommendation
// export const sendProductRecommendation = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, recommendations } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: "Recommended Just For You",
//       template:
//         `Hi ${userFirstName},\n\nBased on your browsing history, we thought you might like these products.\n\n` +
//         "Recommended Products:\n" +
//         recommendations
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           .map((rec: any) => `• ${rec.name} - $${rec.price.toFixed(2)}`)
//           .join("\n"),
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Product recommendations sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send product recommendations")
//       );
// }} );

// // Invoice/Tax Receipt
// export const sendInvoiceReceipt = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, invoiceDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `Your Invoice #${invoiceDetails.invoiceNumber}`,
//       template:
//         `Hi ${userFirstName},\n\nThank you for your purchase. Here's your invoice.\n\n` +
//         `Invoice #: ${invoiceDetails.invoiceNumber}\n` +
//         `Date: ${new Date(invoiceDetails.date).toLocaleDateString()}\n` +
//         `Total: $${invoiceDetails.totalAmount.toFixed(2)}\n\n` +
//         "A PDF copy of your invoice is attached for your records.",
//     });

//     response
//       .status(200)
//       .json(new ApiResponse(200, data, "Invoice sent successfully"));
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send invoice"));
//   }
// });
