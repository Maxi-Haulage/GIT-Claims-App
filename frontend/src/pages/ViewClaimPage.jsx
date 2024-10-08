import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ClaimData from '../components/ClaimData';
import Updates from '../components/Updates';
import SubmitUpdate from '../components/SubmitUpdate';
import './ViewClaimPage.css';
import SubmitFiles from '../components/SubmitFiles';
import ViewFiles from '../components/ViewFiles';

export default function ViewClaimPage() {
    const [newPost, setNewPost] = useState(Math.random());
    const [newFile, setNewFile] = useState(Math.random());
    let { id } = useParams(); 

    const [files, setFiles] = useState("");
    const [fileErrors, setFileErrors] = useState("");

    function handleUpdateSubmit(e) {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API}/submit-update/`, 
        {note: e.target[0].value,
        claim: id})
        .then(response => {
            setNewPost(Math.random());
        })
        .catch(error => {
            console.log(error);
        });
    }

    function handleFileSubmit(e) {
        e.preventDefault();

        const form = new FormData();
        for (let i=0; i<files.length; i++) {
            if (files[i].size > 250000000) {
                setFileErrors("File is too big >250MB");
                return;
            }
            form.append("file", files[i]);
        }
        
        var frm = document.getElementById("fileSubmission");
        frm.reset();

        axios.post(`${import.meta.env.VITE_API}/submit-files/${id}/`,
        form)
        .then(response => {
            console.log(response);
            setFileErrors();
            setNewFile(Math.random());
        })
        .catch(error => {
            console.log(error);
            setFileErrors(error);
        });
    }

    return (
        <div className='page' id='claimPage'>
            <ClaimData />
            <br />

            <div className='bottom'>
                <div className='bottomLeft'>
                    <h2>Updates</h2>
                    <SubmitUpdate onSubmit={handleUpdateSubmit}/>
                    <Updates newPost={newPost} setNewPost={setNewPost} />
                </div>

                <div className='bottomRight'>
                    <h2>Files</h2>
                    <SubmitFiles onSubmit={handleFileSubmit} setFiles={setFiles} fileErrors={fileErrors} />
                    <ViewFiles newFile={newFile} setNewFile={setNewFile}/>
                </div>
            </div>
        </div>
    )
}
