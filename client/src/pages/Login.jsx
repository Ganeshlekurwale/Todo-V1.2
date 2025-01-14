import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure to install and use react-router-dom
import Navbar from "./Navbar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/status",
          { withCredentials: true }
        );
        if (res.status !== 200) {
          navigate("/login"); // Redirect to login if not authenticated
        }
      } catch (error) {
        navigate("/login"); // Redirect to login on error
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleTodoSubmit = async () => {
    if (isEditing) {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/v1/todo/${editTodoId}`,
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
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/todo",
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
        toast.error(error.response.data.message);
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
      const res = await axios.delete(
        `http://localhost:8000/api/v1/todo/${id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Todo deleted successfully");
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo", {
          withCredentials: true,
        });
        if (res.status === 200) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTodos();
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {todos.map((todo) => (
          <Card
            key={todo._id}
            className="w-full bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-50 p-2"
          >
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>{todo.description}</CardDescription>
            </CardHeader>
            <CardContent>
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
