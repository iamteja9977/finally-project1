import "./App.css"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import Dash from "./components/Dashboard.js"
// import PrivateRoutes from "./components/PrivateRoutes"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dash />} />
        {/*<Routes>Route element={<PrivateRoutes />}></-*Route>*/}
      </Routes>
    </>
  )
}

export default App
