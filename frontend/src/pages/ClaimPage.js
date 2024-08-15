import React from 'react';
import ClaimData from '../components/ClaimData';
import Updates from '../components/Updates';
import './ClaimPage.css';
import SubmitUpdate from '../components/SubmitUpdate';



export default function ClaimPage() {
    //const [newPost, setNewPost] = useState(Math.random());

    /*function handleSubmit(e) {
        e.preventDefault();
        axios.post(`http://localhost:8000/claims/submit-update/`, 
        {note: note,
        claim: id})
        .then(response => {
            setNote("");
            //window.location.reload();
            setNewPost(true);
        })
        .catch(error => {
            console.log(error);
        });

    }*/

    return (
        <div className='content'>
            <ClaimData />
            <br />
            <div className='bottom-left'>
                <h2>Updates</h2>
                <SubmitUpdate />
                <Updates />
            </div>
        </div>
    )
}
