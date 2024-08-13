import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/claims/home')
        .then(response => {
            setMessage(response.data.message);
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

export default Home;