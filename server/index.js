import express from "express";
import cors from 'cors';
import http from 'http';

import userRoutes from './routes/users.js';
import ticketRoutes from './routes/ticket.js';

import dotenv from 'dotenv';
dotenv.config();
import { SocketServer } from './socket.io.js';


const app = express();
const server = http.createServer(app);

SocketServer(server);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server connected');
});
