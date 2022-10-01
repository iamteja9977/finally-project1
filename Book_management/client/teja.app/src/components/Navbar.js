import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="menu">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="#">Dummy</Link>
        </div>
    )
}

export default NavBar;