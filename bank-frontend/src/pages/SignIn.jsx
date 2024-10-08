import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/apiService.js'
import { loginSlice } from '../slices/authSlice.js'

const SignIn = () => {
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector((state) => state.signIn)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = await login(inputUsername, inputPassword)

      if (!token) {
        throw new Error('Erreur lors du décodage du token.')
      }

      // Stocker le token dans le localStorage et dans Redux
      localStorage.setItem('token', token)
      dispatch(loginSlice({ token }))

      // Une fois connecté, rediriger vers le profil
      navigate('/profile')
    } catch (error) {
      console.error('Erreur lors de la soumission:', error.message)
    }
  }

  // Fonction handleChange pour gérer le changement dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      setInputUsername(value)
    } else if (name === 'password') {
      setInputPassword(value)
    }
  }

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
              name="username" // ajouter un name pour identifier le champ
              value={inputUsername}
              onChange={handleChange} // utiliser handleChange ici
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password" // ajouter un name pour identifier le champ
              value={inputPassword}
              onChange={handleChange} // utiliser handleChange ici
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="sign-in-button"
            disabled={!isFormValid}
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default SignIn
