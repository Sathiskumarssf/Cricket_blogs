"use client"; // Ensure this is at the top of your file

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import login from '../../../styles/Login.module.css';
import Navbar from '@/components/Navbar';

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter();

  const encodeUsername = (username) => {
    return btoa(username); // Base64 encode username
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch('/api/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'login', email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.message === 'User authenticated successfully') {

        const username = data.data;
        const encodedUsername = encodeUsername(username);
        router.push(`/?username=${encodeURIComponent(encodedUsername)}`); // Navigate to the home page
        
      }else if(data.message === 'admin authenticated successfully'){

        const username = data.data;
        const encodedUsername = encodeUsername(username);
        router.push(`/pages/admin?username=${encodeURIComponent(encodedUsername)}`);

      } else if (data.message === 'Invalid credentials') {
        setErrorMessage('Password incorrect'); // Set error message
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Additional error handling logic
    }
  };

  return (
    <div className={login.background}>
      <Navbar />
      <div className={login.loginContainer}>
        <div className={login.loginHeader}>
          <h2>CUSTOMER LOGIN</h2>
        </div>
        <div className={login.loginContent}>
          {errorMessage && <div className={login.errorMessage}>{errorMessage}</div>} {/* Display error message */}
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
