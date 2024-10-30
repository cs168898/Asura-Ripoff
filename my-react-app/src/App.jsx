import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import Specific_Comic from './pages/specific-Comic';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="specific-comic" element={<Specific_Comic />}/>
      </Routes>
    </Router>
  )
}

export default App
