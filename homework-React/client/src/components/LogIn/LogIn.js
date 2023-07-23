import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthFormInput from "../AuthFormInput/AuthFormInput";
import Modal from "../Modal/Modal";

import { validateEmail } from "../../helpers";

import './styles.scss';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const validateForm = useCallback(() => {
    let valid = true;
    
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Imvalid email adress.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    }

    return valid;
  }, [email, password]);

  useEffect(() => {
    if (isSubmited) {
      if (validateForm()) {
        const userData = JSON.parse(localStorage.getItem('testUser'));    

        if (email === userData.email && password === userData.password) {
          navigate("/");
        } else {
          setIsModalOpen(true);
        }
      }
    }
  }, [email, password, isSubmited, validateForm, navigate]);

  const onSignUpBtnClickHandler = () => {
    navigate("/signup");
  }

  const onModalCloseHandler = () => {
    setIsModalOpen(false);
    setIsSubmited(false);
  }

  const onLoginFormSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    setEmail(formData.get('email'));
    setPassword(formData.get('password'));

    setIsSubmited(true);
  }

  return (
    <div className="login-page-container">
      <div className="login-page">
        <span className="title">Sign In</span>
        <form onSubmit={onLoginFormSubmitHandler}>
          <AuthFormInput 
            type="email"
            name="email"
            placeholder="Email"
            inputError={emailError}
          />
          <AuthFormInput 
            type="password"
            name="password"
            placeholder="Password"
            inputError={passwordError}
          />
          <button type="submit">Log In</button>
        </form>
        <div className="error-message">
          {isSubmited && (emailError || passwordError) && (
            <span>{emailError} {passwordError}</span>
          )}
        </div>
        <Link to="/">Forgot password?</Link>
        <hr />
        <div className="register-box">
          <span>Not registered yet?</span>
          <button onClick={onSignUpBtnClickHandler}>Create new account</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={onModalCloseHandler}>
        <div className="modal-content">
          <h2>User not found</h2>
          <p>Specified email or password is incorrect</p>
          <button onClick={onModalCloseHandler}>Close</button>
        </div>
      </Modal>
    </div>
  )
};

export default LogIn;