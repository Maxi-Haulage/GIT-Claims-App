import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ClaimTable from '../components/ClaimTable';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import './SearchResults.css';
import AdvancedSearch from '../components/AdvancedSearch';

export default function SearchResults() {
    const [advancedOpen, setAdvancedOpen] = useState(false);
    
    const [active, setActive] = useState([]);
    const [dormant, setDormant] = useState([])
    const [closed, setClosed] = useState([]);

    let [searchParams, setSearchParams] = useSearchParams();

    function sortData(data) {
        let temp_active = [];
        let temp_dormant = [];
        let temp_closed = [];

        data.forEach((item) => {
            if (item.status === "Active") {
                temp_active.push(item);
            } else if (item.status === "Closed") {
                temp_closed.push(item);
            } else {
                temp_dormant.push(item);
            }
        });
        setActive(temp_active);
        setDormant(temp_dormant);
        setClosed(temp_closed);      
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/search-results/?`+searchParams)
        .then(response => {           
            sortData(response.data);
        })  
        .catch(error => {
            console.log(error);
        });
    }, [searchParams]);

    return (
        <div>
            <div className='advancedSearch'> 
                <h2>Advanced Search</h2> 
                <button type='button' className='iconButton' onClick={() => setAdvancedOpen(!advancedOpen)}>
                    {advancedOpen ? (
                        <FaChevronUp size={20}/>
                    ) : (
                        <FaChevronDown size={20}/>
                    )}
                </button>
            </div>
            {advancedOpen && <AdvancedSearch />}

            <ClaimTable active={active} dormant={dormant} closed={closed} />
        </div>
    )
}
