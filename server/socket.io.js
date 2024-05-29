import { Server } from 'socket.io';

const userSocketMap = {};
let io;

export const SocketServer = (server) => {
     io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173' 
        }
    });

    io.on("connection", (socket) => {
        console.log('A user is connected');

        socket.on('register', (userId) => {
            userSocketMap[userId] = socket.id;
            console.log(`User ${userId} registered with socket ID ${socket.id}`);
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            for (const [userId, socketId] of Object.entries(userSocketMap)) {
                if (socketId === socket.id) {
                    delete userSocketMap[userId];
                    console.log(`User ${userId} with socket ID ${socket.id} disconnected`);
                    break;
                }
            }
        });
    });

    io.listen(2001);
    return io;
};

export const sendNotificationToUser = (userId, message) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
        io.to(socketId).emit('notification', message);
        console.log(`Notification sent to user ${userId}: ${message}`);
    }
};
