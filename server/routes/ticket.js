import express from 'express';
 const router = express.Router();
import { createTicket, getTickets, updateTicket,getTicketsByUserId,createComment, updateComment,updateStatus} from  '../controllers/ticketController.js';

router.get('/', getTickets);
router.get('/:id', getTicketsByUserId);
router.post('/', createTicket);
router.post('/comment', createComment);
router.put('/comment/:id', updateComment);
router.put('/:id', updateTicket);
router.put('/status/:id',updateStatus);



export default router