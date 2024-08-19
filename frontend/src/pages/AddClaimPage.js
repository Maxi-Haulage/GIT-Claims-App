import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [incidentTypes, setIncidentTypes] = useState({})
    const [depots, setDepots] = useState({});
    const [statuses, setStatuses] = useState({});

    const [formFields, setFormFields] = useState({"Maxi Reference": "",
                                                "Company": "",
                                                "Company Reference": "",
                                                "AJG Reference": "",
                                                "Incident Date": new Date(0),
                                                "Claim Date": new Date(0),
                                                "Incident Type": "",
                                                "Depot": "",
                                                "Status": "",
                                                "Weight": 0,
                                                "Cost": 0,
                                                "Description": "",
                                                "Location": "",
                                                "Driver": "",
                                                "Police": false
                                                });

    const references = Object.keys(formFields).slice(0, 4);
    const dates = Object.keys(formFields).slice(4, 6);
    const figures = Object.keys(formFields).slice(9,11);
    const extras = Object.keys(formFields).slice(12,14)

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/add-claim/`)
        .then(response => {
            setIncidentTypes(response.data["incident_type"]);
            setDepots(response.data["depot"]);
            setStatuses(response.data["status"]);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        //console.log(formFields["Incident Date"].toString());

        // possibly unnecessary if validation is occuring on backend
        /*if (+formFields["Incident Date"] == +(new Date(0))) {
            setFormFields({...formFields, ["Incident Date"]: null});
        }
        if (+formFields["Claim Date"].toString() == +(new Date(0))) {
            setFormFields({...formFields, ["Claim Date"]: null});
        }*/

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

                <h3>Incident Type</h3>
                <select name='incidentType' onChange={(e) => setFormFields({...formFields, ["Incident Type"]: e.target.value})}>
                    <option hidden>Select one...</option>
                    {Object.keys(incidentTypes).map((opt) =>
                        <option value={opt} key={opt}>{incidentTypes[opt]}</option>
                    )}
                </select>

                {figures.map((field) =>
                    <div key={field}>
                        <h3>{field} 
                        {field==="Weight"
                        ? " (kg)"
                        : " (£)"
                        }</h3>
                        <input
                        type='number'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                <h3>Description</h3>
                <input
                type='text'
                name="Description"
                value={formFields["Description"]}
                onChange={(e) => setFormFields({...formFields, ["Description"]: e.target.value})}/>

                <h3>Depot</h3>
                <select name='depot' onChange={(e) => setFormFields({...formFields, ["Depot"]: e.target.value})}>
                <option hidden>Select one...</option>
                    {Object.keys(depots).map((opt) =>
                        <option value={opt} key={opt}>{depots[opt]}</option>
                    )}
                </select>

                <h3>Status</h3>
                <select name='status' onChange={(e) => setFormFields({...formFields, ["Status"]: e.target.value})}>
                    <option hidden>Select one...</option>
                    {Object.keys(statuses).map((opt) =>
                        <option value={opt} key={opt}>{statuses[opt]}</option>
                    )}
                </select>
                
                {extras.map((field) =>
                    <div key={field}>
                        <h3>{field}</h3>
                        <input
                        type='text'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                <h3>Police</h3>
                <input
                type='checkbox'
                name='Police'
                value={formFields["Police"]}
                onChange={(e) => setFormFields({...formFields, ["Police"]: !formFields["Police"]})}/>             

                <button type="submit" className='submitButton'><strong>Submit</strong></button>
            </form>
        </div>
    )
}
