import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import Course_selection from "../Course_selection/Course_selection";
import SignUp from "../Signup/Signup";
import { LoginContext } from '../components/context';
import '../both.css';

const LOGIN = 1;
const COURSE = 2
const SIGNUP = 3;

const Login = () => {
  const his=useNavigate();
  const [pageStatus, setPageStatus] = useState(LOGIN);
  const [show, setShow] = useState(false);
  const {logindata,setLoginData}=useContext(LoginContext);

  const handleLogin = async () => {
    const user = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    console.log("user,pass", user, pass);
    if (user.length > 0 && pass.length > 0) {
      try {
        await checkValidUser(user, pass);
      } catch (error) {
        console.error("Invalid login", error);
      }
    }
  };

  const handleSignup = () => {
    his('/register');
  };

  const checkValidUser = async (user, pass) => {
    const data = { user, pass };
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result.data[0][0]);
    if (result) {
      console.log("client==>", result);
      setLoginData({data,result});
      his('/main');
    } else {
      throw new Error("Invalid user");
    }
  };

  if (pageStatus === LOGIN) {
    return (
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Login in</h1>
            <p>Hi, we are glad to have you back</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='email'>Username</label>
              <input id="name" type="text" placeholder='Enter Your username'></input>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!show ? "password" : "text"} id="pass" placeholder='Enter Your password' />
                <div className="showpass" onClick={() => setShow(!show)}>
                  {!show ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <button className='btn' type="button" onClick={handleLogin}>Login</button>
            <p>Don't have an Account?<button variant="success" onClick={handleSignup} style={{border:"none"}}>SIGN UP</button></p>
            <p>Examiner Login?<button variant="success" onClick={()=>his('/examinar_login')} style={{border:"none"}}>login in</button></p>
          </form>
        </div>
      </section>
    );
  } else if (pageStatus === SIGNUP) {
    return (<SignUp />);
  } else {
    return his('/main');
  }
};

export default Login;
