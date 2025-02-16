import React, { useState } from "react";
import "./styles/Login.css";
import "./styles/Header.css";
import logo from "../assets/logo.png";
import Sidebar from "./Sidebar";
import PDFUploader from "./PDFUploader";

function ResumeReview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Resume Uploader & Preview</h1>
      <PDFUploader />
    </div>
    </>
  );
}

export default ResumeReview;
