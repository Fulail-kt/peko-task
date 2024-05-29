import { User } from '../models/Users.js';
import Ticket from '../models/Ticket.js';
import CommentModal from '../models/Comment.js';
import { sendNotificationToUser } from '../socket.io.js';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';

// Create Ticket
export const createTicket = async (req, res) => {
  const { title, description, category, priority, userId } = req.body;
  console.log(req.body)
  try {
    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
      userId, 
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Tickets
export const getTickets = async (req, res) => {
  try {
    const { search } = req.query;
    let tickets;

    if (search) {
      tickets = await Ticket.findAll({
        include: [
          { model: User, as: 'user' },
          {
            model: CommentModal,
            as: 'comments',
            required: false,
            include: { model: User, as: 'admin' }
          }
        ],
        where: {
          [Op.or]: [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('title')), 'LIKE', `%${search.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('description')), 'LIKE', `%${search.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('status')), 'LIKE', `%${search.toLowerCase()}%`),
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('priority')), 'LIKE', `%${search.toLowerCase()}%`),
          ]
        }
      });
    } else {
      tickets = await Ticket.findAll({
        include: [
          { model: User, as: 'user' },
          {
            model: CommentModal,
            as: 'comments',
            required: false,
            include: { model: User, as: 'admin' }
          }
        ]
      });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Ticket by ID
export const getTicketsByUserId = async (req, res) => {
  const { id } = req.params; 
  try {
    const tickets = await Ticket.findAll({
      where: { userId:id },
      include: [
        { model: User, as: 'user' },
        {
          model: CommentModal,
          as: 'comments',
          required: false,
          include: { model: User, as: 'admin' }
        }
      ]
    });

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ error: 'No tickets found for the specified userId' });
    }

    res.status(200).json({ tickets, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Ticket
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, priority } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    
    ticket.title = title;
    ticket.description = description;
    ticket.category = category;
    ticket.priority = priority;
    
    await ticket.save();
    
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status,userId } = req.body;  
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    
    ticket.status = status;
    await ticket.save();

    sendNotificationToUser(userId, `Your ticket status has been updated to ${status}.`);
    
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteTicket= async(req,res)=>{
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await ticket.destroy();
    res.status(200).json({ success:true, message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create Comment
export const createComment = async (req, res) => {
  const { content, ticketId, adminId ,userId} = req.body;
  try {
    const comment = await CommentModal.create({ content, ticketId, adminId });
    console.log(userId,"came her")
    sendNotificationToUser(userId, `Admin add comment on your ticket ${content}.`);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateComment = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  console.log(req.params,req.body)
  try {
    const comment = await CommentModal.update({ content }, { where: { id } });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

