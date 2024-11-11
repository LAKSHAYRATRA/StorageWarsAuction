import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Storage Wars Auction System</h1>
        <div>
          <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/listproduct" className="px-3 py-2 hover:bg-gray-700 rounded">List Product</Link>
              <Link to="/allproducts" className="px-3 py-2 hover:bg-gray-700 rounded">All Products</Link>
              <Link to="/notification" className="px-3 py-2 hover:bg-gray-700 rounded">Notifications</Link>
              <Link to="/profile" className="px-3 py-2 hover:bg-gray-700 rounded">Profile</Link> {/* Add Profile Link */}
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 hover:bg-gray-700 rounded">Login</Link>
              <Link to="/signup" className="px-3 py-2 hover:bg-gray-700 rounded">SignUp</Link>
            </>
          )}
          <Link to="/contact" className="px-3 py-2 hover:bg-gray-700 rounded">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
