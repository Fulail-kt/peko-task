import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import Tickets from './pages/users/Tickets';
import AdminTicket from './pages/admin/adminTicket';
import Dashboard from './pages/admin/dashboard';
import ProtectedRoute from './protectedRoute/protectedRoute';


function App() {
  return (
    <Routes>
  
        <Route path="/" element={ <Signin/>} />
        <Route path="/sign-up" element={ <Signup/>} />
        <Route path="/sign-in" element={ <Signin/>} />

        {/* user protected route */}

        <Route path="/tickets" element={<ProtectedRoute allowedRole='user'><Tickets/></ProtectedRoute>} />

        {/*admin Routes  */}
    
        <Route path="/dashboard" element={ <ProtectedRoute allowedRole='admin'><Dashboard/></ProtectedRoute> } />
        <Route path="/all-tickets" element={ <ProtectedRoute allowedRole='admin'> <AdminTicket/></ProtectedRoute>} />

    </Routes>
  );
}

export default App;
