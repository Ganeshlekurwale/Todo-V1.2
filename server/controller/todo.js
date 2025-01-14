import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    console.log(req.user);
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const todo = await Todo.create({ title, description, userId: req.user.id });
    return res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      todos: todos.length > 0 ? todos : "No todos found",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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
    const todo = await Todo.findById({ _id: id, userId: req.user.id });
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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete({ _id: id, userId: req.user.id });

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const toggleTodoCompletion = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    // Toggle the completion status
    todo.completed = !todo.completed;
    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo completion status updated",
      todo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
