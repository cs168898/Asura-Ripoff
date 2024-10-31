import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import Specific_Comic from './pages/specific-Comic';
import Legal from './pages/legal';
import Account from './pages/account';
import Login from './pages/login';
import SignUp from './pages/signup';
import Specific_Chapter from './pages/specific-chapter';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="specific-comic" element={<Specific_Comic />}/>
        <Route path="legal" element={<Legal />}/>
        <Route path="account" element={<Account />}/>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<SignUp />}/>
        <Route path="specific-chapter" element={<Specific_Chapter />}/>
      </Routes>
    </Router>
  )
}

export default App
