import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import blankCheck from '../Utils';
import './SingleClaim.css';

export default function SingleClaim() {
    const [claim, setClaim] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/claim-data/${id}`)
        .then(response => {
            setClaim(response.data[0]);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    
    return (
        <div className='content'>
            <div className='top-left'>

                <strong>Incident Date:</strong>     <label>{blankCheck(claim.incident_date)}</label><br />
                <strong>Claim Date:</strong>        <label>{blankCheck(claim.claim_date)}</label><br />
                <strong>Cost:</strong>              <label>{blankCheck(claim.cost)}</label><br />
                <strong>Weight:</strong>              <label>{blankCheck(claim.weight)}</label><br />
                <strong>Incident Type:</strong>     <label>{blankCheck(claim.incident_type)}</label><br />
                <br />
                <strong>Next action:</strong>     <label></label><br />

            </div>
        
            <div className='top-right'>
                <strong>AJG Reference:</strong>             <label>{blankCheck(claim.ajg_ref)}</label><br />
                <strong>Maxi Reference:</strong>            <label>{blankCheck(claim.maxi_ref)}</label><br />
                <strong>{claim.company} Reference:</strong> <label>{blankCheck(claim.company_ref)} </label><br />
                <br />
                <br />
                <strong>Location:</strong>                  <label>{blankCheck(claim.location)}</label><br />
                <strong>Depot:</strong>                     <label>{blankCheck(claim.depot)}</label><br />
            </div>

            <div>
                <br />
                <p>{claim.description}</p>
            </div>
        
        </div>
    )
}
