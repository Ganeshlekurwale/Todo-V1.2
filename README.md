# 🌟 MERN Stack Todo Application

Welcome to the **MERN Stack Todo Application**, a simple yet powerful task management tool built with MongoDB, Express, React, and Node.js.

---

## 🚀 Features

✅ **Add Todos**: Create new tasks effortlessly.  
✏️ **Edit Todos**: Update tasks as needed.  
🗑️ **Delete Todos**: Remove completed or unnecessary tasks.  
👀 **View Todos**: See all your tasks at a glance.

---

## 📋 Getting Started

### 🕐 Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)

### 🛠 Installation

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/your-username/mern-todo-app.git
   ```

2. **Navigate to the project directory**:  
   ```bash
   cd mern-todo-app
   ```

3. **Install server dependencies**:  
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**:  
   ```bash
   cd ../client
   npm install
   ```

---

## ▶️ Running the Application

1. **Start MongoDB**:  
   Make sure your MongoDB server is running. Use the following command:  
   ```bash
   mongod
   ```

2. **Start the backend server**:  
   ```bash
   cd server
   npm start
   ```

3. **Start the frontend development server**:  
   ```bash
   cd ../client
   npm start
   ```

🎉 Your application is now running! Open your browser and go to `http://localhost:3000`.

---

## 🌐 API Endpoints

| HTTP Method | Endpoint            | Description              |
|-------------|---------------------|--------------------------|
| GET         | `/api/v1/todo`      | Retrieve all todos       |
| POST        | `/api/v1/todo`      | Create a new todo        |
| PUT         | `/api/v1/todo/:id`  | Update an existing todo  |
| DELETE      | `/api/v1/todo/:id`  | Delete a todo            |

---

## 🛠 Technologies Used

| Technology     | Description                          |
|-----------------|--------------------------------------|
| **MongoDB**     | NoSQL database for data storage.    |
| **Express.js**  | Backend framework for API creation. |
| **React**       | Frontend library for UI components. |
| **Node.js**     | JavaScript runtime for the server.  |

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature-name`.  
3. Commit your changes: `git commit -m "Add new feature"`.  
4. Push to the branch: `git push origin feature-name`.  
5. Open a pull request.

Feel free to open issues for any bugs or feature requests!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

### 💡 About the Author

Built with ❤️ by [Your Name](https://github.com/your-username).  

Have any feedback or suggestions? Feel free to reach out or open an issue!
