import React, { useState } from 'react';
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Password from '../../component/password';
import { message } from 'antd';
import axios from 'axios'
import { baseURL } from '../../core'
import './signup.scss';

function Signup() {
  const navigate = useNavigate()

  const [firstname, set_firstname] = useState('');
  const [lastname, set_lastname] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [Confirmpassword, set_Confirmpassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log({ firstname, lastname, email, password, Confirmpassword });

    try {
      if (!firstname) {
        message.error('First name is Required...')
        return
      }

      if (!lastname) {
        message.error('First name is Required...')
        return
      }

      if (!email) {
        message.error('First name is Required...')
        return
      }

      if (!password) {
        message.error('First name is Required...')
        return
      }

      if (password !== Confirmpassword) {
        message.error('Passwords do not match!');
        return;
      }

      const response = await axios.post(`${baseURL}/api/v1/signup`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })

      message.success('Signup Successfully...')

      console.log(response)
      navigate('/login')
      set_firstname('')
      set_lastname('')
      set_email('')
      set_password('')
      set_Confirmpassword('')

    } catch (error) {
      console.error(error)
      message.error(error.message)
    }

  };

  return (
    <div className='Container-signup'>
      <div className="signup-card">
        <div className="Nook">
          <h1><AiOutlineAlipayCircle />Nook-Social</h1>
          <b>Signup Now...</b>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="firstname">
            <input
              type="text"
              placeholder='Enter First Name...'
              value={firstname}
              onChange={(e) => set_firstname(e.target.value)}
              required
            />
          </div>
          <div className="lastname">
            <input
              type="text"
              placeholder='Enter Last Name...'
              value={lastname}
              onChange={(e) => set_lastname(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <input
              type="email"
              placeholder='Enter Email...'
              value={email}
              onChange={(e) => set_email(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <Password
              placeholder='Enter Password...'
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
          </div>
          <div className="ConFirm-password">
            <Password
              placeholder='Enter Confirm-password...'
              value={Confirmpassword}
              onChange={(e) => set_Confirmpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
          <Link to="/login" className="login-link">Account Already exists? Login now</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;