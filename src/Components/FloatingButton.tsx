import React from "react";
import { Link } from "react-router-dom";

function FloatingHomeButton() {
  return (
    <Link
      to="/"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 1000
      }}
    >
      <button
        style={{
          padding: '10px 16px',
          borderRadius: '8px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        ← Home
      </button>
    </Link>
  );
}

export default FloatingHomeButton;
