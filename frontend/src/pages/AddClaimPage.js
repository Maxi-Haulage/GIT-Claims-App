import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddClaimPage.css';
import { useNavigate } from 'react-router-dom';

export default function AddClaimPage() {
    const navigate = useNavigate();

    const [incidentTypes, setIncidentTypes] = useState({})
    const [depots, setDepots] = useState({});
    const [statuses, setStatuses] = useState({});

    const aliases = {"maxi_ref": "Maxi Reference",
                    "company": "Company",
                    "company_ref": "Company Reference",
                    "ajg_ref": "AJG Reference",
                    "incident_date": "Incident Date",
                    "depot": "Depot",
                    "status": "Status",
                    "weight": "Weight",
                    "cost": "Cost",
                    "description": "Description",
                    "location": "Location",
                    "driver": "Driver",
                    "police": "Police"};

    const [formFields, setFormFields] = useState({"maxi_ref": "",
                                                "company": "",
                                                "company_ref": "",
                                                "ajg_ref": "",
                                                "incident_date": "",
                                                "claim_date": "",
                                                "incident_type": "",
                                                "depot": "",
                                                "status": "ACTIV",
                                                "weight": 0,
                                                "cost": 0,
                                                "description": "",
                                                "location": "",
                                                "driver": "",
                                                "police": false});

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
        /*if (+formFields["incident_type"] === +(new Date(0))) {
            setFormFields({...formFields, ["incident_date"]: null});
        }*/
        if (formFields["claim_date"] == "") {
            console.log(formFields["claim_date"].toString());
            setFormFields({...formFields, ["claim_date"]: "1800-01-01"});
        }

        axios.post(`http://localhost:8000/claims/add-claim/`, 
        formFields)
        .then(response => {
            console.log(response.data);
            navigate(`/view-claim/${response.data}`)
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
                        <h3>{aliases[field]}</h3>
                        <input
                        type='text'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                {dates.map((field) =>
                    <div key={field}>
                        <h3>{aliases[field]}</h3>
                        <input
                        type='date'
                        name={field}
                        value={formFields[field]}
                        onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                    </div>
                )}

                <h3>Incident Type</h3>
                <select name='incidentType' onChange={(e) => setFormFields({...formFields, ["incident_type"]: e.target.value})}>
                    <option hidden>Select one...</option>
                    {Object.keys(incidentTypes).map((opt) =>
                        <option value={opt} key={opt}>{incidentTypes[opt]}</option>
                    )}
                </select>

                {figures.map((field) =>
                    <div key={field}>
                        <h3>{aliases[field]} 
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
                name="description"
                value={formFields["description"]}
                onChange={(e) => setFormFields({...formFields, ["description"]: e.target.value})}/>

                <h3>Depot</h3>
                <select name='depot' onChange={(e) => setFormFields({...formFields, ["depot"]: e.target.value})}>
                <option hidden>Select one...</option>
                    {Object.keys(depots).map((opt) =>
                        <option value={opt} key={opt}>{depots[opt]}</option>
                    )}
                </select>

                <h3>Status</h3>
                <select name='status' onChange={(e) => setFormFields({...formFields, ["status"]: e.target.value})}>
                    <option hidden>Select one...</option>
                    {Object.keys(statuses).map((opt) =>
                        <option value={opt} key={opt}>{statuses[opt]}</option>
                    )}
                </select>
                
                {extras.map((field) =>
                    <div key={field}>
                        <h3>{aliases[field]}</h3>
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
                name='police'
                value={formFields["police"]}
                onChange={(e) => setFormFields({...formFields, ["police"]: !formFields["police"]})}/>             

                <button type="submit" className='submitButton'><strong>Submit</strong></button>
            </form>
        </div>
    )
}
