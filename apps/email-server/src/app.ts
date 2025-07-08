import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

// Import routes
import authRouter from './routes/auth.routes';
import orderRouter from './routes/order.routes';
import marketingRouter from './routes/marketing.routes';
import utilityRouter from './routes/utility.routes';

const app: Application = express();

const corsOptions = {
	origin: [process.env.FRONTEND_ENDPOINT_URL!],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	methods: 'GET,POST,PUT,DELETE,OPTIONS',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' })); // Accept JSON data
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Authentication related emails
app.use(`/api/v1/emails/auth`, authRouter);

// Order related emails
app.use(`/api/v1/emails/orders`, orderRouter);

// Marketing related emails (requires user consent)
app.use(`/api/v1/emails/marketing`, marketingRouter);

// Utility emails
app.use(`/api/v1/emails/utility`, utilityRouter);

// Health check endpoint
app.get(`/`, async (req, res) => {
	res.json({
		status: 'success',
		message: 'Email Service is running',
		timestamp: new Date().toISOString(),
	});
});

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     status: 'error',
//     message: 'Endpoint not found',
//     path: req.originalUrl
//   });
// });

export default app;
