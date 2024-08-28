import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    function makeSearch(e) {
        e.preventDefault();
        navigate(`/results?search=${searchInput}`);
    }

    return (
        <div>
            <form onSubmit={(e) => makeSearch(e)}>
                <div className='searchBarDiv'>
                    <input
                        type='text'
                        className='searchBar'
                        label="Search"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>

                <div className='buttonDiv'>
                    <button><FaSearch size={30} id='searchIcon' /></button>
                </div>
            </form>
        </div>
    )
}