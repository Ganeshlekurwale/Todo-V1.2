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
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://todo-v02.vercel.app",
        "https://todo-v02.vercel.app/",
        "https://todo-v1-2-ganeshlekurwales-projects.vercel.app/login",
      ];
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Backend Series API");
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
