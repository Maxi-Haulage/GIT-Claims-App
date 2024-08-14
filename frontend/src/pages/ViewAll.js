import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAll.css';

export default function ViewAll() {
    const [active, setActive] = useState([]);
    const [closed, setClosed] = useState([]);

    const stats = {"Active": active, "Closed": closed};
    const indivLink = '/view/'

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/view-active`)
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
        <div className='tables'>
            {Object.keys(stats).map((stat) => (
            <div key={stat}>
                <h2>{stat}</h2>

                <table className="claims-table" key={stat}>

                    <thead>
                    <tr>
                        <th className='reference'></th>
                        <th>Company</th>
                        <th>Incident Date</th>
                        <th>Claim Date</th>
                        <th>Incident Type</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>AJG Ref.</th>
                        <th>Last Update</th>
                        <th className='desc'>Description</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {stats[stat].map((item) => (
                    <tr key={item.id}>
                        <td className='reference'><a href={indivLink + item.id}>{item.id}</a></td>
                        <td>{item.company}</td>
                        <td>{item.incident_date}</td>
                        <td>{item.claim_date}</td>
                        <td>{item.incident_type}</td>
                        <td>{item.weight}</td>
                        <td>£{item.cost}</td>
                        <td>{item.ajg_ref}</td>
                        <td>{item.last_updated}</td>
                        <td className='desc'>{item.description}</td>
                    </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
            ))}
        </div>
    );
}
