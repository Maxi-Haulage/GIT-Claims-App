import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewFiles() {
    const [files, setFiles] = useState([]);
    let { id } = useParams();  

    useEffect(() => {
        axios.get(`http://localhost:8000/claims/claim-files/${id}`)
        .then(response => {
            setFiles(response.data);
        }) 
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            {files.map((file) => (
                <div key={file.id} className='files'>
                    File
                </div>
            ))}
        </div>
    )
}
