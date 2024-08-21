import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({"company": "",
                                                "company_ref": "",
                                                "ajg_ref": "",
                                                "maxi_ref": "",
                                                "incident_date": "",
                                                "claim_date": "",
                                                "incident_type": "",
                                                "depot": "",
                                                "status": "ACTIV",
                                                "weight": "",
                                                "cost": "",
                                                "description": "",
                                                "location": "",
                                                "driver": "",
                                                "police": false});

    function handleSubmit(e, fields) {
        e.preventDefault();

        axios.post(`http://localhost:8000/claims/add-claim/`, 
        fields)
        .then(response => {
            navigate(`/view-claim/${response.data}`)
        })
        .catch(error => {
            setErrors(error.response.data);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors} formFields={formFields} setFormFields={setFormFields}/>
    )
}