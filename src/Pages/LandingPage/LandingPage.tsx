import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h1>BlogIt</h1>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {isLoggedIn ? (
            <>
              <Link to="/write" className="signup-btn" onClick={() => setMenuOpen(false)}>Write</Link>
              <Link to="/myblogs" className="login-btn" onClick={() => setMenuOpen(false)}>My Blogs</Link>
              <Link to="/profile" className="signup-btn" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2 className="hero-headline">Share your story with the world</h2>
          <p className="hero-subheadline">
            BlogIt allows you to share your experiences, insights, and creativity with a global audience.
          </p>
          <div className="cta-buttons">
            {isLoggedIn ? (
              <>
                <Link to="/write" className="cta-btn primary-cta">Start Writing</Link>
                <Link to="/blogs" className="cta-btn secondary-cta">Explore Stories</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="cta-btn primary-cta">Start Writing</Link>
                <Link to="/blogs" className="cta-btn secondary-cta">Explore Stories</Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
