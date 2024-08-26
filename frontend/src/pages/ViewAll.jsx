import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewAll.css';

export default function ViewAll() {
    const [active, setActive] = useState([]);
    const [dormant, setDormant] = useState([])
    const [closed, setClosed] = useState([]);

    const stats = {"Active": active, "Dormant": dormant, "Closed": closed};

    const navigate = useNavigate();
    const openClaim = (id) => {
        navigate(`/view-claim/${id}`);
    }

    useEffect(() => {
        console.log(import.meta.env.VITE_API);

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
        <div className='tables'>
            {Object.keys(stats).map((stat) => (
            <div key={stat}>
                <h2>{stat}</h2>

                <table className="claims-table" key={stat}>

                    <thead>
                    <tr>
                        <th className='reference'></th>
                        <th>Company</th>
                        <th>Incident</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Weight</th>
                        <th>AJG Ref.</th>
                        <th>Last Update</th>
                        <th className='desc'>Description</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {stats[stat].map((item) => (
                    <tr key={item.id} onClick={() => openClaim(item.id)}>
                        <td className='reference'>{item.id}</td>
                        <td>{item.company}      </td>
                        <td>{item.incident_date}</td>
                        <td>{item.incident_type}</td>
                        <td>£{item.cost}        </td>
                        <td>{item.weight}       </td>
                        <td>{item.ajg_ref}      </td>
                        <td>{item.last_updated} </td>
                        <td className='desc'>{item.description} </td>
                    </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
            ))}
        </div>
    );
}
