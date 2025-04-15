// Navbar component 
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" id='logo'>
                <img src="/nav_logo.png" alt="nav_logo" />
            </Link>
            <ul className="navbar_list">
                <li className="navbar_item">
                    <Link to="#about">About</Link>
                </li>
                <li className="navbar_item">
                    <Link to="/extension">Extension</Link>
                </li>
                <li className="navbar_item">
                    <Link to="#features">Features</Link>
                </li>
                <li className="navbar_item">
                    <Link to="/tree" className='primary'>Let's Tree</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;