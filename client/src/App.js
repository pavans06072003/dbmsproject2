import React from 'react';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login/Login";
import Signup from './Signup/Signup';
import Course from './Course_selection/Course_selection';
import Result from './Result/Result';
import Que from './Que/Que';
import { AddExam } from './components/AddExam';
import { Profile } from './components/profile';
import { Main } from './components/main';
import { Examiner } from './Login/Examinarlogin';
import { Addquestion } from './components/addquestion';
import { Showexam } from './components/showexam';

function App() {
  return (
  <>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<Signup/>}></Route>
    <Route path='/course' element={<Course/>}></Route>
    <Route path='/result' element={<Result/>}></Route>
    <Route path='/test' element={<Que/>}></Route>
    <Route path='/addexam' element={<AddExam/>}></Route>
    <Route path='/addque' element={<Addquestion/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/main' element={<Main/>}></Route>
    <Route path='/show' element={<Showexam/>}></Route>
    <Route path='/examinar_login' element={<Examiner/>}></Route>
  </Routes>

  </>
  );
}

export default App;
