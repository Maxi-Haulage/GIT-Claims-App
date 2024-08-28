import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClaimTable.css';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function ViewAll({ active, dormant, closed }) {
    const [activeOpen, setActiveOpen] = useState(true);
    const [dormantOpen, setDormantOpen] = useState(true)
    const [closedOpen, setClosedOpen] = useState(true);

    const stats = {"Active": [active, activeOpen, setActiveOpen], 
                    "Dormant": [dormant, dormantOpen, setDormantOpen], 
                    "Closed": [closed, closedOpen, setClosedOpen]};

    const navigate = useNavigate();
    const openClaim = (id) => {
        navigate(`/view-claim/${id}`);
    }

    function openHandler(stat) {
        stats[stat][2](!stats[stat][1]);
    }

    return (
        <div className='tables'>
            {Object.keys(stats).map((stat) => (
            <div key={stat}>
                <h2>{stat}</h2> 
                <button type='button' className='iconButton' onClick={() => openHandler(stat)}>
                    {stats[stat][1] ? (
                        <FaChevronUp size={15}/>
                    ) : (
                        <FaChevronDown size={15}/>
                    )}
                </button>
                
                {stats[stat][1] && 
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
                    {stats[stat][0].map((item) => (
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
                }
            </div>
            ))}
        </div>
    );
}
