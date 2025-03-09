import React, { useState } from "react";
import "./index.css";
import { Outlet } from "react-router-dom";
import NavbarMinimal from "./Components/NavBar.jsx";
import { useSelector } from "react-redux";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";

function App() {
  const Auth = useSelector((state) => {
    return state.auth.isAuth; 
  });
  const [showSignup,setShowSignup] = useState(true);
  return (
    <>
      <div className="app-container">
        <div className="navbar">
          <NavbarMinimal />
        </div>
        <div className="content">
        {Auth ? (
            <Outlet />
          ) : showSignup ? (
            <Signup toggleForm={() => setShowSignup(false)} />
          ) : (
            <Login toggleForm={() => setShowSignup(true)} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
