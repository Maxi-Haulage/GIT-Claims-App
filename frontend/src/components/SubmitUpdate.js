import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SubmitUpdate.css';
import Updates from './Updates';

export default function SubmitUpdate() {
    const [note, setNote] = useState([]);
    let { id } = useParams();  

    /*useEffect(() => {
        axios.post(`http://localhost:8000/claims/submit-update`)
        .then(response => {
            setUpdate(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);*/

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:8000/claims/submit-update/`, 
        {note: note,
        claim: id})
        .then(response => {
            setNote("");
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });

    }

    
    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                type='text'
                value={note}
                placeholder='Enter new update...'
                onChange={(e) => setNote(e.target.value)}
                />

                <button type="submit" className='submitButton'></button>
            </form>
            
            
        </div>
    )
}
