import Header from "./Header";

function Login() {
    return (
        <>
            <Header content={"User Login"} />

            <div className="container">
                <div>
                    <center>
                        <img src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="login" style={{ width: '30%' }} />
                    </center>
                </div>
                <div>
                    <form >
                        <label htmlFor="email"><b>Email : </b></label><br />
                        <input type="email" name="email" autoComplete="off" />
                        <label htmlFor="password"><b> Password : </b></label>
                        <input type="password" name="password" />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <p> Do not have an account ? <b> Register</b></p>
            </div>
        </>
    )
}
export default Login;