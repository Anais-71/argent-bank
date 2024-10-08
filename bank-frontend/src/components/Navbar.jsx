import React, { useState, useEffect } from 'react'
import logo from '../assets/img/argentBankLogo.png'
import { useNavigate } from 'react-router-dom'
import { fetchUserProfile } from '../utils/apiService'
import { logoutSlice } from '../slices/authSlice'

const Navbar = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const token = localStorage.getItem('token') // Récupérer le token

  useEffect(() => {
    if (token) {
      // Si le token est disponible, récupérer les infos du profil
      fetchUserProfile()
        .then((response) => {
          const { firstName } = response.body
          setUsername(firstName)
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error)
        })
    }
  }, [token])

  const handleSignOut = () => {
    // Supprimer le token lors de la déconnexion
    localStorage.removeItem('token')
    navigate('/') // Rediriger vers la page d'accueil
  }

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href={'/'}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {token ? (
          <>
            <a className="main-nav-item" href="/profile">
              <i className="fa fa-user-circle"></i>
              {username || 'User'}
            </a>
            <a
              className="main-nav-item"
              onClick={handleSignOut}
              style={{ cursor: 'pointer' }}
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
