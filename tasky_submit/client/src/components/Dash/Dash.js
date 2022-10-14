import React from "react"

// import Loading from "./Loading"

import './Dash.css'


const Dash = (users, loading) => {
  return (
    <>
      <h2>Task Manager</h2>
      <div className="main">
        <div className="ADD">
          <input id="input" type="text" placeholder="Enter text here" />
          <input id="date" type="datetime-local" />
          <button className="bt">ADD</button>
        </div>
        <div className="list">
          <div className="task">
            <p className="text">your task</p>
            <span>
              <button className="bt2"> Delete</button>
              <button className="bt2"> Edit</button>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dash