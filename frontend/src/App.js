import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import ViewAll from './pages/ViewAll.js';
import ClaimPage from './pages/ClaimPage.js';
import './App.css';

export default function App() {
  return (
    <div className='App'>
    <Navbar />

    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ViewAll />} />
          <Route path="/view-claim/:id" element={<ClaimPage />} />
        </Routes>
    </BrowserRouter>
    <br /><br />
    </div>
  )
}

