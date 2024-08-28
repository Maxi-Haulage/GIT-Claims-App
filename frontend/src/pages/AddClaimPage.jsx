import React, { useState } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API}/add-claim/`, 
        formFields)
        .then(response => {
            navigate(`/view-claim/${response.data}`);
        })
        .catch(error => {
            setErrors(error.response.data);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors} formFields={formFields} setFormFields={setFormFields}/>
    )
}