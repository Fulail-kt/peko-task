import express from 'express';
 const router = express.Router();
 import {isAdmin,authenticateToken} from '../middleware/middleware.js'
import { createTicket, getTickets, updateTicket,getTicketsByUserId,createComment, updateComment,updateStatus,deleteTicket} from  '../controllers/ticketController.js';

router.get('/', getTickets);
router.get('/:id', getTicketsByUserId);
router.post('/', createTicket);

router.put('/status/:id',isAdmin,updateStatus);
router.put('/:id',authenticateToken, updateTicket);
router.delete('/:id',authenticateToken,deleteTicket );


router.post('/comment',isAdmin, createComment);
router.put('/comment/:id',isAdmin, updateComment);


export default router