// import { relations } from "drizzle-orm";
// import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";

// const paymentGatewaySettingsEnum = pgEnum('payment_gateway_settings', [
// 	'stripe',
// 	'razorpay',
// ]);

// export const GatewayConfigs = pgTable('gateway_configs', {
// 	id: uuid('id').primaryKey().defaultRandom(),
// 	storeId: integer('store_id')
// 		.references(() => store.id)
// 		.notNull(),
// 	gateway: paymentGatewaySettingsEnum(), // 'stripe' | 'razorpay' | etc
// 	apiKey: text('api_key').notNull(),
// 	apiSecret: text('api_secret').notNull(),
// });

// export const paymentGatewaySettingsRelations = relations(
// 	paymentGatewayConfig,
// 	({ one }) => ({
// 		store: one(store, {
// 			fields: [paymentGatewayConfig.storeId],
// 			references: [store.id],
// 		}),
// 	})
// );
