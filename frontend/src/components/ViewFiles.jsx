import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewFiles.css';
import { FaTrashAlt } from 'react-icons/fa';

export default function ViewFiles({ newFile }) {
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
    }, [id, newFile]);

    function fileLink (file) {
        return `http://localhost:8000${file.file}`
    }

    function deleteFile(file) {
        //TODO: delete file from Django database
        //console.log(file.name);
    }

    return (
        <div>
            
            {files.map((file) => (
                <div key={file.id} className='files'>
                    <div className='file'>
                        <a href={fileLink(file)}>{file.name}</a>
                    </div>

                    <div className='time'>
                        <button type='button' onClick={deleteFile(file)}><FaTrashAlt size={20}/></button>
                        <span>{file.time} {file.date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
