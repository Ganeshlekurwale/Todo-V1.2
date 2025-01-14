import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoCompletion,
  updateTodo,
} from "../controller/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createTodo)
  .get(isAuthenticated, getTodos);
router
  .route("/:id")
  .put(isAuthenticated, updateTodo)
  .delete(isAuthenticated, deleteTodo)
router.put("/:id/toggle", isAuthenticated, toggleTodoCompletion);

export default router;
