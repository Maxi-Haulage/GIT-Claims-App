import React, { useState } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({});
    const [policeFields, setPoliceFields] = useState({});

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API}/add-claim/`, 
        formFields)
        .then(response => {
            if (formFields["police_involved"]) {
                axios.post(`${import.meta.env.VITE_API}/edit-police/${response.data}/`, 
                policeFields)
                .then(response => {})
                .catch(error => {
                    setErrors(error.response.data);
                });
            }
            navigate(`/view-claim/${response.data}`);
        })
        .catch(error => {
            console.log(error);
            setErrors(error.response.data);
        });
    }

    return (
        <div className='page'>
            <ClaimForm onSubmit={handleSubmit} errors={errors} 
            formFields={formFields} setFormFields={setFormFields}
            policeFields={policeFields} setPoliceFields={setPoliceFields} />
        </div>
    )
}