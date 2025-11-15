import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSS/header.css';
import logo from '../assets/logo.png';

const Header = () => {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark header sticky-top">
            <div className="container-fluid px-3 px-lg-4">
                {/* Brand/Logo */}
                <Link to="/" className="navbar-brand brand d-flex align-items-center">
                    <img src={logo} alt="Logo" className="logo-image" />
                </Link>

                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={handleNavCollapse}
                    aria-controls="navbarNav" 
                    aria-expanded={!isNavCollapsed} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Links */}
                <div 
                    className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} 
                    id="navbarNav"
                >
                    <ul className="navbar-nav ms-lg-4 gap-lg-3">
                        <li className="nav-item">
                            <Link 
                                to="/news" 
                                className={`nav-link header-element ${isActive('/news') ? 'active' : ''}`}
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/profile" 
                                className={`nav-link header-element ${isActive('/profile') ? 'active' : ''}`}
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                Threat Profiles
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/infiltrators" 
                                className={`nav-link header-element ${isActive('/infiltrators') ? 'active' : ''}`}
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                IT Infiltrators
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/createProfile" 
                                className={`nav-link header-element ${isActive('/createProfile') ? 'active' : ''}`}
                                onClick={() => setIsNavCollapsed(true)}
                            >
                                Create Profiles
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;