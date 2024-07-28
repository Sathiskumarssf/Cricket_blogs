"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import login from '../../../styles/Login.module.css';
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the login logic here, e.g., send the data to a server
    console.log({ email, password });
  };

  return (
    <div className={login.background}>
      <Navbar />
      <div className={login.loginContainer}>
        <div className={login.loginHeader}>
          <h2>CUSTOMER LOGIN</h2>
        </div>
        <div className={login.loginContent}>
          <form onSubmit={handleSubmit}>
            <div className={login.inputGroup}>
              <FontAwesomeIcon icon={faEnvelope} className={login.icon} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email ID"
                required
                className={login.inputs}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={login.inputGroup}>
              <FontAwesomeIcon icon={faLock} className={login.icon} />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                className={login.inputs}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className={`${login.icon} ${login.eyeIcon}`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <button type="submit" className={login.loginBtn}>LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
