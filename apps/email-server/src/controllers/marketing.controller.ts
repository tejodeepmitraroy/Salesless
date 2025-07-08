// // Promotional Offers
// export const sendPromotionalOffers = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, offerDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: offerDetails.subject || "Exclusive Offer Just For You!",
//       template:
//         `Hi ${userFirstName},\n\n${offerDetails.message || "We have an exclusive offer for you!"}\n\n` +
//         (offerDetails.couponCode
//           ? `Use code: ${offerDetails.couponCode}\n`
//           : "") +
//         (offerDetails.expiryDate
//           ? `Offer valid until: ${new Date(offerDetails.expiryDate).toLocaleDateString()}\n`
//           : ""),
//     });

//     response
//       .status(200)
//       .json(new ApiResponse(200, data, "Promotional email sent successfully"));
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send promotional email"));
//   }
// });

// // New Product Launch
// export const sendNewProductLaunch = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, productDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `New Arrival: ${productDetails.name}`,
//       template:
//         `Hi ${userFirstName},\n\nWe're excited to introduce our latest product: ${productDetails.name}!\n\n` +
//         `${productDetails.description || ""}\n\n` +
//         (productDetails.specialOffer
//           ? `Special Launch Offer: ${productDetails.specialOffer}\n`
//           : ""),
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "New product announcement sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send new product announcement")
//       );
//   }
// });

// // Re-engagement Campaign
// export const sendReEngagementCampaign = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, campaignDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: campaignDetails.subject || "We Miss You!",
//       template:
//         `Hi ${userFirstName},\n\n${campaignDetails.message || "We noticed you haven't visited us in a while. Here's a special offer just for you!"}\n\n` +
//         (campaignDetails.offer ? `${campaignDetails.offer}\n` : ""),
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Re-engagement email sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send re-engagement email"));
//   }
// });

// // Loyalty Program Update
// export const sendLoyaltyProgramUpdate = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, loyaltyDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: "Your Loyalty Program Update",
//       template:
//         `Hi ${userFirstName},\n\nHere's your loyalty program update:\n\n` +
//         `Current Points: ${loyaltyDetails.currentPoints}\n` +
//         (loyaltyDetails.pointsExpiring
//           ? `Points Expiring Soon: ${loyaltyDetails.pointsExpiring}\n`
//           : "") +
//         (loyaltyDetails.newRewards
//           ? `New Rewards Available: ${loyaltyDetails.newRewards.join(", ")}\n`
//           : ""),
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Loyalty program update sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send loyalty program update")
//       );
//   }
// });

// // Seasonal Campaigns
// export const sendSeasonalCampaigns = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, campaignDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: campaignDetails.season
//         ? `${campaignDetails.season} Special!`
//         : "Special Seasonal Offer",
//       template:
//         `Hi ${userFirstName},\n\n${campaignDetails.message || "Check out our special seasonal offers!"}\n\n` +
//         (campaignDetails.highlights
//           ? `Highlights:\n${campaignDetails.highlights.map((h: string) => `• ${h}`).join("\n")}\n\n`
//           : ""),
//     });

//     response
//       .status(200)
//       .json(
//         new ApiResponse(200, data, "Seasonal campaign email sent successfully")
//       );
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(
//         new ApiResponse(500, null, "Failed to send seasonal campaign email")
//       );
//   }
// });

// // Feedback/Review Request
// export const sendFeedbackRequest = asyncHandler(async (request: Request, response: Response) => {
//   const { to, userFirstName, orderDetails } = request.body;

//   try {
//     const data = await sendEmail({
//       to,
//       subject: `How did we do with your order #${orderDetails.orderNumber}?`,
//       template:
//         `Hi ${userFirstName},\n\nThank you for your recent order #${orderDetails.orderNumber}. We'd love to hear your feedback!\n\n` +
//         `[Leave a Review](${orderDetails.reviewLink})\n\n` +
//         "Your feedback helps us improve our products and services.",
//     });

//     response
//       .status(200)
//       .json(new ApiResponse(200, data, "Feedback request sent successfully"));
//   } catch (error) {
//     console.log(error);
//     response
//       .status(500)
//       .json(new ApiResponse(500, null, "Failed to send feedback request"));
//   }
// });
