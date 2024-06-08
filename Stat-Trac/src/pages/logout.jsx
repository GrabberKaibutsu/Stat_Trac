import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          console.error("Logout failed:", response.statusText);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        logout();

        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logoutUser();
  }, [navigate, logout]);

  return <div>Logging out...</div>;
};

export default Logout;