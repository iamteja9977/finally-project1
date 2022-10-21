import React, { useState, useEffect } from 'react';
import clock from "../assets/clock.png";
import tick from "../assets/tick.png";
// import Loading from "./assets/Loading1.js";

import Footer from '../Footer/Footer.js';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../Dash/Dash.css"
function Dashboard() {
  const{state}=useState();
  let navigate = useNavigate();
  let [tasks, setTasks] = useState([])
  
  function navigating(e, name) {
    console.log(e)
    navigate('/edittask', { state: { e, name } });
  }

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
        let { data } = await axios.get("/api/task/tasks",  {
          headers: {
            "auth-token": token
          }
        })
        setTasks(data.taskData.tasks);
        // console.log(tasks);
        
      } catch (error) {
        console.error(error.response.data.errors)
      }
    }getalltasks();

  }, [])
  // console.log(tasks);

  async function DeleteTask(id) {
    try {
      let token = JSON.parse(localStorage.getItem("token")).token
      setTasks(tasks.filter((ele) => ele._id !== id ))
      let data = await axios.delete(`/api/task/${id}`, {
        headers: {
          "auth-token": token
        }
      })
      // window.location.reload();
    } catch (error) {
      console.error(error.response.data)
    }
  }


  return (
    <>
    
      {/* {loading && <Loading />} */}

      <center>
       <i><h1 style={{ display: "inline", margin: "230px",color:"green"}}>Dashboard</h1></i>  <Link to="/AddTask" >Add Task</Link>
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

                  <td><button type='button' onClick={() => navigating(task._id, task.taskname)}>Edit</button>
                  <button onClick={() => DeleteTask(task._id)}>Delete</button></td>
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