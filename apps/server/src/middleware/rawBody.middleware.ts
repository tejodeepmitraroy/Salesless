import { Request, Response, NextFunction } from 'express';

// Type for request with rawBody
interface RawBodyRequest extends Request {
	rawBody?: Buffer;
}

/**
 * Middleware to store the raw request body as a Buffer
 * This is needed for Stripe webhook signature verification
 */
export const rawBodyMiddleware = (
	request: Request,
	_response: Response,
	buf: Buffer
) => {
	if (buf && buf.length) {
		(request as unknown as RawBodyRequest).rawBody = buf;
	}
};

/**
 * Middleware to parse raw body for specific routes
 * Must be used before bodyParser.json()
 */
export const parseRawBody = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	request.setEncoding('utf8');
	let data = '';

	request.on('data', (chunk) => {
		data += chunk;
	});

	request.on('end', () => {
		if (data) {
			(request as unknown as RawBodyRequest).rawBody = Buffer.from(data);
		}
		next();
	});
};
