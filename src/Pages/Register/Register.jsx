import React, { useState } from "react";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Firebase";
import {signupProvider} from '../../Firebase'



const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (!name || !email || !password){
      setError("Invalid Entry")
      return; 
    } 

    // sign user in
    const message = await registerUser(email, password, name);
    if (message) {
      setError(message);
      navigate("/register");
      return;
    }
    setError(null);
    navigate("/login");
  };


 const providerHandler = async ()=>{

  signupProvider()
  navigate('/')

 }











  return (
    <>
      <div className={`${classes.register} page`}>
        <div className={classes.registerForm}>
          <h1>Register</h1>
          {error && <p className="text-danger text-center m-3">{error}</p>}
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-light">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-light">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Your Email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-light">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary form-control mt-3"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </div>
          </form>
          <button type="button" className="btn btn-primary form-control mt-3" onClick={providerHandler}>
            Continue with Google

          </button>
          <p className="text-center text-light mt-3">
            Has an account ?
            <span
              className="text-warning"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
            Here
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
