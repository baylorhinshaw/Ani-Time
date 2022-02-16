import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css'
// import './Home.css'

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
    <div>
      <div className='prevpageBtn'>
        <Link to="/signup">← Go to Signup</Link>
      </div>
      <div className="loginContainer">
        <div className='login-text'>
          <h2>LOGIN</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="padding margin">
            <input
              placeholder="enter email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="padding margin">
            <input
              placeholder="enter password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="input"
            />
          </div>
          {error ? (
              <p className="error-text">The provided credentials are incorrect</p>
          ) : null}
          <div className="padding margin">
            <button type="submit" className='submit-btn'>Submit</button>
          </div>
        </form>
      </div>
    </div>

  );
};
  

export default Login;
