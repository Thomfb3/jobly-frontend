import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";


function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" onClick={logout}>
                        Logout <small>{currentUser.first_name || currentUser.username}</small>
                    </NavLink>
                </li>
            </ul>
        );
    };

    function loggedOutNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup">
                        Signup
                    </NavLink>
                </li>
            </ul>
        );
    };

    return (
        <nav className="Navigation">
            <div className="Navigation-logo-box">
                <Link to="/" className="Navigation-logo">
                    Jobly
                </Link>
            </div>

            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
};



export default Navigation;