import React, { useState } from 'react';
import axios from 'axios';
import './CloseClaimForm.css';

export default function CloseClaimForm({ id }) {
    const [claimPaid, setClaimPaid] = useState(false);
    const [noteOpen, setNoteOpen] = useState(false);
    const [optionButtons, setOptionButtons] = useState(true);

    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    function wasClaimPaid(answer) {
        if (answer) {
            setClaimPaid(true);
        }
        setOptionButtons(false);
        setNoteOpen(true);
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(note);

        axios.post(`${import.meta.env.VITE_API}/close-claim/${id}/`, 
        {closing_info: note,
        claim_paid: claimPaid})
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            setError(error);
        });
    }

    return (
        <div >

            {optionButtons ? <>
            < >
                Was this claim paid out?
                <br />

                <div className='optionButtons'>
                    <button className='optionButton' id='yes' onClick={() => wasClaimPaid(true)}>Yes</button>
                    <button className='optionButton' id='no' onClick={() => wasClaimPaid(false)}>No</button>
                </div>
            </>
            </> :
                <div className='centred'>Close Claim</div>
            }

            {noteOpen && 
            <form onSubmit={e => onSubmit(e)} className='centred'>
                <label>{error}</label><br />
                <textarea
                id='noteInput'
                name='note'
                value={note}
                placeholder='Enter any further information...'
                onChange={(e) => setNote(e.target.value)} />
                
                <button type="submit" id='closeSubmit' className='submitButton'>Submit</button>
            </form>}

        </div>
    );
}