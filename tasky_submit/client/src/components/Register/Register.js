import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Axios Component for React with child function callback. This is intended to allow in render async requests.

import "./Register.css";

const Register = ({ alert, showAlert }) => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    password2: "",
    phone: "",
    address: "",
    email: "",
  });
  const { firstname, lastname, password, password2, phone, address, email } =
    userData;

  /*
returns a Synthetic Event object which contains useful meta data such as the target input's id, name, and current value. 
We can access the target input's value inside of the handleChange by accessing e. target.
*/
  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  /*
   allows the function to be executed whenever triggered by the submit event.
    We use the onSubmit method in all of our forms to submit the data form user to our database using forms.
     It's one of the main parts of forms.
  */

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      /*cancels the event if it is cancelable, 
      meaning that the default action that belongs to the event will not occur.
       */
      // navigate("/login");

      console.log(userData);
      let res = await axios.post("/api/signup", userData);
      showAlert({
        type: "success",
        msg: res.data.success,
      });
      // alert(res.data);
      navigate("/login");

    } catch (error) {
      ///**************** */
      if (error.response.data.errors) {
        //Handling Express Validators
        let errorString = "";
        error.response.data.errors.forEach((ele) => {
          errorString += ele.msg;
        });
        showAlert({
          type: "error",
          msg: errorString,
        });
      } else {
        //Custom Errors
        showAlert({
          type: "error",
          msg: error.response.data.error,
        });
      }

      // console.log("Catch");
      // console.log(error.response.data.error);
    }
    //******************** */
  };

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
          {alert !== null && (
            <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>
          )}
          <div></div>
          <form onSubmit={onSubmitHandler}>
            <input
              type="text"
              name="firstname"
              autoComplete="off" //supports the autofill behavior with the help of autofill property.
              placeholder="First Name"
              value={firstname} //Since the value attribute is set on our form element, the displayed value will always be this.state.value
              onChange={onChangeHandler} //detects when the value of an input element changes.
            />

            <input
              type="text"
              name="lastname"
              autoComplete="off"
              placeholder="Last Name"
              value={lastname}
              onChange={onChangeHandler}
            />

            <br />

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

            <input
              type="password"
              name="password2"
              autoComplete="off"
              placeholder="Confirm Password"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="phone"
              autoComplete="off"
              placeholder="Phone"
              value={phone}
              onChange={onChangeHandler}
            />
            <input
              type="text"
              name="address"
              autoComplete="off"
              placeholder="Address"
              value={address}
              onChange={onChangeHandler}
            />
            <br />
            <input type="submit" value="SIGN UP" />
            {/* here type is submit */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
