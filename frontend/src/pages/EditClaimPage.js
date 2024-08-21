import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClaimForm from '../components/ClaimForm';
import './AddClaimPage.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditClaimPage() {
    const navigate = useNavigate();
    let { id } = useParams();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/edit-claim/${id}/`)
        .then(response => {
            setFormFields(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    function handleSubmit(e, fields) {
        e.preventDefault();

        axios.post(`http://localhost:8000/claims/edit-claim/${id}/`, 
        fields)
        .then(response => {
            navigate(`/view-claim/${id}`)
        })
        .catch(error => {
            setErrors(error.response.data);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors} formFields={formFields} setFormFields={setFormFields}/>
    )
}