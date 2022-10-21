import React, { useState, useEffect } from 'react';
import clock from "../assets/clock.png";
import tick from "../assets/tick.png";
// import Loading from "./assets/Loading1.js";

import Footer from '../Footer/Footer.js';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Dash/Dash.css"
function Dashboard() {
  
  let navigate = useNavigate();
  let [tasks, setTasks] = useState([])
  
  useEffect(() => {
    async function verifyAuth() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/auth", {
          headers: {
            "auth-token": token
          }
        })
      } catch (error) {
        console.error(error.response.data)
        navigate("/login")
      }
    } 
    verifyAuth();


    async function getalltasks() {
      try {
        let token = JSON.parse(localStorage.getItem("token")).token
        let { data } = await axios.get("/api/task/tasks", tasks, {
          headers: {
            "auth-token": token
          }
        })
        setTasks(data.alltasks.tasks);
        console.log(tasks);
        
      } catch (error) {
        console.error(error.response.data)
      }
    }getalltasks();

  }, [])
  console.log(tasks);
  return (
    <>

      {/* {loading && <Loading />} */}

      <center>
        <h1 style={{ display: "inline", margin: "230px" }}>Dashboard</h1> <Link to="/AddTask" >Add Task</Link>
        <table id="dashboard" >

          <thead >
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Is Completed</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              
              tasks.map((task, i) => {
                console.log(task.isCompleted)
                // tasks.isCompleted ? tick : clock
               
                return (<tr key={i}>
                  <td>{task._id}</td>
                  <td>{task.taskname}</td>
                  <td>{task.isCompleted ? <img style={{ width: "35px" }} src={tick} alt="Loading.." /> : <img style={{ width: "35px" }}  src={clock} alt="Loading.." />}</td>
                  <td><Link to="/edittask"><button type='button'>Edit</button></Link><button>Delete</button></td> 
                </tr>)
              })
            }
          </tbody>
        </table>
      </center><br /><br />

      <Footer />
    </>
  )
}

export default Dashboard;