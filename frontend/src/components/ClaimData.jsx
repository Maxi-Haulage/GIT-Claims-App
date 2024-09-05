import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import blankCheck from '../Utils';
import './ClaimData.css';

export default function ClaimData() {
    const [claim, setClaim] = useState([]);
    const [police, setPolice] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/claim-data/${id}`)
        .then(response => {
            setClaim(response.data);
            
            if (response.data.police_involved) {
                axios.get(`${import.meta.env.VITE_API}/edit-police/${id}`)
                .then(response => {
                    setPolice(response.data);
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

    
    return (
        <div className='claimData'>
            <div className='top'>
            <div className='left'>
                <span><strong>Company: </strong>{claim.company}</span><br />
                {!blankCheck(claim.incident_date) && <span><strong>Incident Date: </strong>{claim.incident_date}<br /></span>}
                {!blankCheck(claim.claim_date) && <span><strong>Claim Date: </strong>{claim.claim_date}<br /></span>}
                <span><strong>Incident Type: </strong>{claim.incident_type}<br /></span>
                {!blankCheck(claim.cost) && <span><strong>Cost: </strong>{claim.cost}<br /></span>}
                {!blankCheck(claim.weight) && <span><strong>Weight: </strong>{claim.weight}<br /></span>}
                <span><strong>Status: </strong>{claim.status}<br /></span>
            </div>
        
            <div className='right'>
                {!blankCheck(claim.ajg_ref) && <span><strong>AJG Reference: </strong>{claim.ajg_ref}<br /></span>}
                {!blankCheck(claim.maxi_ref) && <span><strong>Maxi Reference: </strong>{claim.maxi_ref}<br /></span>}
                {!blankCheck(claim.company_ref) && <span><strong>{claim.company} Reference: </strong>{claim.company_ref}<br /></span>}
                {!blankCheck(claim.secondary) && <span><strong>Secondary Company: </strong>{claim.secondary}<br /></span>}
                <br />
                {!blankCheck(claim.location) && <span><strong>Location: </strong>{claim.location}<br /></span>}
                {!blankCheck(claim.depot) && <span><strong>Depot: </strong>{claim.depot}<br /></span>}
            </div>
            </div>

            <div>
                <p>{claim.description}</p>
            </div>

            
            {claim.police_involved &&
            <div className='bottom'>
                <h3>Police Involvement</h3>

                {!blankCheck(police.reference_no) && <span><strong>Reference: </strong>{police.reference_no}<br /></span>}
                {!blankCheck(police.force) && <span><strong>Force: </strong>{police.force}<br /></span>}
                {!blankCheck(police.officer) && <span><strong>Officer: </strong>{police.officer}<br /></span>}
                {!blankCheck(police.note) && <span><strong>Notes: </strong>{police.note}<br /></span>}
            </div>}
            
        
        </div>
    )
}
