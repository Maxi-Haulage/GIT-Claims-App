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



    return (
        <header>
            <a href='/'><img src='/logo.png' alt="Logo"></img></a>
            <nav>
                <a href='/add-claim'>Add Claim</a>
                {viewPageCheck() && <a href={editLink} className='edit'>Edit Claim</a>}
                {viewPageCheck() && 
                    <Popup 
                        trigger={<button className='navbarButton'>Delete Claim</button>}
                        position='right center'>
                        <button className='deleteButton' onClick={() => deleteClaim(id)}>Confirm Delete</button>
                    </Popup>}
            </nav>

            <div className='search'>
                <SearchBar />
            </div>
        </header>
    )
}