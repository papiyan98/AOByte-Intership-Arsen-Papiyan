import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import AuthFormInput from "../AuthFormInput/AuthFormInput";

import { ThemeContext } from "../../context/Theme.context";

import { registerUser } from "../../services/auth.service";

import { validateEmail } from "../../helpers";

import './styles.scss';

const SignUp = () => {
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isPassNotEqual, setIsPassNotEqual] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const themeContext = useContext(ThemeContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccessfull) {
      setIsModalOpen(true)
    }
  }, [isSuccessfull]);

  const validateForm = (formData) => {
    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    let valid = true;
    
    setEmailError('');
    setNameError('');
    setPasswordError('');
    setIsPassNotEqual('');
    
    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email adress.');
      valid = false;
    }

    if (!name) {
      setNameError('Email is required.');
      valid = false;
    } else if (name.length < 3) {
      setNameError('Password must be at least 3 characters long.')
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    }

    if (!confirmPassword) {
      setIsPassNotEqual('Passwords must be identical.');
      valid = false;
    } else if (confirmPassword !== password) {
      setIsPassNotEqual('Passwords are not equal.');
    }

    return valid;
  };
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    if (validateForm(formData)) {
      setIsLoading(true);

      const userData = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password')
      };
  
      const modalData = await registerUser(userData);
      
      setIsLoading(false);
      setModalTitle(modalData.title);
      setModalMessage(modalData.message);
      setIsSuccessfull(modalData.isSuccessfull);
    }
  };

  const onModalCloseHandler = () => {
    setIsModalOpen(false);
    setModalTitle('');
    setModalMessage('');

    if (isSuccessfull) {
      setIsSuccessfull(false);
      navigate("/login");
    }
  };

  return (
    <div className="register-page-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={`signup-page ${themeContext.isDarkTheme && 'dark-mode'}`}>
          <span className="title">Sign Up</span>
          <form onSubmit={onSubmitHandler}>
            <AuthFormInput 
              type="email"
              name="email"
              placeholder="Email"
              inputError={emailError}
            />
            <AuthFormInput 
              type="text"
              name="name"
              placeholder="Name"
              inputError={nameError}
            />
            <AuthFormInput 
              type="password"
              name="password"
              placeholder="Password"
              inputError={passwordError}
            />
            <AuthFormInput 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              inputError={isPassNotEqual}
            />
            <div className="error-message">
              {!isSuccessfull && (emailError || nameError || passwordError || isPassNotEqual) && (
                <span>{emailError} {nameError} {passwordError} {isPassNotEqual}</span>
              )}
            </div>
            <button type="submit">Sign Up Now</button>
          </form>
          <div className="agreement-wrapper">
            By pressing Sign Up Now you agree to the <span>Terms of Use</span> & <span>Privacy Policy</span>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={onModalCloseHandler}>
        <div className="modal-content">
          <h2>{modalTitle}</h2>
          <p>{modalMessage}</p>
          <button onClick={onModalCloseHandler}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;