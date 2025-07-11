import { Request } from 'express';
import app from './app';
import serverless, { Handler } from 'serverless-http';

const port = process.env.PORT || 8001;

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});

export const handler: Handler = serverless(app, {
	request: (req: Request) => {
		if (Buffer.isBuffer(req.body)) {
			try {
				req.body = JSON.parse(req.body.toString('utf8'));
			} catch (error) {
				console.error('Failed to parse Buffer body:', error);
				req.body = {};
			}
		} else if (typeof req.body === 'string') {
			try {
				req.body = JSON.parse(req.body);
			} catch (error) {
				console.error('Failed to parse string body:', error);
				req.body = {};
			}
		}
	},
});
// export const handler = serverless(app);
