

// import {DataTypes} from 'sequelize'
// import sequelize from '../config/db.js'

// export const Ticket = sequelize.define("ticket", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull:false
//     },
//     subject: {
//       type: DataTypes.INTEGER,
//     }
//  });



// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';

// export const Ticket = sequelize.define('Ticket', {
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   category: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   priority: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   status: {
//     type: DataTypes.STRING,
//     defaultValue: 'open',
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   }
// });


// models/Ticket.js
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

