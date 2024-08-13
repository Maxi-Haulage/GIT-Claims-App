import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewAll() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/claims/view-all')
        .then(response => {
            setMessage(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <h1>Hi</h1>
            <p>{message}</p>
        </div>
    )
}
