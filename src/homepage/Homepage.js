import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";



function Homepage() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return (
            <div className="Homepage"> 
                <h1 className="Homepage-title">Jobly</h1>
                <p>All the jobs in one, convenient place.</p>
                <Link to="/login">
                    <button className="Button">Login</button>
                </Link>
                <Link to="/signup">
                    <button className="Button">Signup</button>
                </Link>
            </div>
        );
    } 

    return (
        <div className="Homepage"> 
            <h1 className="Homepage-title-2">Welcome Back, {currentUser.firstName || currentUser.username } !</h1>
            <p>All the jobs in one, convenient place.</p>
            <p></p>
        
        </div>
    );
   
;}

export default Homepage;