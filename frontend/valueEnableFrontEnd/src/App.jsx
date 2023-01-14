import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
 
import { Home } from './Home/Home'
import  SignIn  from './Login/Login'
import SignUp from './Register/Register'
import Navbar from './Home/Navbar'

function App() {
 

  return <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
  </Routes></div>
}

export default App
