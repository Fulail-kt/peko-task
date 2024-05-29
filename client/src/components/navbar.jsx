import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [role, setRole] = useState('')
    const navigate=useNavigate()
  const Navlinks = [
    { display: 'Dashboard', path: '/dashboard' },
    { display: 'Tickets', path: '/all-tickets' },
    { display: 'Users', path: '/users' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('peko');
    const decode = jwtDecode(token);
    setRole(decode.role);
  }, []);

  const logout=()=>{
    localStorage.removeItem('peko')
    navigate('/sign-in')
  }

  return (
    <div className='w-full relative flex bg-slate-900 py-4 h-14 text-white'>
      <ul className='flex w-full items-center justify-center gap-x-10 '>
        {role === 'admin' &&
          Navlinks.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.display}</Link>
            </li>
          ))
          }
        <button className='text-end absolute right-10 ' onClick={logout}>logout</button>
      </ul>
    </div>
  );
};

export default Navbar;
