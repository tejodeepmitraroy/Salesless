import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import storeRouter from './routes/store.routes';
import productRouter from './routes/product.routes';
import contentRouter from './routes/content.routes';
import orderRouter from './routes/order.routes';
import customerRouter from './routes/customer.routes';
import roleRouter from './routes/role.routes';
// import eventsRouter from "./routes/events.routes";
// import bookingRouter from "./routes/booking.routes";
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { initializePassportStrategies } from './config/passport.config';
dotenv.config();

const app: Application = express();

const corsOptions = {
	origin: [process.env.FRONTEND_ENDPOINT_URL!],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	methods: 'GET,POST,PUT,DELETE,OPTIONS',
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	// If cookies or credentials are used
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' })); //accept JSON data
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

///Passport for Authentication
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false, httpOnly: true, maxAge: 12000000 },
	})
);
initializePassportStrategies();
app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy');

// Routes Declaration
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/role', roleRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/customer', customerRouter);
app.use('/api/v1/store', storeRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/contents', contentRouter);
// app.use("/api/v1/payment", paymentRouter);

// app.use('/api/v1/donation', donationRouter);
// app.use('/api/v1/projects', projectRouter);
// app.use('/api/v1/enquiry', enquiryRouter);
// app.use('/api/v1/projectVisit', projectVisitRouter);

app.get('/', async (req, res) => {
	res.json({ message: 'Server is 100% up running' });
});

export default app;
