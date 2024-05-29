
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { User } from './Users.js';

const Ticket = sequelize.define('Ticket', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'open',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define associations
User.hasMany(Ticket, { foreignKey: 'userId', as: 'tickets' });
Ticket.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Ticket;

