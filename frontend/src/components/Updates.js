import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Updates.css';


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
            <h2>Updates</h2>
            {updates.map((update) => (
                <div className='updates'>
                    <div className='note'>
                        <span>{update.note}  </span>
                    </div>
                    
                    <div className='time'>
                        {update.time} {update.date}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
