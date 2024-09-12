import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Updates.css';
import Popup from 'reactjs-popup';
import { FaTrashAlt } from 'react-icons/fa';

/** 
 * Component that displays all updates for a specific claim in order with most recent at the top. 
 * 
 * @param {number} newPost - Prop that forces rerender when the current user makes a new post.
 * @param {function} setNewPost - Updates newPost when a post is deleted.
 */
export default function Updates({ newPost, setNewPost }) {
    const [updates, setUpdates] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API}/claim-updates/${id}`)
        .then(response => {
            setUpdates(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id, newPost]);

    function deleteUpdate(update) {
        axios.get(`${import.meta.env.VITE_API}/delete-update/${update.id}`)
        .then(response => {
            setNewPost(Math.random());
        }) 
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div>
            {updates.map((update) => (
                <div key={update.id} className='updates'>
                    <div className='note'>
                        <span>{update.note}  </span>
                    </div>
                    
                    <div className='time'>
                        <br />
                        <Popup 
                            trigger={<button className='iconButton'><FaTrashAlt size={15}/></button>}
                            position='right center'>
                            <button className='deleteButton' onClick={() => deleteUpdate(update)}>Confirm Delete</button>
                        </Popup>
                        <span>{update.time} {update.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
