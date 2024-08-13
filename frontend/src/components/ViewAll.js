import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAll.css';

export default function ViewAll() {
    const [active, setActive] = useState([]);
    const [closed, setClosed] = useState([]);

    const stats = [active, closed];

    useEffect(() => {
        axios.get('http://localhost:8000/claims/view-active')
        .then(response => {            
            setActive(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/claims/view-closed')
        .then(response => {            
            setClosed(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            {stats.map((stat) => (
            <table className="claims-table" key={stat}>

                <thead>
                <tr>
                    <th></th>
                    <th>Company</th>
                    <th>Date of Incident</th>
                    <th>Incident Type</th>
                    <th>Cost</th>
                    <th>AJG Ref.</th>
                    <th>Last Update</th>
                    <th>Status</th>
                </tr>
                </thead>
                
                <tbody>
                {stat.map((item) => (
                <tr key={item.id}>
                    <th>{item.id}</th>
                    <th>{item.company}</th>
                    <th>{item.incident_date}</th>
                    <th>{item.incident_type}</th>
                    <th>{item.cost}</th>
                    <th>{item.ajg_ref}</th>
                    <th>{item.last_updated}</th>
                    <th>{item.status}</th>
                </tr>
                ))}
                </tbody>
                
            </table>
            ))}
        </div>
    );
}
