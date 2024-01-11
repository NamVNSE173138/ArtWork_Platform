import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // You can create a separate CSS file for styling

const Login: React.FC = () => {
  return (
    <div className="login">
      <h1 className="login-heading">Login</h1>
      {/* <button className="login-social">
        <img
          className="fa fa-google login-social-icon"
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
        />
        <span className="login-social-text">Login with Google</span>
      </button> */}
      {/* <div className="login-or">
        <span>Or</span>
      </div> */}
      <form action="#" className="login-form" autoComplete="off">
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-input"
          placeholder="Eg: namdeptrai@gmail.com"
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="**********"
        />

        <button className="login-submit">Login</button>
      </form>
      <p className="login-already">
        <span>Don't have an account?</span>
        <Link className="login-login-link" to={"/signup"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
