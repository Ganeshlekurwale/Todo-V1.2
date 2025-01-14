import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import config from "@/config";

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`${config.baseURL}/user/status`, {
          withCredentials: true,
        });
        if (res.status === 200 && res.data?.user?.fullname) {
          setUserName(res.data.user.fullname);
        } else {
          setUserName("Guest");
        }
      } catch (error) {
        setUserName("Guest");
        console.error("Error fetching user data", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/user/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
      console.log(error);
    }
  };

  return (
    <div className="bg-zinc-800 flex items-center justify-between p-2">
      <h1 className="text-white font-bold text-lg">{userName}</h1>
      <Button size="sm" variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
