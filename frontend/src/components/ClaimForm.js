import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClaimForm.css';

export default function ClaimForm({ errors, onSubmit, formFields, setFormFields }) {

    const [incidentTypes, setIncidentTypes] = useState({})
    const [depots, setDepots] = useState({});
    const [statuses, setStatuses] = useState({});

    const aliases = {"maxi_ref": "Maxi Reference",
                    "company": "Company",
                    "company_ref": "Company Reference",
                    "ajg_ref": "AJG Reference",
                    "incident_date": "Incident Date",
                    "claim_date": "Claim Date",
                    "depot": "Depot",
                    "status": "Status",
                    "weight": "Weight",
                    "cost": "Cost",
                    "description": "Description",
                    "location": "Location",
                    "driver": "Driver",
                    "police": "Police"};

    const references = ["company", "company_ref", "ajg_ref", "maxi_ref"];
    const dates = ["incident_date", "claim_date"];
    const figures = ["weight", "cost"];
    const extras = ["location", "driver"];

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


    return (
        <div className='addClaim'>
            <form onSubmit={e => onSubmit(e, formFields)} className='form'>
                
                <div className='top'>
                <div className='topLeft'>
                    {references.map((field) =>
                        <div key={field}>
                            <strong>{aliases[field]}</strong><label> {errors[field]}</label>
                            <input
                            type='text'
                            name={field}
                            value={formFields[field]}
                            onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                        </div>
                    )}

                    <strong>Status</strong><label> {errors["status"]}</label><br />
                    <select name='status' onChange={(e) => setFormFields({...formFields, "status": e.target.value})}>
                        <option hidden>Select one...</option>
                        {Object.keys(statuses).map((opt) =>
                            <option value={opt} key={opt}>{statuses[opt]}</option>
                        )}
                    </select>
                </div>

                <div className='topRight'>

                    {dates.map((field) =>
                        <div key={field}>
                            <label>{errors[field]} </label><strong>{aliases[field]}</strong><br />
                            <input
                            type='date'
                            name={field}
                            value={formFields[field]}
                            onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                        </div>
                    )}

                    <label>{errors["incident_type"]} </label><strong>Incident Type</strong><br />
                    <select name='incidentType' onChange={(e) => setFormFields({...formFields, "incident_type": e.target.value})}>
                        <option hidden>Select one...</option>
                        {Object.keys(incidentTypes).map((opt) =>
                            <option value={opt} key={opt}>{incidentTypes[opt]}</option>
                        )}
                    </select>
                    
                    {figures.map((field) =>
                        <div key={field}>
                            <label>{errors[field]} </label><strong>{aliases[field]}
                            {field==="weight"
                            ? " (kg)"
                            : " (£)"
                            }</strong><br />
                            <input
                            type='number'
                            name={field}
                            value={formFields[field]}
                            onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                        </div>
                    )}
                    
                </div>
                </div>


                <div className='middle'>
                <strong>Description</strong><label> {errors["description"]}</label>
                <textarea
                name="description"
                value={formFields["description"]}
                onChange={(e) => setFormFields({...formFields, "description": e.target.value})}/>
                </div>


                <div className='bottom'>
                <div className='bottomLeft'>                    
                    {extras.map((field) =>
                        <div key={field}>
                            <strong>{aliases[field]}</strong><label> {errors[field]}</label>
                            <input
                            type='text'
                            name={field}
                            value={formFields[field]}
                            onChange={(e) => setFormFields({...formFields, [field]: e.target.value})}/>
                        </div>
                    )}
                    </div>

                <div className='bottomRight'>
                    <label>{errors["depot"]} </label><strong>{aliases["depot"]}</strong><br />
                    <select name='depot' onChange={(e) => setFormFields({...formFields, "depot": e.target.value})}>
                    <option hidden>Select one...</option>
                        {Object.keys(depots).map((opt) =>
                            <option value={opt} key={opt}>{depots[opt]}</option>
                        )}
                    </select>
                    <br />

                    <label>{errors["police"]} </label><strong>{aliases["police"]}</strong><br />
                    <input
                    type='checkbox'
                    name='police'
                    value={formFields["police"]}
                    onChange={(e) => setFormFields({...formFields, "police": !formFields["police"]})}/>             
                
                </div>
                </div>

                <button type="submit" className='submitButton'><b>Submit</b></button>

                
            </form>
        </div>
    )
}
