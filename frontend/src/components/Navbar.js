import React from 'react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();

    function viewPageCheck() {
        if ((location.pathname).includes("view-claim/")) {
            return true;
        }
        return false;
    };

    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
                {viewPageCheck() && <a href='/edit-claim' className='edit'>Edit Claim</a>}
            </nav>
        </header>
    )
}