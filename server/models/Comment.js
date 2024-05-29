// models/Comment.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ticket from './Ticket.js';
import { User } from './Users.js';

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ticketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ticket,
      key: 'id'
    },
    onDelete: 'CASCADE',
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'SET NULL',
  },
}, {
  timestamps: true,
});

// Define associations
Ticket.hasMany(Comment, { foreignKey: 'ticketId', as: 'comments' });
Comment.belongsTo(Ticket, { foreignKey: 'ticketId', as: 'ticket' });
Comment.belongsTo(User, { foreignKey: 'adminId', as: 'admin' });

export default Comment;
