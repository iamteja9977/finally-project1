import './App.css';
import { useState } from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';


function App() {

  const [alert, setAlert] = useState(null);
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
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register
          alert={alert}
          showAlert={showAlert}
        />}></Route>
        <Route path='/login' element={<Login
          alert={alert}
          showAlert={showAlert}
        />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair