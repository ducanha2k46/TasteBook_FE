import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'; // Ensure axios is installed

export default function PreviousSearches({ onSearch, searches }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            axios.get(`https://tastebook-be-a3d04816b8fe.herokuapp.com/api/recipes/suggest/${searchTerm}`)
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
                    <div key={index}
                        className="search-item"
                        onClick={() => handleSuggestionClick(search)}>
                        {search}
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
