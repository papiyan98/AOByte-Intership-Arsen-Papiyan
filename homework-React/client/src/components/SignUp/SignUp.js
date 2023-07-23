import React from "react";

import './styles.scss';

const SignUp = () => {
  return (
    <div className="register-page-container">
      <div className="signup-page">
        <span className="title">Sign Up</span>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="email" name="email" placeholder="Email" />
          <input type="text" name="name" placeholder="Name" />
          <input type="password" name="password" placeholder="Password" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" />
          <div className="checkbox-container">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">I accept the <span>Terms of Use</span> & <span>Privacy Policy</span></label>
          </div>
          <button type="submit">Sign Up Now</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;