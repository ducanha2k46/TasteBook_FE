import React, { useState, useEffect } from 'react';
import RecipeCard from "../components/RecipesCard";
import PreviousSearches from "../components/PreviousSearches";
import axios from 'axios';
import { toast } from 'react-toastify';
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
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);

            // Tạo URL preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const [displayNames, setDisplayNames] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axios.post(`${apiUrl}/api/recipes/analyze-image`, formData);
            console.log(response.data);
            setDisplayNames(response.data.displayNames);
            toast.success('Phân tích thành công')
        } catch (error) {
            console.error('Lỗi khi phân tích ảnh:', error);
            toast.error('Ảnh cần có định dạng png hoặc jpg.')
        }
    };
    return (
        <div>
            <PreviousSearches searches={searchHistory} onSearch={handleSearch} onDelete={handleDeleteSearchItem} />
            <div className='analyze-image-container'>
                <h2 className='analyze-title'>Tìm thành phần món ăn qua hình ảnh</h2>
                <form onSubmit={handleSubmit} className='analyze-form'>
                    <input type="file" onChange={handleImageChange} className='file-input' />
                    <button type="submit" className='btn'>Phân Tích Ảnh Món Ăn</button>
                </form>
                {imagePreview && (
                    <div className='image-preview-container'>
                        <img src={imagePreview} alt="Preview" className='image-preview' />
                    </div>
                )}
                <ul className='display-names-list'>
                    {displayNames.map((name, index) => (
                        <li key={index} className='display-name'>{name}</li>
                    ))}
                </ul>
            </div>

            <div className="recipes-container">
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} onAuthorClick={handleAuthorClick} />
                ))}
            </div>
        </div>
    );
}
