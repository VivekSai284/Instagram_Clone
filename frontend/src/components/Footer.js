import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome, GoHomeFill, GoSearch } from 'react-icons/go';
import { RiSearchFill } from 'react-icons/ri';
import { BiMoviePlay, BiSolidMoviePlay, BiUserCircle, BiSolidUserCircle } from 'react-icons/bi';
import { BsSend, BsSendFill } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="mobile-footer">
      <nav className="footer-navbar">
        <NavLink to="/" className="footer-icon-link" title="Home">
          {({ isActive }) => isActive ? <GoHomeFill size={26} /> : <GoHome size={26}/>}
        </NavLink>

        <NavLink to="/reels" className="footer-icon-link" title="Reels">
          {({ isActive }) => isActive ? <BiSolidMoviePlay size={26} /> : <BiMoviePlay size={26} />}
        </NavLink>

        {/* Instagram places the Add Plus icon right here in the center of the footer! */}
        <NavLink to="/messages" className="footer-icon-link" title="Messages">
          {({ isActive }) => isActive ? (
            <BsSendFill size={24} style={{ transform: 'rotate(-15deg)' }} />
          ) : (
            <BsSend size={24} style={{ transform: 'rotate(-15deg)' }} />
          )}
        </NavLink>

        <NavLink to="/search" className="footer-icon-link" title="Search">
          {({ isActive }) => isActive ? <RiSearchFill size={26} /> : <GoSearch size={26} />}
        </NavLink>

        <NavLink to="/profile" className="footer-icon-link" title="Profile">
          {({ isActive }) => isActive ? <BiSolidUserCircle size={26} /> : <BiUserCircle size={26} />}
        </NavLink>
      </nav>
    </footer>
  );
};

export default Footer;
