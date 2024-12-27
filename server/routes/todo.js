import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(getTodos);
router
  .route("/:id")
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo);

export default router;
