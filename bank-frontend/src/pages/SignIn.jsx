import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/apiService.js'
import { loginSlice } from '../slices/authSlice.js'

/**
 * SignIn component for user authentication.
 *
 * This component allows users to enter their username and password to sign in.
 * It handles form submission, validates the input, and manages the user authentication state.
 *
 * @returns {JSX.Element} The rendered SignIn component.
 */
const SignIn = () => {
  const [inputUsername, setInputUsername] = useState('') // State for storing the username input
  const [inputPassword, setInputPassword] = useState('') // State for storing the password input
  const dispatch = useDispatch() // Redux dispatch function
  const navigate = useNavigate() // React Router navigate function
  const error = useSelector((state) => state.signIn) // Error message from Redux store

  /**
   * Handles form submission.
   *
   * It prevents the default form behavior, attempts to log in using the provided credentials,
   * and redirects the user to the profile page if successful.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = await login(inputUsername, inputPassword) // Attempt to log in

      if (!token) {
        throw new Error('Error decoding token.')
      }

      // Store the token in localStorage and Redux
      localStorage.setItem('token', token)
      dispatch(loginSlice({ token }))

      // Redirect to the profile page upon successful login
      navigate('/profile')
    } catch (error) {
      console.error('Error during submission:', error.message) // Log any errors encountered
    }
  }

  /**
   * Handles input field changes.
   *
   * Updates the state based on the input field that triggered the change.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      setInputUsername(value) // Update username state
    } else if (name === 'password') {
      setInputPassword(value) // Update password state
    }
  }

  // Validate form fields to enable/disable the submit button
  const isFormValid = inputUsername.length > 0 && inputPassword.length > 0

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username" // Identifies the input field
              value={inputUsername}
              onChange={handleChange} // Handles input changes
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // Identifies the input field
              value={inputPassword}
              onChange={handleChange} // Handles input changes
            />
          </div>
          {error && <p className="error-message">{error}</p>}{' '}
          {/* Display error message if present */}
          <button
            type="submit"
            className="sign-in-button"
            disabled={!isFormValid} // Disable the button if the form is invalid
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default SignIn
