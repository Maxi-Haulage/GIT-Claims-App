import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAll.css';
import ClaimTable from '../components/ClaimTable';

export default function ViewAll() {
    const [active, setActive] = useState([]);
    const [dormant, setDormant] = useState([])
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/view-active`)
        .then(response => {           
            setActive(response.data);
        })  
        .catch(error => {
            console.log(error);
        });

        axios.get(`${import.meta.env.VITE_API}/view-dormant`)
        .then(response => {            
            setDormant(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });

        axios.get(`${import.meta.env.VITE_API}/view-closed`)
        .then(response => {            
            setClosed(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });

    }, []);


    return (
        <div className='page'>
            <ClaimTable active={active} dormant={dormant} closed={closed} />
        </div>
    );
}
