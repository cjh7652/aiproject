import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PiAirplaneTaxiingBold } from "react-icons/pi";
import '../styles/header.scss';

const Header = () => {
    const activeStyle = { color: '#3498db' };
    return (
        <header>
            <h1><Link to="/"> <PiAirplaneTaxiingBold /><span>TripMate</span></Link></h1>

            <nav>
                <ul>
                    <li>
                        <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/explore" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Explore</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mytrip"  style={({ isActive }) => (isActive ? activeStyle : undefined)}>Mytrip</NavLink>
                    </li>
                    <li>
                        <NavLink to="/community" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Community</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;