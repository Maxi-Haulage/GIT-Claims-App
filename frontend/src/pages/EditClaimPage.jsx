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
        axios.get(`${import.meta.env.VITE_API}/edit-claim/${id}/`)
        .then(response => {
            setFormFields(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    function handleSubmit(e, fields) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API}/edit-claim/${id}/`, 
        fields)
        .then(response => {
            navigate(`/view-claim/${id}`)
        })
        .catch(error => {
            console.log(fields);
            setErrors(error.response.data);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors} formFields={formFields} setFormFields={setFormFields}/>
    )
}