import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import passportJwt from 'passport-jwt';
import { comparePassword } from '../helper/hasher';
import passportLocal from 'passport-local';
import { generateRefreshToken } from '../helper/token';
import passportOAuth from 'passport-google-oauth20';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema/user';
import { customer, customerStore } from '../db/schema';
import { Request } from 'express';

interface GoogleUserProfile {
	id: string;
	displayName: string;
	name: { familyName: string; givenName: string };
	emails: Array<{ value: string; verified: boolean }>;
	photos: Array<{
		value: string;
	}>;
	provider: string;
}

const localStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

const OAuth2Strategy = passportOAuth.Strategy;

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET!;

export const initializePassportStrategies = () => {
	passport.use(
		'user-local',
		new localStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			async (email, password, done) => {
				//authentication Logic here
				try {
					console.log('Receive Credentials', email, password);
					const userDetails = await db.query.user.findFirst({
						where: eq(user.email, email),
					});

					if (!userDetails) {
						return done(null, false, { message: 'Incorrect email' });
					}

					console.debug('user Profile Details', userDetails);

					const isPasswordMatched = await comparePassword(
						password,
						userDetails.password!
					);

					if (isPasswordMatched) {
						///User is Authenticated
						console.log('Auth Parsed User-->', isPasswordMatched);

						const refreshToken = generateRefreshToken(userDetails.id);

						const updatedUser = await db
							.update(user)
							.set({
								refreshToken,
							})
							.where(eq(user.id, user.id))
							.returning();

						console.log(
							'Fetch User data in Local stratigy FNS',
							email,
							password,
							refreshToken
						);
						return done(null, updatedUser[0]);
					} else {
						return done(null, false, { message: 'Incorrect Password' });
					}
				} catch (error) {
					return done(error);
				}
			}
		)
	);
	passport.use(
		'customer-local',
		new localStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true,
			},
			async (request, email, password, done) => {
				//authentication Logic here
				try {
					const storeId = request.storeId!;
					console.log('Receive Customer Credentials', email, password, storeId);

					const customerStoreDetails = await db.query.customerStore.findMany({
						where: eq(customerStore.storeId, storeId),
						with: {
							customer: true,
						},
						columns: {
							customerId: false,
							storeId: false,
							registerAt: false,
						},
					});

					const customerDetails = customerStoreDetails.find(
						(customer) => customer.customer.email === email
					);
					console.log('Receive Customer Details', customerDetails);

					console.debug('Customer Details', customerDetails);
					if (!customerDetails) {
						return done(null, false, { message: 'Incorrect email' });
					}

					const isPasswordMatched = await comparePassword(
						password,
						customerDetails.customer.password!
					);

					if (isPasswordMatched) {
						///User is Authenticated
						console.log('Auth Parsed User-->', isPasswordMatched);

						const refreshToken = generateRefreshToken(
							customerDetails.customer.id
						);

						const updatedUser = await db
							.update(customer)
							.set({
								refreshToken,
							})
							.where(eq(customer.id, customerDetails.customer.id))
							.returning();

						console.log(
							'Fetch Customer data in Local stratigy FNS',
							email,
							password,
							refreshToken
						);
						return done(null, updatedUser[0]);
					} else {
						return done(null, false, { message: 'Incorrect Password' });
					}
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	const cookieExtractor = (req: Request) => {
		let token = null;
		console.log('Cookie Extractor', req.cookies.access_token);
		if (req && req.cookies) {
			token = req.cookies.access_token;
		}
		return token;
	};
	passport.use(
		new JwtStrategy(
			{
				secretOrKey: accessTokenSecretKey,
				jwtFromRequest: cookieExtractor,
			},
			async function (jwtPayload, done) {
				//authentication Logic here

				console.log('Fetch User data in Local stratigy FNS', jwtPayload);
				// try {
				// 	const user = await prisma.user.findUnique({
				// 		where: {
				// 			id: jwtPayload.id,
				// 		},
				// 	});

				// 	return user ? done(null, user) : done(null, false);
				// } catch (error) {
				// 	return done(error, false);
				// }
				return jwtPayload ? done(null, jwtPayload) : done(null, false);
			}
		)
	);

	passport.use(
		new OAuth2Strategy(
			{
				clientID: process.env.OAUTH_CLIENT_ID!,
				clientSecret: process.env.OAUTH_CLIENT_SECRET!,
				callbackURL:
					process.env.OAUTH_CALLBACK_URL ||
					'http://localhost:8000/api/v1/auth/google/callback',
			},
			async function (accessToken, refreshToken, profile, done) {
				const userProfile = profile as GoogleUserProfile;
				try {
					let userData = await db.query.user.findFirst({
						where:
							eq(user.googleId, userProfile.id) ||
							eq(user.email, userProfile.emails[0].value),
					});

					if (!userData) {
						[userData] = await db
							.insert(user)
							.values({
								googleId: userProfile.id,
								email: userProfile.emails[0].value,
								firstName: userProfile.name.givenName,
								lastName: userProfile.name.familyName,
								avatar: userProfile.photos[0]?.value,
								emailVerified: true,
							})
							.returning();
					}

					const refreshToken = await generateRefreshToken(userData.id);

					const [updatedUser] = await db
						.update(user)
						.set({
							refreshToken,
						})
						.where(eq(user.id, userData!.id))
						.returning();

					return done(null, updatedUser);
				} catch (error) {
					return done(error, false);
				}
			}
		)
	);
};
