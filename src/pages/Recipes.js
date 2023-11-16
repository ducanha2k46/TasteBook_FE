import React, { useState, useEffect } from 'react';
import RecipeCard from "../components/RecipesCard";
import PreviousSearches from "../components/PreviousSearches";
import axios from 'axios'; // Ensure axios is installed

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchHistory, setSearchHistory] = useState(() => {
        // Try to get the existing search history from local storage
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    
    useEffect(() => {
        axios.get('https://tastebook-be-a3d04816b8fe.herokuapp.com/api/recipes/random') // Adjust the URL as needed
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleSearch = (query) => {
        axios.get(`https://tastebook-be-a3d04816b8fe.herokuapp.com/api/recipes/search/${query}`)
            .then(response => {
                setRecipes(response.data);
                updateSearchHistory(query);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateSearchHistory = (query) => {
        setSearchHistory(prevHistory => {
            const newHistory = [query, ...prevHistory].slice(0, 10); // Keep only the last 10 searches
            localStorage.setItem('searchHistory', JSON.stringify(newHistory)); // Save to local storage
            return newHistory;
        });
    };
    
    return (
        <div>
            <PreviousSearches searches={searchHistory} onSearch={handleSearch} />
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}
