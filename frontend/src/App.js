import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import ViewAll from './pages/ViewAll.js';
import ClaimPage from './pages/ClaimPage.js';
import AddClaimPage from './pages/AddClaimPage.js';
import './App.css';

export default function App() {
  return (
    <div className='App'>
    
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<ViewAll />} />
          <Route path="/view-claim/:id" element={<ClaimPage />} />
          <Route path="/add-claim" element={<AddClaimPage />} />
        </Routes>
    </BrowserRouter>
    <br /><br />
    </div>
  )
}

