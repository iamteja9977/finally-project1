import React from "react"
import { Link } from "react-router-dom"

const Register = () => {
  return (

    <>
      <div className="container">
        <div className="sub-container">
          <center>
            <div className="signl">
              <h1>Welcome Back </h1>
              <p>Already registered Please Sign In</p>

              <div className="signbtn">
                <Link to={"/"}>SIGN IN </Link>
              </div>
            </div>
          </center>
        </div>
        <div className="sub-container2">
          <h1 className="crhe">Create account</h1>
          <h5 className="sihe">Fill below details to signup </h5>
          <form onSubmit={"/"}>
            <input
              type="text"
              name="firstname"
              autoComplete="off"
              placeholder="First Name"
              // value="{firstname}"
            />

            <input
              type="text"
              name="lastname"
              autoComplete="off"
              placeholder="Last Name"
              // value="{lastname}"
            />

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

            <input
              type="password"
              name="password2"
              autoComplete="off"
              placeholder="Confirm Password"
              // value="password2"
            />
            <br />
            <input type="submit" value="SIGN UP" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
