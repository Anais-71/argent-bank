import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../slices/signInSlice.js';
import { useNavigate } from 'react-router-dom';
import { getToken, decodeToken } from '../utils/utils.js';

const SignIn = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isAuthenticated, error } = useSelector((state) => state.signIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(fetchUser({ email: inputUsername, password: inputPassword }));
      
      const token = getToken();
      if (!token) {
        throw new Error('Token non trouvé après la connexion.');
      }
      
      const decoded = decodeToken(token);
      if (!decoded) {
        throw new Error('Erreur lors du décodage du token.');
      }
      console.log('Token décodé:', decoded);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error.message);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const isFormValid = inputUsername.length > 0 && inputPassword.length > 0;

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
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
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
  );
};

export default SignIn;
