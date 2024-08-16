import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();



    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:8000/claims/add-claim/`, 
        {})
        .then(response => {
            navigate(`/view-claim/${response}`)
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='addClaim'>
        </div>
    )
}
