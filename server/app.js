import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend's Vercel domain when deploying
    credentials: true,
  })
);

// Define API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// Define a root route to avoid 404 for root requests
app.get("/", (req, res) => {
  res.send("Welcome to the Todo API!");
});

// Export the app for serverless environments
export default app;
