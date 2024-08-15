import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import ViewAll from './pages/ViewAll.js';
import ClaimPage from './pages/ClaimPage.js';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view-all" element={<ViewAll />} />
          <Route path="/view-claim/:id" element={<ClaimPage />} />
        </Routes>
    </BrowserRouter>
  )
}

