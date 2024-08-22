import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SubmitFiles() {
    let { id } = useParams();
    const [files, setFiles] = useState();
    
    function onSubmit(e) {
        e.preventDefault();
        
        const form = new FormData();
        for (let i=0; i<files.length; i++) {
            form.append("file", files[i]);
        }    
        
        var frm = document.getElementById("fileSubmission");
        frm.reset();

        axios.post(`http://localhost:8000/claims/submit-files/${id}/`,
        form)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className='submitFiles'>
            
            <form id='fileSubmission'  onSubmit={e => onSubmit(e)} className='form' encType='multipart/form-data'>
                <input type='file' onChange={(e) => setFiles(e.target.files)}/>

                <button type="submit" className='submitButton'><strong>Submit</strong></button>
            </form>
        </div>
    )
}
