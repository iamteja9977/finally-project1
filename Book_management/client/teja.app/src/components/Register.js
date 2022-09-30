import Header from "./Header";
import { useState } from "react";
import axios from "axios";


function Register() {

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
            e.preventDefault();
            console.log(userData);
            let res = await axios.post("/api/user/register", userData);
            console.log(res.data);
        } catch (error) {
            console.error(error.data.response);
        }
    }

    return (
        <>
            <Header content={"User Register"} />

            <div className="container">
                <div>
                    <center>
                        <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="login" style={{ width: '30%' }} />
                    </center>
                </div>
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
                <p> Already have an account ? <b> Login</b></p>
            </div>
        </>
    )
}

export default Register;