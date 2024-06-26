import React, { useEffect, useState } from 'react';
import Api from '../axios/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password.length<6){
      return alert('password atleast 6 digit ')
    }
    try {
      const res = await Api.post('/users/login', formData);
      console.log(res.data);


      if(res?.data?.success){
        localStorage.setItem('peko',res?.data?.token)
        navigate('/tickets',{replace:true})
      }

    } catch (error) {
      alert(error?.response?.data?.error || "error occured")
      console.error(error);
    }
  };


  useEffect(()=>{
    const token=localStorage.getItem('peko')
    if(token){
      const decode=jwtDecode(token)
      if(decode.role=='admin'){
        navigate('/dashboard')
      }else{
        navigate('/tickets')
      }
    }
  },[])
  
  return (
    <div className="min-h-screen flex items-center  justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div className='w-[70%] h-full flex justify-center '>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">Sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-400  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-400 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Signin;
