import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "@/config";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = user;
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${config.baseURL}/user/signup`, {fullname: name, email, password}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.promise(Promise.resolve(res), {
          loading: "Signing up...",
          success: (res) => <b>{res.data.message}</b>,
          error: (err) => <b>{err.response?.data?.message || "Error"}</b>,
        });

        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen m-6 p-4">
      <Input
        onChange={handleChange}
        value={user.name}
        name="name"
        type="text"
        placeholder="Name"
      />
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
      <Input
        onChange={handleChange}
        value={user.confirmPassword}
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <Button onClick={handleSignup}>Sign Up</Button>
      <Button onClick={() => navigate("/login")}>Back to Login</Button>
    </div>
  );
};

export default Signup;
