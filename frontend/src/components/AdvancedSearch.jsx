import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import ClaimForm from './ClaimForm';

export default function AdvancedSearch() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({});
    const [policeFields, setPoliceFields] = useState({});

    function makeSearch(e) {
        setSearchParams({...formFields, ...policeFields});
        console.log(e.target);
        e.preventDefault(); 
    }

    return (
        <div>
            <ClaimForm onSubmit={makeSearch} errors={errors} 
            formFields={formFields} setFormFields={setFormFields}
            policeFields={policeFields} setPoliceFields={setPoliceFields} />
        </div>
    )
}