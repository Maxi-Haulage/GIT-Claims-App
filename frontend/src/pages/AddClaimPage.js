import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    

    function handleSubmit(e, fields) {
        e.preventDefault();

        axios.post(`http://localhost:8000/claims/add-claim/`, 
        fields)
        .then(response => {
            console.log(response.data);
            navigate(`/view-claim/${response.data}`)
        })
        .catch(error => {
            setErrors(error.response.data);
            console.log(errors);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors}/>
    )
}