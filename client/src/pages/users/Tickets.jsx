import React, { useState, useEffect, useRef } from 'react';
import TicketCard from '../../components/ticketCard';
import TicketForm from '../../components/ticketForm';
import Api from '../../axios/api';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/navbar';
import io from 'socket.io-client';
const socket = io('http://localhost:2001')



const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);




  useEffect(() => {
    const token = localStorage.getItem('peko');
    const decoded = jwtDecode(token);
    setUserId(decoded.id);

    socket.emit('register', decoded.id); 

    socket.on('notification', (message) => {
        alert(`Notification: ${message}`); 
    });

    return () => {
        socket.off('notification');
    };
}, []);


  useEffect(() => {
    const token=localStorage.getItem('peko')
    const decode=jwtDecode(token)
    setUserId(decode?.id)
    const fetchTickets = async () => {
      try {
        const res = await Api.get(`/tickets/${decode?.id}`);

        console.log(res.data)
        setTickets(res.data.tickets);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, []);

  const handleCreateTicket = () => {
    setSelectedTicket(null);
    setIsModalOpen(true);
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleDelete = async (ticket) => {
    try {
      await Api.delete(`/tickets/${ticket.id}`);
      setTickets(tickets.filter(t => t.id !== ticket.id));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleFormSubmit = async (ticketData) => {
    try {
      if (selectedTicket) {
        await Api.put(`/tickets/${selectedTicket.id}`, ticketData);
      } else {
        await Api.post('/tickets', ticketData,ticketData.userId=userId);
      }
      setIsModalOpen(false);
      const res = await Api.get('/tickets');
      setTickets(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar/>
    <div className="container mx-auto py-8">
      <div className='w-full flex justify-between py-6'>
        <h1 className="text-3xl font-semibold mb-4">Tickets</h1>
        <div><button onClick={handleCreateTicket} className="bg-blue-500 text-white rounded-md px-3 py-2">Create Ticket</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets?.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} onEdit={() => handleEditTicket(ticket)} onDelete={()=>handleDelete(ticket)}  />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 relative rounded-md shadow-md w-full max-w-lg">
            <TicketForm
              initialValues={selectedTicket || {}}
              onSubmit={handleFormSubmit}
            />
            <button onClick={() => setIsModalOpen(false)} className="mt-4 absolute bottom-8 right-10 bg-red-500 text-white rounded-md px-4 py-2">Close</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Tickets;
