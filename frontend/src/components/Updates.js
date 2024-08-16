import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Updates.css';

/** 
 * Component that displays all updates for a specific claim in order with most recent at the top. 
 * 
 * @param {number} newPost - Prop that forces rerender when the current user makes a new post.
 */
export default function Updates({ newPost }) {
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
    }, [id, newPost]);

    return (
        <div>
            {updates.map((update) => (
                <div key={update.id} className='updates'>
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
