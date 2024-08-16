import React, { useState } from 'react';
import axios from 'axios';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({"Maxi Reference": "",
                                                "Company Reference": "",
                                                "AJG Reference": "",
                                                "Incident Date": new Date(0),
                                                "Claim Date": new Date(0)
                                                });

    const references = Object.keys(formFields).slice(0, 3);

    const dates = Object.keys(formFields).slice(3, 5);



    function handleSubmit(e) {
        e.preventDefault();

        console.log(formFields["Incident Date"].toString());
        if (+formFields["Incident Date"] == +(new Date(0))) {
            setFormFields({...formFields, ["Incident Date"]: null});
        }
        if (+formFields["Claim Date"].toString() == +(new Date(0))) {
            setFormFields({...formFields, ["Claim Date"]: null});
        }

        axios.post(`http://localhost:8000/claims/add-claim/`, 
        {})
        .then(response => {
            
            navigate.push(`/view-claim/${response}`)
        })
        .catch(error => {
            console.log(error);
            console.log(formFields);
        });
    }

    return (
        <div className='addClaim'>
            <form onSubmit={e => handleSubmit(e)} className='form'>
                {references.map((field) =>
                    <div key={field}>
                        <h3>{field}</h3>

                        <input
                        type='text'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                {dates.map((field) =>
                    <div key={field}>
                        <h3>{field}</h3>

                        <input
                        type='date'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                <button type="submit" className='submitButton'><strong>Submit</strong></button>
            </form>
        </div>
    )
}
