import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import "./App.css"

import Navigation from "./routes/Navigation";

export const TOKEN_STORAGE_ID = "jobly_token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try{
          let { username } = jwt.decode(token);

          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch(e) {
          console.error("App loadUserInfo: problem loading", e);
          setCurrentUser(null);
        };
      };
      setInfoLoaded(true);
    };


    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);


  function logout() {
    setCurrentUser(null);
    setToken(null);
  };

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup Failed", errors)
      return { success: false, errors};
    };
  };


  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login Failed", errors)
      return { success: false, errors};
    };
  };


  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  };

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <div>Still Loading...</div>;
 
  return (
    <BrowserRouter>

      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <Navigation logout={logout} />
        <Routes login={login} signup={signup} />
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
