import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams(); // Lấy _id từ URL

    useEffect(() => {
        fetch(`${apiUrl}/api/recipes/${id}`)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>; // Hiển thị khi dữ liệu đang được load
    }

    return (
        <div className='recipe-detail'>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} />
            <p>{recipe.description}</p>
            <p><strong>Author:</strong> {recipe.author}</p>
            <p><strong>Difficulty:</strong> {recipe.difficult}</p>
            <p><strong>Preparation Time:</strong> {recipe.times.Preparation}</p>
            <p><strong>Cooking Time:</strong> {recipe.times.Cooking}</p>

            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h2>Steps</h2>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>

    );
};

export default RecipeDetail;
