import React, { useState, useEffect } from 'react'
import logo from '../assets/img/argentBankLogo.png'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../utils/apiService'

/**
 * Navbar component for the application.
 *
 * Displays the application logo and provides navigation links.
 * If the user is signed in, it shows the username and a sign-out option.
 * If the user is not signed in, it shows a sign-in option.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const navigate = useNavigate() // Hook for programmatic navigation
  const [username, setUsername] = useState('') // State for storing the username
  const token = localStorage.getItem('token') // Retrieve the authentication token

  useEffect(() => {
    if (token) {
      // Fetch user profile information if the token is available
      fetchUserProfile()
        .then((response) => {
          const { firstName } = response.body // Extract the first name from the response
          setUsername(firstName) // Set the username state
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error) // Log any errors encountered
        })
    }
  }, [token]) // Dependency array to re-run effect if token changes

  /**
   * Handles user sign out.
   *
   * Removes the token from localStorage and navigates to the homepage.
   */
  const handleSignOut = () => {
    localStorage.removeItem('token') // Remove the token upon sign out
    navigate('/') // Redirect to the homepage
  }

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href={'/'}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo" // Alt text for the logo image
        />
        <h1 className="sr-only">Argent Bank</h1>{' '}
        {/* Screen reader only text for accessibility */}
      </a>
      <div>
        {token ? (
          <>
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i>
              {username || 'User'}{' '}
              {/* Display the username or 'User' if not available */}
            </a>
            <a
              className="main-nav-item"
              onClick={handleSignOut}
              style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <a className="main-nav-item" href="/signup">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        )}
      </div>
    </nav>
  )
}

export default Navbar
