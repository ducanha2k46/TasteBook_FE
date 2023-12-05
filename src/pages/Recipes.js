import React, { useState, useEffect } from 'react';
import RecipeCard from "../components/RecipesCard";
import PreviousSearches from "../components/PreviousSearches";
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchHistory, setSearchHistory] = useState(() => {
        const savedHistory = localStorage.getItem('searchHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const author = queryParams.get('author');
    useEffect(() => {
        console.log("Author from URL:", author);
        const fetchRecipes = async () => {
            try {
                const response = author ?
                    await axios.get(`${apiUrl}/api/recipes/author/${author}`) :
                    await axios.get(`${apiUrl}/api/recipes/random`);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchRecipes();
    }, [author]);
    useEffect(() => {
        axios.get(`${apiUrl}/api/recipes/random`)
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleSearch = (query) => {
        axios.get(`${apiUrl}/api/recipes/search/${query}`)
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
            const filteredHistory = prevHistory.filter(item => item !== query);

            const newHistory = [query, ...filteredHistory].slice(0, 10);

            localStorage.setItem('searchHistory', JSON.stringify(newHistory));

            return newHistory;
        });
    };
    const handleDeleteSearchItem = (itemToDelete) => {
        setSearchHistory(currentHistory => {
            const updatedHistory = currentHistory.filter(item => item !== itemToDelete);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            return updatedHistory;
        });
    };
    const [selectedAuthor, setSelectedAuthor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = selectedAuthor ?
                    await axios.get(`${apiUrl}/api/recipes/author/${selectedAuthor}`) :
                    await axios.get(`${apiUrl}/api/recipes/random`);
                setRecipes(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [selectedAuthor]);

    const handleAuthorClick = (author) => {
        setSelectedAuthor(author);
    };
    return (
        <div>
            <PreviousSearches searches={searchHistory} onSearch={handleSearch} onDelete={handleDeleteSearchItem} />
            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} onAuthorClick={handleAuthorClick} />
                ))}
            </div>
        </div>
    );
}
