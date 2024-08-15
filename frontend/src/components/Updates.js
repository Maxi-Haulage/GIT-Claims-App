import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleClaim.css';


export default function Updates() {
    const [updates, setUpdates] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/claim-updates/${id}`)
        .then(response => {
            setUpdates(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    
    return (
        <div>
            {updates.map((update) => (
                <div>
                <p>{update.note}</p>
                <p>{update.date}</p>
                </div>
            ))}
        </div>
    )
}
