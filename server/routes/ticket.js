import express from 'express';
 const router = express.Router();
import { createTicket, getTickets, updateTicket,getTicketsByUserId,createComment, updateComment,updateStatus,deleteTicket} from  '../controllers/ticketController.js';

router.get('/', getTickets);
router.get('/:id', getTicketsByUserId);
router.post('/', createTicket);

router.put('/status/:id',updateStatus);
router.put('/:id', updateTicket);
router.delete('/:id',deleteTicket );


router.post('/comment', createComment);
router.put('/comment/:id', updateComment);


export default router