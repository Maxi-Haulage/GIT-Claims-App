import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import ClaimForm from './ClaimForm';

export default function AdvancedSearch() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [errors, setErrors] = useState({});
    const [formFields, setFormFields] = useState({"company": "",
                                                "company_ref": "",
                                                "ajg_ref": "",
                                                "maxi_ref": "",
                                                "incident_date": "",
                                                "claim_date": "",
                                                "incident_type": "",
                                                "depot": "",
                                                "status": "",
                                                "weight": "",
                                                "cost": "",
                                                "description": "",
                                                "location": "",
                                                "driver": "",
                                                "police": ""});

    function makeSearch(e) {
        setSearchParams(formFields);
        console.log(e.target);
        e.preventDefault(); 
    }

    return (
        <div>
            <ClaimForm onSubmit={makeSearch} errors={errors} formFields={formFields} setFormFields={setFormFields} />
        </div>
    )
}