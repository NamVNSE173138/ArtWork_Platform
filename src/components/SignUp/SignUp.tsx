import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"; // You can create a separate CSS file for styling

const Signup: React.FC = () => {
  return (
    <div className="signup">
      <h1 className="signup-heading">Sign up</h1>
      {/* <button className="signup-social">
        <img
          className="fa fa-google signup-social-icon"
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
        />
        <span className="signup-social-text">Sign up with Google</span>
      </button>
      <div className="signup-or">
        <span>Or</span>
      </div> */}
      <form action="#" className="signup-form" autoComplete="off">
        <label htmlFor="fullname" className="signup-label">
          Full name
        </label>
        <input
          type="text"
          id="fullname"
          className="signup-input"
          placeholder="Eg: Nam Vo"
        />
        <label htmlFor="email" className="signup-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="signup-input"
          placeholder="Eg: namdeptrai@gmail.com"
        />
        <button className="signup-submit">Sign up</button>
      </form>
      <p className="signup-already">
        <span>Already have an account?</span>
        <Link className="signup-login-link" to={"/login"}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
