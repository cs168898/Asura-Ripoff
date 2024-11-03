import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './pages/home';
import Specific_Comic from './pages/specific-Comic';
import Legal from './pages/legal';
import Account from './pages/account';
import Login from './pages/login';
import SignUp from './pages/signup';
import Specific_Chapter from './pages/specific-chapter';
import Comics from './pages/comics';
import Bookmarks from './pages/bookmarks';
import ComicUploadForm from './pages/upload-comic';
import Admin from './pages/admin';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/specific-comic/:comicId" element={<Specific_Comic />} /> {/* Define `comicId` here */}
        <Route path="/legal" element={<Legal />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/specific-comic/:comicId/specific-chapter/:chapterId" element={<Specific_Chapter />} />
        <Route path="/comics" element={<Comics />}/>
        <Route path="/bookmarks" element={<Bookmarks />}/>
        <Route path="/upload-comic" element={<ComicUploadForm />}/>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </Router>
  )
}

export default App
