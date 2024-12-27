import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("fullName") || "Guest";

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-800 flex items-center justify-between p-2">
      <h1 className="text-white font-bold text-lg">{userName}</h1>
      <Button size="sm" variant="destructive" onClick={handleLogout}>
        Logout{" "}
      </Button>
    </div>
  );
};

export default Navbar;
