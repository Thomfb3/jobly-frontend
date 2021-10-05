import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import JoblyApi from "./api/api";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";

import Navigation from "./routes/Navigation";

export const TOKEN_STORAGE_ID = "jobly_token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  //const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if (token) {
        try{
          let { username } = jwt.decode(token);

          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch(e) {
          setCurrentUser(null);
        };
      };
    };

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
      return { succes: true };
    } catch (e) {
      console.error("Signup Failed", e)
      return { success: false, e};
    };
  };


  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { succes: true };
    } catch (e) {
      console.error("Login Failed", e)
      return { success: false, e};
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
