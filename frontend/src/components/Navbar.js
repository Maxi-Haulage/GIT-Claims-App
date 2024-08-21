import React from 'react';
import './Navbar.css';
import { useLocation, useParams } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    let { id } = useParams();
    let destination = `/edit-claim/${id}`

    function viewPageCheck() {
        if ((location.pathname).includes("view-claim/")) {
            console.log(id);
            console.log(location.pathname);
            return true;
        }
        return false;
    };

    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
                {viewPageCheck() && <a href={destination} className='edit'>Edit Claim</a>}
            </nav>
        </header>
    )
}