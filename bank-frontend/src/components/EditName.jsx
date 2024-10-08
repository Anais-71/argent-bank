import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../slices/userSlice'
import { updateUserProfile } from '../utils/apiService'

const EditName = ({ firstName, lastName, onClose }) => {
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile({ firstName: newFirstName, lastName: newLastName }) // Appel à l'API pour mettre à jour le profil.
      .then((response) => {
        dispatch(getUser(response.body))
        onClose()
      })
      .catch((error) => {
        console.error('Error updating profile:', error) // Gérer les erreurs.
      })
  }

  return (
    <form onSubmit={handleSubmit} className="edit">
      <div className="edit-form">
        <input
          className="edit-input"
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
        />
        <input
          className="edit-input"
          type="text"
          value={newLastName}
          onChange={(e) => setNewLastName(e.target.value)}
        />
      </div>
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
