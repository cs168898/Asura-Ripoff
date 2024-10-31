import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import Specific_Comic from './pages/specific-Comic';
import Legal from './pages/legal';
<<<<<<< HEAD
import Account from './pages/account';
=======
import Login from './pages/login';
>>>>>>> a2cf83bea15eed4f488cfe86a21956df081424d4

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="specific-comic" element={<Specific_Comic />}/>
        <Route path="legal" element={<Legal />}/>
<<<<<<< HEAD
        <Route path="account" element={<Account />}/>
=======
        <Route path="login" element={<Login />}/>
>>>>>>> a2cf83bea15eed4f488cfe86a21956df081424d4
      </Routes>
    </Router>
  )
}

export default App
