import React, { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import SignUp from "../Signup/Signup";
import { LoginContext } from '../components/context';
import '../both.css';

export const Examiner = () => {
    const his=useNavigate();
    const {logindata,setLoginData}=useContext(LoginContext)
    const [show, setShow] = useState(false);
    const handleLogin=()=>{
      const  role="examiner";
        setLoginData({role});
        his('/main');
    }
  return (
   <> 
    <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Login in</h1>
            <p>Hi, we are glad to have you back</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='email'>Examiner ID</label>
              <input id="name" type="text" placeholder='Enter Your ID'></input>
            </div>
            <div className='form_input'>
              <label htmlFor='email'>Email ID</label>
              <input id="name" type="email" placeholder='Enter Your EmailID'></input>
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
            
          </form>
        </div>
      </section>
   </>
  )
}
