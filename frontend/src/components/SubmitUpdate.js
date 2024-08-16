import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SubmitUpdate.css';

/** 
 * Input box and connected form for new updates on a claim. 
 * 
 * @param {function} onSubmit - Submit handler that allows newPost to be updated in parent component.
 */
export default function SubmitUpdate({ onSubmit }) {
    const [note, setNote] = useState([]);
    let { id } = useParams();  

    function localHandler(e) {
        onSubmit(e);
        setNote("");
    }
    
    return (
        <div className='submitUpdate'>
            <form onSubmit={e => localHandler(e)} className='form'>
                <input
                type='text'
                name='note'
                value={note}
                placeholder='Enter new update...'
                onChange={(e) => setNote(e.target.value)}
                />

                <button type="submit" className='submitButton'>Submit</button>
            </form>
        </div>
    )
}
