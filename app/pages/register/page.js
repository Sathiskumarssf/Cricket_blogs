"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import register from '../../../styles/Register.module.css';
import Navbar from '@/components/Navbar';

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here, e.g., send the data to a server
    console.log({
      name,
      email,
      password,
      confirmPassword
    });
  };

  return (
    <div className={register.background}>
      <Navbar />
      <div className={register.registerContainer}>
        <div className={register.registerHeader}>
          <h2>REGISTER</h2>
        </div>
        <div className={register.registerContent}>
          <form onSubmit={handleSubmit}>
            <div className={register.inputGroup}>
              <FontAwesomeIcon icon={faUser} className={register.icon} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                className={register.inputs}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={register.inputGroup}>
              <FontAwesomeIcon icon={faEnvelope} className={register.icon} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email ID"
                required
                className={register.inputs}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={register.inputGroup}>
              <FontAwesomeIcon icon={faLock} className={register.icon} />
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                required
                className={register.inputs}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className={`${register.icon} ${register.eyeIcon}`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <div className={register.inputGroup}>
              <FontAwesomeIcon icon={faLock} className={register.icon} />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className={register.inputs}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEyeSlash : faEye}
                className={`${register.icon} ${register.eyeIcon}`}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
            <button type="submit" className={register.registerBtn}>REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
