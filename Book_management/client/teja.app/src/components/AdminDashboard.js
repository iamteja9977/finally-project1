import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    async function verifyAuth() {
      try {
        let { data } = await axios.get("/api/auth",
          {
            headers: {
              "auth-token": JSON.parse(localStorage.getItem("token")).token
            }
          });
        if (data.payload.role !== "admin") {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    verifyAuth();
  }, [])
  return (
    <h1>AdminDashboard</h1>
  )
}

export default AdminDashboard