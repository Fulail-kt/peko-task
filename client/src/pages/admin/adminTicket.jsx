import React, { useEffect, useState } from 'react';
import Api from '../../axios/api';
import Navbar from '../../components/navbar';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
const socket = io(import.meta.env.VITE_SOCKET)

const AdminTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [userId, setUserId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newComment, setComment] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const statusOptions = ['open', 'in progress', 'resolved'];

    const [searchQuery, setSearchQuery] = useState('');

    const [sortBy, setSortBy] = useState('');


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

    const handleCommentClick = (ticket) => {
        setSelectedTicket(ticket);
        setShowModal(true);
    };


    const fetchTickets = async (query = '') => {
        try {
            let response;
            if (query) {
                response = await Api.get(`/tickets?search=${query}`);
            } else {
                response = await Api.get('/tickets');
            }
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchTickets(searchQuery);
    }, [searchQuery]);

    const closeModal = () => {
        setShowModal(false);
        setComment('');
    };


    const handleAddComment = async () => {
        try {

            if (selectedTicket?.comments[0]?.id) {

                let content;

                content = newComment

                if (!newComment) {
                    content = selectedTicket?.comments[0]?.content
                }

                console.log(content, newComment)


                await Api.put(`/tickets/comment/${selectedTicket.comments[0].id}`, { content, userId: selectedTicket.userId });
            } else {

                await Api.post(`/tickets/comment`, { content: newComment, ticketId: selectedTicket.id, userId: selectedTicket.userId, adminId: userId });
            }

            fetchTickets();

            setShowModal(false);

            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };


    const handleStatusChange = async (id, e) => {
        const { value } = e.target;
        console.log('helo', id, value)
        setSelectedStatus(value);
        if (value) {
            try {
                const ticket = tickets.find(ticket => ticket?.id === id);
                await Api.put(`/tickets/status/${id}`, { status: value, userId: ticket.user.id });
                fetchTickets();
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };



    const handleSortChange = (criteria) => {
        setSortBy(criteria);
        const sortedTickets = sortTickets(criteria);
        console.log(sortedTickets, "Sorted Tickets");
        setTickets(sortedTickets);
    };

    const sortTickets = (criteria) => {
        if (criteria === 'latest') {
            return [...tickets].sort((a, b) => b.id - a.id);
        } else if (criteria === 'high' || criteria === 'medium' || criteria === 'low') {
            return tickets.filter(ticket => ticket.priority === criteria);
        } else {
            return tickets;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight">Tickets</h2>
                        <div> <input
                            type="text"
                            className='px-3 py-1 rounded-md'
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                            <button className='btn bg-blue-900 px-2 py-1 rounded-md' onClick={() => fetchTickets(searchQuery)}>Search</button></div>

                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="bg-transparent border-b  border-gray-400 rounded-md text-gray-200  focus:outline-none focus:border-indigo-500"
                            >
                                <option className='bg-slate-600'  disabled value="">Sort by</option>
                                <option className='bg-slate-600' value="latest">Latest</option>
                                <option className='bg-slate-600' value="high">Priority high </option>
                                <option className='bg-slate-600' value="medium">Priority medium </option>
                                <option className='bg-slate-600' value="low">Priority low </option>
                            </select>
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Priority
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 border-b border-gray-200 bg-slate-800 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr key={index}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <p className="text-gray-200 whitespace-no-wrap">{ticket.title}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <p className="text-gray-200 whitespace-no-wrap">
                                                    {ticket.description.length > 50 ? (
                                                        <>
                                                            {ticket.description}
                                                        </>
                                                    ) : (
                                                        ticket.description
                                                    )}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <p className="text-gray-200 whitespace-no-wrap">{ticket.category}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <p className="text-gray-200 whitespace-no-wrap">{ticket.priority}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <div>
                                                    <select
                                                        value={ticket.status}
                                                        onChange={(e) => handleStatusChange(ticket?.id, e)}
                                                        className="bg-transparent border-b border-gray-400 rounded-md text-gray-200  focus:outline-none focus:border-indigo-500"
                                                    >
                                                        <option className='bg-gray-700' value="">Select Status</option>
                                                        {statusOptions.map((status, index) => (
                                                            <option key={index} className='bg-gray-700' value={status}>{status}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <p className="text-gray-200 whitespace-no-wrap">{ticket.user.name}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-slate-600 text-sm">
                                                <div>
                                                    <button
                                                        onClick={() => handleCommentClick(ticket)}
                                                        className="text-blue-500 hover:text-blue-700"
                                                    >
                                                        Comment
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {showModal && selectedTicket && (
                        <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                                        <div className="sm:flex sm:items-start w-full">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                                <h3 className="text-lg leading-6 font-medium text-gray-200" id="modal-title">Ticket Comments</h3>
                                                <div className="mt-2 w-full">
                                                    {selectedTicket.comments && selectedTicket.comments.length > 0 ? (
                                                        selectedTicket.comments.map((comment, index) => (
                                                            <textarea
                                                                key={index}
                                                                defaultValue={comment.content}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                className="w-full px-3 py-2 border rounded-md"
                                                                placeholder="Add a comment..."
                                                            ></textarea>
                                                        ))
                                                    ) : (
                                                        <textarea
                                                            defaultValue={newComment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            className="w-full px-3 py-2 border rounded-md"
                                                            placeholder="Add a comment..."
                                                        ></textarea>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            onClick={handleAddComment}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Add
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminTicket;
