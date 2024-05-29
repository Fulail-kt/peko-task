import bcrypt from 'bcryptjs';
import jwt  from'jsonwebtoken';
import { User } from '../models/Users.js';

// User Registration
export const register = async (req, res) => {
  const { name, email, password,role } = req.body;
  
  try {
    if (!name.trim()|| !email.trim() || !password.trim()){
       return res.status(400).json({success:false,message:'some field missing'})
     }


    const exist=await User.findOne({where:{email}})

    if(exist){
        return res.status(400).json({success:false,message:'email already exist'})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword,role });
    res.status(201).json({user , success:false});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if(!password.trim() ||!email.trim()){
    res.status(400).json({ message:'fields are missing' });
    }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET ||"secret", { expiresIn: '3h' });
    res.status(200).json({ token ,success:true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

