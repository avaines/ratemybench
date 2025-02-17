import React, { useState } from 'react';
import BenchForm from './BenchForm';
import '../styles/navbar.css';
import '../styles/main.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            Rate My Bench
          </a>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>
              <a href="/list">Benches</a>
            </li>
            <li>
              <a href="/">Map</a>
            </li>
            <li>
              <a href="#" onClick={() => setIsModalOpen(true)}>Add-a-bench</a>
            </li>
          </ul>
        </div>
      </nav>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <BenchForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;