import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../slices/userSlice'
import { updateUserProfile } from '../utils/apiService'

/**
 * EditName component allows users to edit their first and last names.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.firstName - Current first name of the user.
 * @param {string} props.lastName - Current last name of the user.
 * @param {Function} props.onClose - Callback function to close the edit form.
 *
 * @returns {JSX.Element} The rendered component.
 */
const EditName = ({ firstName, lastName, onClose }) => {
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  /**
   * Handles changes to the input fields.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'firstName') {
      setNewFirstName(value)
    } else if (name === 'lastName') {
      setNewLastName(value)
    }
  }

  /**
   * Handles form submission to update the user's profile.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The submit event from the form.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({ firstName: newFirstName, lastName: newLastName })
      .then((response) => {
        dispatch(updateUser({ firstName: newFirstName, lastName: newLastName })) // Update user state directly
        onClose() // Close the form after update
      })
      .catch((error) => {
        console.error('Error updating profile:', error)
        setError('Failed to update profile. Please try again.') // Handle errors
      })
  }

  return (
    <form onSubmit={handleSubmit} className="edit">
      <div className="edit-form">
        <input
          className="edit-input"
          type="text"
          name="firstName"
          value={newFirstName}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          name="lastName"
          value={newLastName}
          onChange={handleChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>}{' '}
      {/* Display error message if exists */}
      <div className="edit-click">
        <button type="submit" className="edit-btn">
          Save
        </button>
        <button type="button" onClick={onClose} className="edit-btn">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditName
