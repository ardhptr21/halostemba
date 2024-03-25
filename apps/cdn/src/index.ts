import 'dotenv/config';
import { createServer } from 'http';
import web from './application/web';

const server = createServer(web);
const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 8000;

server.listen(PORT, HOST, () => console.log(`CDN running on ${HOST}:${PORT}`));
server.on('error', console.error);
