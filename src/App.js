import React, { useEffect, useState } from "react";
import LoginScreen from "./screen/loginScreen";
import "@picocss/pico";
import SignUpScreen from "./screen/signUpScreen";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePageScreen from "./screen/homePageScreen";

function App() {
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return;
    }
    setAuthToken(token);
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen authToken={authToken} setAuthToken={setAuthToken}/>} />
      <Route path="/signup" element={<SignUpScreen authToken={authToken} setAuthToken={setAuthToken}/>} />
      <Route
        path="/"
        element={
        localStorage.getItem("authToken") ? (
            <HomePageScreen authToken={authToken} setAuthToken={setAuthToken}/>
          ) : (
            <Navigate to="/login"/>
          )
        }
      />
    </Routes>
  );
}

export default App;
