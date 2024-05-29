import React from 'react';

const TicketCard = ({ ticket, onEdit }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded-md p-4 mb-4">
      <div className='flex w-full justify-between py-2'>
        <h2 className="text-lg font-semibold">{ticket?.title}</h2>
        <p className="text-gray-600 text-end">{ticket?.status}</p>
      </div>
      <p className="text-gray-600 ">{ticket?.description}</p>
      <div className="mt-4 flex w-100 justify-center space-x-12">
        <button onClick={onEdit} className="bg-yellow-500 text-white rounded-md px-4 py-2">Edit</button>
        <button className="bg-red-500 text-white rounded-md px-4 py-2">Delete</button>
      </div>
    </div>
  );
};

export default TicketCard;
