import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SearchResults() {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/search-results`)
        .then(response => {           
            console.log(response.data);
        })  
        .catch(error => {
            console.log(error);
        });
    }, [searchParams]);

    return (
        <div>
            {searchParams}
        </div>
    )
}
