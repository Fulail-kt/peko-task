import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = () => {
        const socket = io(import.meta.env.VITE_SOCKET); 

        socket.on('connect', () => {
            console.log('Connected to server');
        });
};

export default socket;
