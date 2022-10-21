import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

import './Login.css'

const Login = ({ alert, showAlert }) => {
  let navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = userData

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (JSON.parse(localStorage.getItem("token").role === "admin")) {
        navigate("/")
      } else {
        navigate("dashboard")
      }
    }
    if (localStorage.getItem("token")) {
      navigate("/dashboard")
    }
  }, [])

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      let res = await axios.post("/api/login", userData)
      console.log(res.data)
      localStorage.setItem("token", JSON.stringify({ token: res.data.token, role: res.data.role })
      )
      if (res.data.role === "admin") {
        navigate("/")
      } else {
        navigate("/dashboard")
      }
      showAlert({
        type: "success",
        msg: res.data.success
      })
    } catch (error) {
      if (error.response.data.errors) {
        //Handling Express Validators
        let errorString = "";
        error.response.data.errors.forEach((ele) => {
          errorString += ele.msg
        })
        showAlert({
          type: "error",
          msg: errorString
        })
      } else {
        //Custom Errors
        showAlert({
          type: "error",
          msg: error.response.data.error
        })
      }
      // console.log("Catch")
      console.log(error.response.data.error);
    }
  }

  return (
    <>
      <div className="sincontainer">
        <div className="sinsub-container">
          <center>
            <div className="signl">
              <h1>Welcome Back</h1>
              <p>Don't Have An Account Please Sign Up</p>

              <div className="signbtn">
                <Link to={"/register"}>SIGN UP </Link>
              </div>
            </div>
          </center>
        </div>
        <div className="sinsub-container2">
          <h1 className="crhe">Sign In Now</h1>
          <h5 className="sihe">Enter Your Email And Password To Sign In </h5>
          <form onSubmit={onSubmitHandler}>
            <br />
            {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}

            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={onChangeHandler}
            />

            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={onChangeHandler}
            />

            <br />
            <input type="submit" value="SIGN IN" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login