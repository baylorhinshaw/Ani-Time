import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import './Signup.css'
// import './Home.css'


function Signup() {
  const [formState, setFormState] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

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
    const mutationResponse = await addUser({
      variables: formState
    });

    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  } catch (err) {
    console.error(err)
  }
  };



  return (
    <div>
      <div className='prevpageBtn'>
        <Link to="/login" >← Go to Login</Link>
      </div>
      <div className="signupContainer">
        <div className='signup-text padding'>
          <h2>SIGNUP</h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="padding">
            <input
              placeholder="first name"
              name="firstname"
              type="firstname"
              id="firstname"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="padding">
            <input
              placeholder="last name"
              name="lastname"
              type="lastname"
              id="lastname"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="padding">
            <input
              placeholder="email@email.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="padding">
            <input
              placeholder="password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="input"
            />
          </div>
          {error ? (
              <p className="error-text">Signup incomplete</p>
          ) : null}

          <div className="padding margin">
            <button type="submit" className='submit-btn'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
