import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ClaimData from '../components/ClaimData';
import Updates from '../components/Updates';
import SubmitUpdate from '../components/SubmitUpdate';
import './ClaimPage.css';

export default function ClaimPage() {
    const [newPost, setNewPost] = useState(Math.random());
    let { id } = useParams(); 

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`http://localhost:8000/claims/submit-update/`, 
        {note: e.target[0].value,
        claim: id})
        .then(response => {
            setNewPost(Math.random());
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='content'>
            <ClaimData />
            <br />
            <div className='bottom-left'>
                <h2>Updates</h2>
                <SubmitUpdate onSubmit={handleSubmit}/>
                <Updates newPost={newPost}/>
            </div>
        </div>
    )
}
