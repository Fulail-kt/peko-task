# Customer Support Platform

This is a web-based application that allows users to raise tickets for complaints or issues they encounter, and administrators to manage and respond to these tickets effectively.

## Key Features

### Ticket Submission
- **User Registration:** Users can create accounts securely to access the ticket management system.
- **User Login:** Users can log in securely to access their account.
- **Ticket Form:** Users can raise tickets by filling out a form with fields such as title, description, category, priority.
- **Ticket Comments:** Users can view and respond to comments made by administrators regarding their raised tickets.

### Ticket Management
- **Admin Dashboard:** Administrators can view a list of all tickets raised.
- **Filtering and Sorting:** Administrators can filter and sort tickets based on status, priority, category, etc.
- **Ticket Details:** Administrators can view detailed information about each ticket, including the user who raised it, timestamp, status, and description.
- **Update Ticket Status:** Administrators can update the status of tickets (e.g., open, in progress, resolved) and add comments/responses.

### Real-Time Notifications
- **Real-Time Alerts:** Implement real-time notifications to alert administrators and users of any changes in ticket status or comments.

## Technologies Used
- **Backend:** Node.js
- **Frontend:** React
- **Database:** SQL
- **ORM:** Sequelize


## Setup Instructions
1. Clone the repository.
 ```sh
  git clone https://github.com/Fulail-kt/peko-task.git
 ```
2. Install dependencies using `npm install` in both the backend and frontend directories.
   ```sh
   cd client & cd server
   ```
3. Set up .env.

   client
    ```sh
   VITE_SOCKET= Socket URL
   VITE_BASE_URL= Backend URL
   ```
    
   Server
    ```sh
    PORT = 2000
    JWT_SECRET=" your jwt secret"
    FRONTEND_URL='your frontend url'
    DB_NAME=""
   DB_USER=""
   DB_PASSWORD=""
   DB_HOST="" 
   ```
   
5. Run the backend server using `npm start`.
   
7. Run the frontend server using `npm start`.


