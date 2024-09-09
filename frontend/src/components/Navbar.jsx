import React from 'react';
import './Navbar.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import axios from 'axios';
import SearchBar from './SearchBar';

export default function Navbar() {
    let location = useLocation();
    let { id } = useParams();
    const navigate = useNavigate();

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
                    <Popup 
                        trigger={<button className='navbarButton'>Delete Claim</button>}
                        position='bottom center'>
                        <button className='deleteButton' onClick={() => deleteClaim(id)}>Confirm Delete</button>
                    </Popup>
                    <Popup 
                        trigger={<button className='navbarButton'>Close Claim</button>}
                        position='bottom center'
                        className='closePopup'>
                        <>
                            hi
                            <button onClick={() => closeClaim(id)}>Confirm Close</button>
                        </>
                    </Popup>
                </div>}

                
            </nav>

            <div className='search'>
                <SearchBar />
            </div>
        </header>
    )
}