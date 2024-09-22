// Navbar component 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar_list">
                <li className="navbar_item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar_item">
                    <Link to="/about">About</Link>
                </li>
                <li className="navbar_item">
                    <Link to="/features">Features</Link>
                </li>
                <li className="navbar_item">
                    <Link to="/coming">Coming soon</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;