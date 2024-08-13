import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import ViewAll from './components/ViewAll.js';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view-all" element={<ViewAll />} />
        </Routes>
    </BrowserRouter>
  )
}

