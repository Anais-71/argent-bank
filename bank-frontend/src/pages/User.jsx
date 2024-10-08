import React, { useState, useEffect } from 'react'
import { fetchUserProfile } from '../utils/apiService'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../slices/userSlice'
import EditName from '../components/EditName'

const User = () => {
  const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const [error] = useState(null) // État pour gérer les erreurs
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await fetchUserProfile()
          console.log('API Response:', response) // Ajoutez ceci pour voir la réponse
          if (response && response.body) {
            const { firstName, lastName } = response.body
            console.log('Fetched user data:', { firstName, lastName }) // Vérifiez ici
            console.log('Dispatching user data:', { firstName, lastName })
            dispatch(getUser({ firstName, lastName }))
          } else {
            console.log('Invalid response structure:', response) // Ajoutez ceci pour vérifier la structure de la réponse
          }
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
    }

    fetchUserData()
  }, [token, dispatch])

  // Log pour vérifier l'état de l'utilisateur après dispatch
  const user = useSelector((state) => state.user)
  console.log('Current user state:', user)

  // Gestion de l'affichage d'erreurs
  if (error) {
    return <div>{error}</div>
  }

  // Vérification des données utilisateur
  if (!user || !user.firstName || !user.lastName) {
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

        {/* Sections de compte */}
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
