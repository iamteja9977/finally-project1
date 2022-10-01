import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
// import NavBar from "./Navbar";

function Register({ alert, showAlert }) {

    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: ""
    })

    const { firstname, lastname, email, password, password2 } = userData;

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            //Prevents Refreshing the Form
            e.preventDefault();
            console.log(userData);
            let res = await axios.post("/api/user/register", userData);
            console.log(res.data);
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

            console.log("Catch")
            console.log(error.response.data.error);
        }
    }

    return (
        <>
            <Header content={"User Register"} />
            {/* <NavBar /> */}
            <div className="container">
                <div>
                    <center>
                        <Link to="/"> <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="login" style={{ width: '30%' }} /></Link>
                    </center>
                </div>
                {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <label htmlFor="firstname"><b>First Name :</b></label>
                        <input type="text" name="firstname" autoComplete="off" value={firstname} onChange={onChangeHandler} />
                        <label htmlFor="lastname"><b>Last Name :</b></label>
                        <input type="text" name="lastname" autoComplete="off" value={lastname} onChange={onChangeHandler} />
                        <label htmlFor="email"><b>Email : </b></label><br />
                        <input type="email" name="email" autoComplete="off" value={email} onChange={onChangeHandler} />
                        <label htmlFor="password"><b> Password : </b></label>
                        <input type="password" name="password" autoComplete="off" value={password} onChange={onChangeHandler} />
                        <label htmlFor="password"><b> Confirm Password : </b></label>
                        <input type="password" name="password2" autoComplete="off" value={password2} onChange={onChangeHandler} /><br />
                        <input type="submit" value="Register" />
                    </form>
                </div>
                <p> Already have an account ? <b> <Link to="/login">Login</Link></b></p>
            </div>
        </>
    )
}

export default Register;