import React, {useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ResumeReview from "./components/ResumeReview";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [password, setPassword] = useState("");
  const [passwordNumber, setpasswordNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [passwordCounter, setPasswordCounter] = useState(0);
  const [ispasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    setpasswordNumber(Math.floor(Math.random() * 10) + 1);
  },[]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/resume-review"
          element={
            ispasswordMatch ? (
              <ResumeReview />
            ) : (
              <Navigate
                to="/login"
                state={{ msg: "You have to first login" }}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            <Login
              passwordNumber={passwordNumber}
              passwordCounter={passwordCounter}
              setPasswordCounter={setPasswordCounter}
              ispasswordMatch={ispasswordMatch}
              setIsPasswordMatch={setIsPasswordMatch}
              password={password}
              setPassword={setPassword}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
