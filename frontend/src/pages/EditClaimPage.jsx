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
    const [policeFields, setPoliceFields] = useState({});

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/edit-claim/${id}/`)
        .then(response => {
            setFormFields(response.data);

            if (response.data["police_involved"]) {
                axios.get(`${import.meta.env.VITE_API}/edit-police/${id}/`)
                .then(response => {
                    setPoliceFields(response.data);
                }) 
                .catch(error => {
                    console.log(error);
                });
            }
            
        }) 
        .catch(error => {
            console.log(error);
        });

        
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API}/edit-claim/${id}/`, 
        formFields)
        .then(response => {
            if (formFields["police_involved"]) {
                axios.post(`${import.meta.env.VITE_API}/edit-police/${id}/`, 
                policeFields)
                .then(response => {})
                .catch(error => {
                    setErrors(error.response.data);
                });
            }
            navigate(`/view-claim/${id}`)
        })
        .catch(error => {
            setErrors(error.response.data);
        });
    }

    return (
        <ClaimForm onSubmit={handleSubmit} errors={errors} 
        formFields={formFields} setFormFields={setFormFields}
        policeFields={policeFields} setPoliceFields={setPoliceFields} />
    )
}