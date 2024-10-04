import React, { useState, useEffect } from 'react';
import logo from '../assets/img/argentBankLogo.png';
import { useNavigate } from 'react-router-dom';
import { logout, fetchUserProfile } from '../utils/apiService';

/**
 * Navbar component that displays the navigation bar, showing the user's
 * first name when logged in and a sign-out link, or a sign-in link when not logged in.
 * @component
 */
const Navbar = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes.
  const [username, setUsername] = useState(''); // State to store the user's first name.
  const token = localStorage.getItem('token'); // Retrieve the authentication token from localStorage.

  /**
   * useEffect hook that fetches the user's profile if a token is found.
   * Sets the user's first name in the state.
   */
  useEffect(() => {
    if (token) {
      fetchUserProfile()
        .then((response) => {
          const { firstName } = response.body; // Extract the user's first name from the response body.
          setUsername(firstName); // Update the state with the user's first name.
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error); // Log any error during profile fetching.
        });
    }
  }, [token]); // Effect is triggered when the token changes.

  /**
   * Handles the user sign-out process. Logs the user out and navigates back to the homepage.
   */
  const handleSignOut = () => {
    logout(); // Call the logout function from the API service to clear session data.
    navigate('/'); // Navigate back to the homepage after signing out.
  };

  return (
    <nav className="main-nav">
      {/* Logo and link to homepage */}
      <a className="main-nav-logo" href={'/'}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1> {/* Screen reader text */}
      </a>
      <div>
        {token ? ( // If the user is logged in, show profile link and sign-out button.
          <>
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i>
              {username || 'User'} {/* Display the user's first name or a fallback 'User'. */}
            </a>
            <a className="main-nav-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : ( // If the user is not logged in, show the sign-in button.
          <a className="main-nav-item" href="/signup">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
