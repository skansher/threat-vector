import React from 'react';
import { Link }  from 'react-router-dom';
import '../CSS/header.css';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="header-element ms-4">
                <Link to="/" className="link text-decoration-none">
                    <div className="brand">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </div>
                </Link>
            </div>
            <div className="header-element">
                <Link to="/news" className="link  text-decoration-none">News</Link>
            </div>
            <div className="header-element">
                <Link to="/profile" className="link  text-decoration-none">Threat Profiles</Link>
            </div>
            <div className="header-element">
                <Link to="/infiltrators" className="link  text-decoration-none">IT Infiltrators</Link>
            </div>
            <div className="header-element">
                <Link to="/createProfile" className="link text-decoration-none">Create Profiles</Link>
            </div>
        </div>
    );
}

export default Header;