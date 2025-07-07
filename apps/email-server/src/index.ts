import app from './app';
import http from 'http';
import serverless from 'serverless-http';

const port = process.env.PORT || 8001;

const server = http.createServer(app);
server.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});

export const handler = serverless(app);
