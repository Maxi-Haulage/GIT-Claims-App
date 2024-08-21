import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ViewAll from './pages/ViewAll.js';
import ViewClaimPage from './pages/ViewClaimPage.js';
import AddClaimPage from './pages/AddClaimPage.js';
import EditClaimPage from './pages/EditClaimPage';
import './App.css';

export default function App() {
  return (
    <div className='App'>
    
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ViewAll />} />
            <Route path="/view-claim/:id" element={<ViewClaimPage />} />
            <Route path="/add-claim" element={<AddClaimPage />} />
            <Route path="/edit-claim/:id" element={<EditClaimPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
    <br /><br />
    </div>
  )
}

