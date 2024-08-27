import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import ViewAll from './pages/ViewAll';
import ViewClaimPage from './pages/ViewClaimPage';
import AddClaimPage from './pages/AddClaimPage';
import EditClaimPage from './pages/EditClaimPage';
import SearchResults from './pages/SearchResults';
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
            <Route path='/results' element={<SearchResults />} />
          </Route>
        </Routes>
    </BrowserRouter>
    <br /><br />
    </div>
  )
}

