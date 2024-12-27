# MERN Stack Todo Application

This is a simple Todo application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- Add new todos
- Edit existing todos
- Delete todos
- View all todos

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-todo-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mern-todo-app
   ```
3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. Start the MongoDB server:
   ```bash
   mongod
   ```
2. Start the backend server:
   ```bash
   cd server
   npm start
   ```
3. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

### API Endpoints

- `GET /api/v1/todo` - Get all todos
- `POST /api/v1/todo` - Create a new todo
- `PUT /api/v1/todo/:id` - Update a todo
- `DELETE /api/v1/todo/:id` - Delete a todo

### Technologies Used

- MongoDB
- Express
- React
- Node.js

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
