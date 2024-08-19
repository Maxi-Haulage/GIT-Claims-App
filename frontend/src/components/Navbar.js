import React from 'react';
import './Navbar.css';

export default function Navbar() {

    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
            </nav>
        </header>
    )
}