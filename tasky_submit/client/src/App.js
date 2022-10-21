import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"

import Login from "./components/Login/Login.js"
import Register from "./components/Register/Register.js"
import Dash from "./components/Dash/Dash.js"
import  './components/Navbar/Navbar.js';

import PrivateRoutes from "./components/PrivateRoutes.js"

import "./App.css"

function App() {
  const [alert, setAlert] = useState(null);
  const [taskData, settaskData] = useState([]);
  // const [loading, setLoading] = useState(false);

  
  const showAlert = (data) => {
    setAlert({
      type: data.type,
      msg: data.msg
    })
    setTimeout(() => {
      setAlert(null);
    }, 5000)
  }


  return (
    <>
      <Routes>
        <Route path="/" element={<Login 
         alert={alert}
         showAlert={showAlert}/>} />

        <Route path="/register" element={<Register 
        alert={alert}
        showAlert={showAlert}
        />} />
        
        <Route path="/login" element={<Login
        alert={alert}
        showAlert={showAlert}
        />} />

        <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dash />} />
        </Route>
      </Routes>
    </>
  )
}

export default App