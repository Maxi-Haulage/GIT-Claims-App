import React from 'react';
import { RxCross2 } from "react-icons/rx";
import './LargePopup.css';

export default function LargePopup(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popupContents'>
                {props.children}
            </div>

            <div className='closeButton'>
                <button className='iconButton' onClick={() => props.setTrigger(false)}><RxCross2 size={30}/></button>            
            </div>

        </div>
    ) : "";
}