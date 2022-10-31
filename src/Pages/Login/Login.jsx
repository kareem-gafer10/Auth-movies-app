import React,{useState} from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login,signupProvider,forgetPassword } from "../../Firebase";





const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  const submitHandler = async () =>{

    if(!email || !password){
      setError("Invalid Entry")
      return;
    }

    const message = await login(email, password);

    if (message) {
      setError(message);
      navigate("/login");
      return;
    }
    setError(null);
    navigate("/");



  }



  const providerHandler = async ()=>{

    signupProvider()
    navigate('/')
  
   }



   const forgetPasswordHandler= async(email)=>{
    const message = await forgetPassword(email)
    if(message){
      setError(message)
    }
   }



  return (
    <>
      <div className={`${classes.login} page`}>
        <div className={classes.loginForm}>
          <h1>Login</h1>
          {error && <p className="text-danger text-center m-3">{error}</p>}
          <form>
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
                onChange={(e)=> setEmail(e.target.value)}
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
                onChange={(e)=> setPassword(e.target.value)}
              />
              <div
                className="text-center text-warning mt-3"
                style={{ cursor: "pointer" }}
                onClick={()=> forgetPasswordHandler (email)}
              >
                Forgot password?
              </div>
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary form-control mt-3"
                onClick={submitHandler}
              >
                Login
              </button>
            </div>
          </form>
          <button type="button" className="btn btn-primary form-control mt-3" onClick={providerHandler}>
            Continue with Google
          </button>
          <p className="text-center text-light mt-3">
            Doesn't have an account ? 
    <span className="text-warning" style={{ cursor: "pointer" }} onClick={()=> navigate("/register")}>
              Sign Up
            </span>
             Here
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
