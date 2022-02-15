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
    <div className='signupContainer'>
        <div className='prevpageBtn'>
          <Link to="/login" >← Go to Login</Link>
        </div>
        <div className="container my-1">
          <div className='signup-text'>
            <h2>SIGNUP</h2>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2 padding">
              <label htmlFor="firstname" className='label'>First Name:</label>
              <input
                placeholder="first"
                name="firstname"
                type="firstname"
                id="firstname"
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="flex-row space-between my-2 padding">
              <label htmlFor="lastname" className='label'>Last Name:</label>
              <input
                placeholder="last"
                name="lastname"
                type="lastname"
                id="lastname"
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="flex-row space-between my-2 padding">
              <label htmlFor="email" className='label'>Email:</label>
              <input
                placeholder="email@email.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="flex-row space-between my-2 padding">
              <label htmlFor="pwd" className='label'>Password:</label>
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
                <p className="error-text">Signup incomplete</p>
              </div>
            ) : null}

            <div className="flex-row flex-end">
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Signup;
