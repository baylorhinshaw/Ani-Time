import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import './Signup.css'


function Signup(props) {
  const [formState, setFormState] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

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
      <div className="container my-1">
        <Link to="/login" className='login-page-btn'>← Go to Login</Link>
      
        <h2>Signup</h2>
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
          <div className="flex-row flex-end">
            <button type="submit" className='submit-btn'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
