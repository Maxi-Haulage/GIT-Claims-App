import React from 'react';
import './Navbar.css';
import { useLocation, useParams } from 'react-router-dom';

export default function Navbar() {
    let location = useLocation();
    let { id } = useParams();
    let editLink = `/edit-claim/${id}`
    let deleteLink = `/delete-claim/${id}`

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
                {viewPageCheck() && <a href={editLink} className='edit'>Edit Claim</a>}
                {viewPageCheck() && <a href={deleteLink}>Delete Claim</a>}
            </nav>
        </header>
    )
}