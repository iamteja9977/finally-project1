import './App.css';


import {
  Routes,
  Route,
} from "react-router-dom";

import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <>

      <Routes>

        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair