import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css'
import './Home.css'

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: formState,
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };



  return (
    
  <div className= 'loginContainer'>
      <div className='signupBtn'><Link to="/signup">← Go to Signup</Link>
      </div>
      <div className="container my-1">
        <div className='login-text'>
          <h2>LOGIN</h2>
        </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 padding">
          <label htmlFor="email" className='label'>email-address:</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="flex-row space-between my-2 padding">
          <label htmlFor="pwd" className='label'>password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            className="input"
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit" className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
  </div>

  );
};
  

export default Login;
