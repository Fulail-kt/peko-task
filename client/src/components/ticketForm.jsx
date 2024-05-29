import React, { useState, useEffect } from 'react';

const TicketForm = ({ initialValues, onSubmit }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [priority, setPriority] = useState(initialValues.priority || 'low');

  useEffect(() => {
    setTitle(initialValues.title || '');
    setDescription(initialValues.description || '');
    setCategory(initialValues.category || '');
    setPriority(initialValues.priority || 'low');
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category, priority });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{initialValues.id ? 'Edit Ticket' : 'Create Ticket'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md px-4 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md px-4 py-2 mt-1"></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-md px-4 py-2 mt-1" />
        </div>
        <div>
          <label htmlFor="priority" className="block font-medium">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full border rounded-md px-4 py-2 mt-1">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
          {initialValues.id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
