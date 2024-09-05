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
            <div className='left'>

                <span><strong>Company:</strong>         {blankCheck(claim.company)}</span><br />
                <span><strong>Incident Date:</strong>   {blankCheck(claim.incident_date)}</span><br />
                <span><strong>Claim Date:</strong>      {blankCheck(claim.claim_date)}</span><br />
                <span><strong>Cost:</strong>            £{blankCheck(claim.cost)}</span><br />
                <span><strong>Weight:</strong>          {blankCheck(claim.weight)}kg</span><br />
                <span><strong>Incident Type:</strong>   {blankCheck(claim.incident_type)}</span><br />
                <br />
                <span><strong>Status:</strong>          {blankCheck(claim.status)}</span><br />

            </div>
        
            <div className='right'>
                <span><strong>AJG Reference:</strong>             {blankCheck(claim.ajg_ref)}</span><br />
                <span><strong>Maxi Reference:</strong>            {blankCheck(claim.maxi_ref)}</span><br />
                <span><strong>{claim.company} Reference:</strong> {blankCheck(claim.company_ref)}</span><br />
                <span><strong>Secondary Company:</strong>         {blankCheck(claim.secondary)}</span><br/>
                <br />
                <br />
                <span><strong>Location:</strong>                  {blankCheck(claim.location)}</span><br />
                <span><strong>Depot:</strong>                     {blankCheck(claim.depot)}</span><br />
            </div>

            <div>
                <br />
                <p>{claim.description}</p>
            </div>

            
            {claim.police_involved &&
            <div className='bottom'>
                <h3>Police Involvement</h3>

            <div className='left'>
                <span><strong>Reference:</strong>       {blankCheck(police.reference_no)}</span><br />
                <span><strong>Force:</strong>           {blankCheck(police.force)}</span><br />
                <span><strong>Officer:</strong>         {blankCheck(police.officer)}</span><br />
            </div>
            
            <div className='right'>        
                <span><strong>Note:</strong>            {blankCheck(police.note)}</span><br />
            </div>
            <br />
            </div>}
            
        
        </div>
    )
}
