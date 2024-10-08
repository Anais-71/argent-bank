import React, { useState, useEffect } from 'react'
import { fetchUserProfile } from '../utils/apiService'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../slices/userSlice'
import EditName from '../components/EditName'

/**
 * User component for displaying user profile and account information.
 *
 * @returns {JSX.Element} The rendered User component.
 */
const User = () => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState(null) // State for error handling
  const [loading, setLoading] = useState(true) // State for loading indicator
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetchUserProfile()
          if (response && response.body) {
            const { firstName, lastName } = response.body
            dispatch(getUser({ firstName, lastName }))
          } else {
            setError('Failed to fetch user data.') // Set error if response is invalid
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
          setError('Error fetching user profile. Please try again.') // Set error message
        } finally {
          setLoading(false) // Set loading to false after fetching
        }
      }
    }

    fetchUserData()
  }, [token, dispatch])

  // Log to check the user state after dispatch
  const user = useSelector((state) => state.user)
  console.log('Current user state:', user)

  // Display error message if there's an error
  if (error) {
    return <div>{error}</div>
  }

  // Display loading indicator while fetching data
  if (loading) {
    return <div>Loading...</div>
  }

  const { firstName, lastName } = user

  return (
    <div>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        </div>

        {isEditing && (
          <EditName
            firstName={firstName}
            lastName={lastName}
            onClose={() => setIsEditing(false)}
          />
        )}

        <h2 className="sr-only">Accounts</h2>

        {/* Account sections */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default User
