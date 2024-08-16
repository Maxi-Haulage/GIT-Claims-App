import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SubmitUpdate.css';
import Updates from './Updates';

export default function SubmitUpdate({ onSubmit }) {
    const [note, setNote] = useState([]);
    let { id } = useParams();  

    /*function handleSubmit(e) {
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

    }*/

    function localHandler(e) {
        onSubmit(e);
        setNote("");

    }
    
    return (
        <div>
            <form onSubmit={e => localHandler(e)}>
                <input
                type='text'
                name='note'
                value={note}
                placeholder='Enter new update...'
                onChange={(e) => setNote(e.target.value)}
                />

                <button type="submit" className='submitButton'></button>
            </form>
            
            
        </div>
    )
}
