import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAll.css';

export default function ViewAll() {
    const [active, setActive] = useState([]);
    const [dormant, setDormant] = useState([])
    const [closed, setClosed] = useState([]);
    

    const stats = {"Active": active, "Dormant": dormant, "Closed": closed};
    const indivLink = '/view-claim/'

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/view-active`)
        .then(response => {            
            setActive(response.data);
        })  
        .catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8000/claims/view-dormant')
        .then(response => {            
            setDormant(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });

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
                        <th>Incident</th>
                        <th>Claim</th>
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
                    <tr key={item.id}>
                        <td className='reference'><a className="links" href={indivLink + item.id}>{item.id}</a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.company}       </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.incident_date} </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.claim_date}    </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.incident_type} </a></td>
                        <td><a className="links" href={indivLink + item.id}> £{item.cost}         </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.weight}        </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.ajg_ref}       </a></td>
                        <td><a className="links" href={indivLink + item.id}> {item.last_updated}  </a></td>
                        <td className='desc'><a className="links" href={indivLink + item.id}> {item.description}  </a></td>
                    </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
            ))}
        </div>
    );
}
