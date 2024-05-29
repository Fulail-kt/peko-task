import {Sequelize} from 'sequelize'

const sequelize=new Sequelize('peko','root','mysql',{
    host:'localhost',
    dialect:'mysql'
})

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      // await sequelize.sync({ force: true }); 
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};

connectDB();

export default sequelize