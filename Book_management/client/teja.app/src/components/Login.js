import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ alert, showAlert }) {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = userData;

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (JSON.parse(localStorage.getItem("token").role == "admin")) {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        }   
    }, [])
    const onSubmitHandler = async (e) => {
        try {
            //Prevents Refreshing the Form
            e.preventDefault();
            // console.log(userData);
            let res = await axios.post("/api/login", userData);
            // console.log(res.data);
            localStorage.setItem("token", JSON.stringify({ token: res.data.token, role: res.data.role }))
            if (res.data.role == "admin") {
                navigate("/admin");
            } else {
                navigate("/user");
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
            <Header content={"User Login"} />

            <div className="container">
                <div>
                    <center>
                        <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="login" style={{ width: '30%' }} />
                    </center>
                </div>
                {alert !== null && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}
                <div>
                    <form onSubmit={onSubmitHandler}>
                        <label htmlFor="email"><b>Email : </b></label><br />
                        <input type="email" name="email" autoComplete="off" value={email} onChange={onChangeHandler} />
                        <label htmlFor="password"><b> Password : </b></label>
                        <input type="password" name="password" value={password} onChange={onChangeHandler} />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <p> Do not have an account ? <b> Register</b></p>
            </div>
        </>
    )
}
export default Login;