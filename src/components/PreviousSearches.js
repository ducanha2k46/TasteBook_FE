import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; 
const apiUrl = process.env.REACT_APP_API_URL;

export default function PreviousSearches({ onSearch, searches, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            axios.get(`${apiUrl}/api/recipes/suggest/${searchTerm}`)
                .then(response => setSuggestions(response.data))
                .catch(error => console.error(error));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchTerm);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="previous-searches section">
            <h2>Lịch sử tìm kiếm</h2>
            <div className="previous-searches-container">
                {searches.map((search, index) => (
                    <div key={index} className="search-item">
                        <div onClick={() => handleSuggestionClick(search)}>
                            {search}
                        </div>
                        <div className="delete-icon" onClick={() => onDelete(search)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                ))}

            </div>

            <div className="search-box">
                <input type="text"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={handleSearchInputChange} />
                <button className="btn" onClick={handleSearchSubmit}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                {suggestions.length > 0 && (
                    <div className="suggestions-container">
                        {suggestions.map((suggestion, index) => (
                            <div key={index}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
