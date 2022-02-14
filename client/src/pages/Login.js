import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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
    
  //   <div className= 'loginContainer'>
  //     <div className='signupBtn'><Link to="/signup">← Go to Signup</Link></div>
      
  //   <div className="container my-1">
      

  //     <h2>Login</h2>
  //     <form onSubmit={handleFormSubmit}>
  //       <div className="flex-row space-between my-2">
  //         <label htmlFor="email">Email address:</label>
  //         <input
  //           placeholder="youremail@test.com"
  //           name="email"
  //           type="email"
  //           id="email"
  //           onChange={handleChange}
  //         />
  //       </div>
  //       <div className="flex-row space-between my-2">
  //         <label htmlFor="pwd">Password:</label>
  //         <input
  //           placeholder="******"
  //           name="password"
  //           type="password"
  //           id="pwd"
  //           onChange={handleChange}
  //         />
  //       </div>
  //       {error ? (
  //         <div>
  //           <p className="error-text">The provided credentials are incorrect</p>
  //         </div>
  //       ) : null}
  //       <div className="flex-row flex-end">
  //         <button type="submit">Submit</button>
  //       </div>
  //     </form>
  //   </div>
  // </div>


  <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
            onChange: {handleChange}
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
            onChange: {handleChange}
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
