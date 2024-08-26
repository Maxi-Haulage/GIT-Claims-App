import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    const [search, setSearch] = useState("");

    function makeSearch() {
        
    }

    return (
        <div>
            <form onSubmit={(e) => makeSearch(e)}>
                <input
                    type='text'
                    className='searchBar'
                    label="Search"
                    onSubmit={console.log("HI")}
                />

                <button><FaSearch size={30} id='searchIcon' /></button>
            </form>
        </div>
    )
}