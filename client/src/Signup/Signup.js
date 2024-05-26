import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from "../Login/Login";

const LOGIN = 1;

const Signup = () => {
  const his = useNavigate();
  const [pageStatus, setPageStatus] = useState(null);
  const [show, setshow] = useState(false);
  const [cshow, csetshow] = useState(false);

  const handleLogin = () => {
    his('/');
  };

  const handleSubmit = async () => {

    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;
    const name=document.getElementById("name").value;
    const college=document.getElementById("clg").value;
    const branch=document.getElementById("branch").value;
    const gender= document.querySelector('input[name="gender"]:checked').value;
    const dob=document.getElementById("dob").value;
    const year = document.getElementById("year").value;
    console.log("data", user, email, pass1, pass2);
    if (user.length > 0 && email.length > 0 && pass1.length > 0 && pass2.length > 0) {
      if (pass1 === pass2) {
        const data = { user, pass: pass1,name,college,email,year,gender,dob,branch };
        console.log(data);
        try {
          const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          const result = await response.json();
          if (result.insert === true) {
            setPageStatus(LOGIN);
          }
        } catch (error) {
          console.error("Error during signup:", error);
        }
      }
    }
  };

  if (pageStatus === LOGIN) {
    return <Login />;
  } else {
    return (
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1> Sign Up</h1>
            <p> Hi,we are glad to have you back</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='user'>Name</label>
              <input type="text" id="name" placeholder='Enter Your name'></input>
            </div>
            <div className='form_input'>
              <label htmlFor='user'>College</label>
              <input type="text" id="clg" placeholder='Enter Your College name'></input>
            </div>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input type="email" id="email" placeholder='Enter Your Email Address'></input>
            </div>
            <div className='form_input'>
              <label htmlFor='user'>Branch</label>
              <input type="text" id="branch" placeholder='Enter Your Branch '></input>
            </div>
            <div className='form_input'>
              <label htmlFor='user'>Year</label>
              <input type="text" id="year" placeholder='Enter Your Current year '></input>
            </div>
            <div className='form_input' id='gender'>
              <h6 htmlFor='user'>Gender</h6>
              <label>
                <input type="radio" name="gender" value="male"  />
                Male
              </label>
              <label>
                <input type="radio" name="gender" value="female"   />
                Female
              </label>
            </div>
            <div className='form_input'>
              <label htmlFor='user'>DOB</label>
              <input type="date" id="dob" placeholder='Select your Date of birth'></input>
            </div>
            <div className='form_input'>
              <label htmlFor='user'>Username</label>
              <input type="text" id="user" placeholder='Enter Your user name'></input>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input type={!show ? "password" : "text"} name="password" id="pass1" placeholder='Enter Your password' />
                <div className="showpass" onClick={() => setshow(!show)}>
                  {!show ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="cpassword">Confirm Password</label>
              <div className="two">
                <input type={!cshow ? "password" : "text"} name="cpassword" id="pass2" placeholder='Enter Your password again' />
                <div className="showpass" onClick={() => csetshow(!cshow)}>
                  {!cshow ? "show" : "Hide"}
                </div>
              </div>
            </div>
            <button className='btn' onClick={handleSubmit}>Sign Up</button>
            <p>Already have an Account?<button variant="primary" onClick={handleLogin} style={{ border: "none" }}>LOG IN</button></p>
          </form>
        </div>
      </section>
    );
  }
};

export default Signup;
