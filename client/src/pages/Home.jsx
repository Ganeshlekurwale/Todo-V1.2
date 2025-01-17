import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import config from "@/config";
import { CheckIcon, XIcon } from "@heroicons/react/outline"; 

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false); // State to toggle completed todos

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(`${config.baseURL}/user/status`, {
          withCredentials: true,
        });
        if (res.status !== 200) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleTodoSubmit = async () => {
    if (isEditing) {
      try {
        const res = await axios.put(
          `${config.baseURL}/todo/${editTodoId}`,
          { title, description },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          toast.success("Todo updated successfully");
          setTodos(
            todos.map((todo) =>
              todo._id === editTodoId ? { ...todo, title, description } : todo
            )
          );
          setIsEditing(false);
          setTitle("");
          setDescription("");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error updating todo");
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${config.baseURL}/todo`,
          { title, description },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          toast.success("Todo created successfully");
          setTitle("");
          setDescription("");
          setTodos([...todos, res.data.todo]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Error creating todo");
        console.log(error);
      }
    }
  };

  const handleTodoEdit = (todo) => {
    setIsEditing(true);
    setEditTodoId(todo._id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleTodoDelete = async (id) => {
    try {
      const res = await axios.delete(`${config.baseURL}/todo/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Todo deleted successfully");
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting todo");
      console.log(error);
    }
  };

  const handleTodoToggleComplete = async (id) => {
    try {
      const res = await axios.put(
        `${config.baseURL}/todo/${id}/toggle`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Todo completion status updated");
        setTodos(
          todos.map((todo) =>
            todo._id === id
              ? { ...todo, completed: res.data.todo.completed }
              : todo
          )
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error toggling todo status"
      );
      console.log(error);
    }
  };

  const handleShowCompletedToggle = () => {
    setShowCompleted(!showCompleted);
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(`${config.baseURL}/todo`, {
          withCredentials: true,
        });
        if (res.status === 200 && Array.isArray(res.data.todos)) {
          setTodos(res.data.todos);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.log(error);
        setTodos([]);
      }
    };

    getTodos();
  }, []);

  if (loading) {
    return <div className="grid place-items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="grid place-items-center p-4 gap-6 mt-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          className="w-1/2"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-1/2"
        />
        <Button onClick={handleTodoSubmit} size="sm" variant="save">
          {isEditing ? "Update Todo" : "Add Todo"}
        </Button>
      </div>

      {/* Button to toggle the visibility of completed todos */}
      <div className="flex justify-center my-4">
        <Button onClick={handleShowCompletedToggle} size="sm" variant="outline">
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {todos
          .filter((todo) => (showCompleted ? true : !todo.completed)) // Show or hide completed todos
          .map((todo) => (
            <Card
              key={todo._id}
              className={`w-full bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-50 p-2 ${
                todo.completed ? "opacity-50" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{todo.title}</CardTitle>
                <CardDescription>
                  {todo.completed ? "Completed" : "Not Completed"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleTodoToggleComplete(todo._id)}
                  size="sm"
                  variant={todo.completed ? "secondary" : "primary"}
                  className="mr-2 flex items-center"
                >
                  {todo.completed ? (
                    <XIcon className="w-5 h-5 mr-2" />
                  ) : (
                    <CheckIcon className="w-5 h-5 mr-2" />
                  )}
                  {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </Button>
                <Button
                  onClick={() => handleTodoEdit(todo)}
                  size="sm"
                  variant="update"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleTodoDelete(todo._id)}
                  size="sm"
                  variant="destructive"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Home;
