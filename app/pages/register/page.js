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
  const [message,setMessage] =useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let action= "register";

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
       
      const response = await fetch('http://localhost:3000/api/authentication', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({action,name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if(data.message ==="User registered successfully"){
        setMessage('Account successfully created ')
        setTimeout(() => setMessage(''), 3000);
      }
      console.log(data); // Handle success, e.g., redirect to another page or show success message
    } catch (error) {
      console.error('Error:', error); // Handle error, e.g., show error message
    }
  };

  return (
    <div className={register.background}>
      <Navbar />
      <div className={register.registerContainer}>
        <div className={register.registerHeader}>
          <h2>REGISTER</h2>
        </div>
        <div className={register.registerContent}>
        {message && <div className={register.message}>{message}</div>}
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
