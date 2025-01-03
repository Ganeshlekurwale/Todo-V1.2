import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.promise(Promise.resolve(res), {
          loading: "Logging in...",
          success: (res) => <b>{res.data.message}</b>,
          error: (err) => <b>{err.response.data.message}</b>,
        });

        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen m-6 p-4">
      <Input
        onChange={handleChange}
        value={user.email}
        name="email"
        type="email"
        placeholder="Email"
      />
      <Input
        onChange={handleChange}
        value={user.password}
        name="password"
        type="password"
        placeholder="Password"
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
