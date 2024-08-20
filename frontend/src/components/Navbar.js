import React from 'react';
import './Navbar.css';

export default function Navbar() {

    function viewPageCheck() {
        if (window.location.pathname.includes("view-claim")) {
            return true;
        }
        return false;
    }

    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
                {viewPageCheck &&
                <a href='/edit-claim'>Edit Claim</a>}
            </nav>
        </header>
    )
}