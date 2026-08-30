import React from 'react';
import { Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './passwordInput.scss';

const PasswordInput = ({ placeholder, value, onChange }) => (
  <Input.Password
    size="large"
    placeholder={placeholder || "Enter password"}
    value={value}
    onChange={onChange}
    prefix={<LockOutlined className="password-icon" />}
    className="custom-password-input"
  />
);

export default PasswordInput;