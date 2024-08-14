import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleClaim() {
    //const [message, setMessage] = useState('');
    let { id } = useParams();
    const message = id;

    /*useEffect(() => {
        
        setMessage(id);
    }, []);*/
    

    /*useEffect(() => {
        axios.get('http://localhost:8000/view')
        .then(response => {
            setMessage(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, []);*/

    return (
        <div>
            <h1>Hi</h1>
            <p>{message}</p>
        </div>
    )
}
