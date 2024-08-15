import React from 'react';
import ClaimData from '../components/ClaimData';
import Updates from '../components/Updates';
import './ClaimPage.css';

export default function ClaimPage() {
    
    return (
        <div className='content'>
            <ClaimData />
            <br />
            <div className='bottom-left'>
                <Updates />
            </div>
        </div>
    )
}
