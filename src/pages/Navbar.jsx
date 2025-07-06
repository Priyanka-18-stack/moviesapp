import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ watchlistCount }) => {
  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between fixed w-full top-0 z-10">
      <Link to="/" className="text-xl font-bold">
        Movie App
      </Link>
      <Link to="/Watchlist" className="text-xl font-bold">
        Watchlist ({watchlistCount})
      </Link>
    </nav>
  );
};

export default Navbar;
