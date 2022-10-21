import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import PrivateRoutes from './components/PrivateRoutes';

function App() {

  const [alert, setAlert] = useState(null);
  const [booksData, setbooksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        let { data } = await axios.get("api/books");
        setbooksData(data.booksData);
        setLoading(false);
      } catch (error) {
        console.error(error.response.data);
      }
    }
    getBooks();
  }, [])
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
        <Route path="/" element={<Main booksData={booksData} loading={loading} />} />
        <Route path="/register" element={<Register
          alert={alert}
          showAlert={showAlert}
        />}></Route>
        <Route path='/login' element={<Login
          alert={alert}
          showAlert={showAlert}
        />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair