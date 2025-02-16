import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/Sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/resume-review" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-chart-bar"></i> ResumeReview
          </Link>
          <Link to="#" className="nav-link" onClick={() => setIsOpen(false)}>
            <i className="fas fa-comment"></i> Feedback
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
