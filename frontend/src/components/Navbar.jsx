import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import SearchBar from './SearchBar';
import LargePopup from './LargePopup';
import CloseClaimForm from './CloseClaimForm';

export default function Navbar() {
    let location = useLocation();
    let { id } = useParams();
    const navigate = useNavigate();

    const [deletePopup, setDeletePopup] = useState(false);
    const [closePopup, setClosePopup] = useState(false);
    
    let editLink = `/edit-claim/${id}`

    function viewPageCheck() {
        if ((location.pathname).includes("view-claim/")) {
            return true;
        }
        return false;
    };

    function deleteClaim(id) {
        axios.get(`${import.meta.env.VITE_API}/delete-claim/${id}`)
        .then(response => {
            navigate(`/`);
        }) 
        .catch(error => {
            console.log(error);
        });
    }

    function closeClaim(id) {
    }



    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
                {viewPageCheck() && 
                <div id='claimOptions'>
                    <a href={editLink} className='edit'>Edit Claim</a>
                    
                    <button className='navbarButton' onClick={() => setClosePopup(true)}>Close Claim</button>
                    <LargePopup trigger={closePopup} setTrigger={setClosePopup}>
                        <CloseClaimForm id={id} />
                    </LargePopup>

                    <button className='navbarButton' onClick={() => setDeletePopup(true)}>Delete Claim</button>
                    <LargePopup trigger={deletePopup} setTrigger={setDeletePopup}>
                        <div className='centred'>
                            <p>Are you sure you want to delete this claim?</p>
                            <button className='deleteButton' onClick={() => deleteClaim(id)}>Confirm Delete</button>
                        </div>
                    </LargePopup>

                </div>}
                
            </nav>

            <div className='search'>
                <SearchBar />
            </div>
        </header>
    )
}