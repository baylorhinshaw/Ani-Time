import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    
    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
    const mutationResponse = await addUser({
      variables: formState
    });
    console.log(mutationResponse)
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  } catch (err) {
    console.error(err)
  }
  };



  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstname">First Name:</label>
          <input
            placeholder="First"
            name="firstname"
            type="firstname"
            id="firstname"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastname">Last Name:</label>
          <input
            placeholder="Last"
            name="lastname"
            type="lastname"
            id="lastname"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
