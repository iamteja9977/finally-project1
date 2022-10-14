// import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
// import axios from "axios"

import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
// import Dash from "./components/Dash/Dash"
// import PrivateRoutes from "./components/PrivateRoutes"

import "./App.css"

function App() {
  // const [users, setUsers] = useState([])
  // const [loading, setLoading] = useState(null)
  // useEffect(() => {
  //   async function getUsers() {
  //     try {
  //       setLoading(true)
  //       const { data } = await axios.get("/api/task/task")
  //       console.log(data)
  //       setUsers(data)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getUsers()
  // }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/dashboard"
          element={<Dash users={users} loading={loading} />}
        /> */}
        {/*<Routes>Route element={<PrivateRoutes />}></Route>*/}
      </Routes>
    </>
  )
}

export default App