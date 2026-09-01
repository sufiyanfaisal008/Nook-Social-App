import { useState } from 'react';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import Password from '../../component/password';
import './login.scss';
import { baseURL } from '../../core';
import { store } from '../../store/states';

function Login() {
  
    const { globalLogin, globallogout, user, islogin } = store()
  const navigate = useNavigate()

  const [email, set_email] = useState('');
  const [password, set_password] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        message.error('Email is Required...');
        return;
      }

      if (!password) {
        message.error('Password is Required...');
        return;
      }

      const response = await axios.post(`${baseURL}/api/v1/login`,{

        email: email,
        password: password

      })

      message.success('Login Successfully...');
      localStorage.setItem("token" , response.data.data.token)

      globalLogin(response.data.data.user)
      navigate('/')

      set_email('');
      set_password('');

    } catch (error) {
      console.error(error);
      message.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className='Container-login'>
      <div className="login-card">
        <div className="Nook">
          <h1><AiOutlineAlipayCircle />Nook-Social</h1>
          <b>Login Now...</b>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="email">
            <input
              type="email"
              placeholder='Enter Email...'
              value={email}
              onChange={(e) => set_email(e.target.value)}
            />
          </div>
          <div className="password">
            <Password
              placeholder='Enter Password...'
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <Link to="/signup" className="signup-link">Don't have an account? Signup now</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;