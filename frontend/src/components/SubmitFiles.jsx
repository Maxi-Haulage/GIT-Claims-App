import React from 'react';
import './SubmitFiles.css';

export default function SubmitFiles({ onSubmit, setFiles }) {

    return (
        <div className='submitFiles'>
            
            <form id='fileSubmission'  onSubmit={e => onSubmit(e)} className='form' encType='multipart/form-data'>
                <input type='file' className='fileSubmit' onChange={(e) => setFiles(e.target.files)}/>

                <button type="submit" className='submitButton'><strong>Submit</strong></button>
            </form>
        </div>
    )
}
