import React from 'react'
import { Link } from "react-router-dom"

const Login = () => {
    return (
      <>
        <div className="sincontainer">
          <div className="sinsub-container">
            <center>
              <div className="signl">
                <h1>Welcoome Back</h1>
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
            <form onSubmit={"/"}>
              
              <br />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                // value="email"
              />

              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                // value="password"
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