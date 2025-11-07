import React from 'react';
import { Link }  from 'react-router-dom';
import '../CSS/header.css';

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="link">
                <div className="brand"></div>
            </Link>
            <div className="header-element">
                <Link to="/news" className="link">News</Link>
            </div>
            <div className="header-element">
                <Link to="/profile" className="link">Threat Profiles</Link>
            </div>
            <div className="header-element">
                <Link to="/infiltrators" className="link">IT Infiltrators</Link>
            </div>
            <div className="header-element">
                <Link to="/createProfile" className="link">Create Profiles</Link>
            </div>
        </div>
    );
}

export default Header;