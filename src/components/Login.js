import React, { useState } from "react";
import "./styles/Login.css";
import "./styles/Header.css";
import logo from "../assets/logo.png";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Eye, EyeOff } from 'lucide-react';

function Button({ type, onClick, className, disabled }) {
  const getButtonText = () => {
    switch(type) {
      case "INC": return "INC";
      case "DEC": return "DEC";
      case "SUBMIT": return "Submit";
      default: return type;
    }
  };

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {getButtonText()}
    </button>
  );
}

function Login({
  passwordCounter,
  setPasswordCounter,
  passwordNumber,
  ispasswordMatch,
  setIsPasswordMatch,
  password,
  setPassword,
}) {
  const [stringPassword, setStringPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const message = location.state?.msg;
  
  // Define the correct string password
  const CORRECT_STRING_PASSWORD = "recursion2024"; // You can change this to your desired password

  const updatePasswordCounter = (type) => {
    const newCounter = type === "INC" ? passwordCounter + 1 : passwordCounter - 1;
    setPasswordCounter(newCounter);
    checkPasswordMatch(newCounter, stringPassword);
  };

  const handleStringPasswordChange = (e) => {
    const newStringPassword = e.target.value;
    setStringPassword(newStringPassword);
    checkPasswordMatch(passwordCounter, newStringPassword);
  };

  const checkPasswordMatch = (counter, strPass) => {
    const isNumberMatch = counter === passwordNumber;
    const isStringMatch = strPass === CORRECT_STRING_PASSWORD;
    setIsPasswordMatch(isNumberMatch && isStringMatch);
  };

  const handleSubmit = () => {
    if (ispasswordMatch) {
      toast.success(" Access Granted!", { position: "top-center" });
    } else {
      toast.error("Incorrect Password. Try Again!", { position: "top-center" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (message) {
      toast.warn(message, { position: "top-center", autoClose: 3000 });
    }
  }, [message]);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <nav className={`navbar ${isSidebarOpen ? "shifted" : ""}`}>
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <h1 className="navbar-title">Welcome to Smart REC</h1>
        <a href="https://recursionnitd.in/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </a>
      </nav>
      <ToastContainer />
      <div className="login-container">
        <h2 className="login-title">Login Page</h2>
        <div className="password-section">
          <p className="password-info">Capture Counter: {passwordCounter}</p>
          <p className="password-info">Capture Number: {passwordNumber}</p>
          <div className="input-container">
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={stringPassword}
                onChange={handleStringPasswordChange}
                placeholder="Enter text password"
                className="password-input"
              />
              <button 
                onClick={togglePasswordVisibility}
                className="password-toggle"
                type="button"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="button-container">
          <Button
            type="INC"
            onClick={() => updatePasswordCounter("INC")}
            className="inc-button"
          />
          <Button
            type="DEC"
            onClick={() => updatePasswordCounter("DEC")}
            className="dec-button"
          />
        </div>
        <Button
          type="SUBMIT"
          onClick={handleSubmit}
          className="submit-button"
          disabled={!stringPassword}
        />
      </div>
    </>
  );
}

export default Login;