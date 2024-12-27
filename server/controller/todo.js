import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const todo = await Todo.create({ title, description });
    return res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      todos: todos.length > 0 ? todos : "No todos found",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required to update",
      });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    Object.keys(updates).forEach((key) => {
      todo[key] = updates[key];
    });
    await todo.save();
    return res
      .status(200)
      .json({ success: true, message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
