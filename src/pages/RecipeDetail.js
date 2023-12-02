import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${apiUrl}/api/recipes/${id}`)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }
    const handlePrint = () => {
        window.print();
      };
      

    return (
        <div>
            <div className='recipe-detail'>

                <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                    <div className="recipe-buttons">
                        <button type="button" className="btn">Save Recipe</button>
                        <button type="button" className="btn" onClick={handlePrint}>Print</button>
                    </div>
                </div>
                <div className="recipe-content">
                    <h1 className="recipe-title">{recipe.name}</h1>
                    <p className="recipe-description">{recipe.description}</p>
                    <p className="recipe-author"><strong>Author:</strong> {recipe.author}</p>
                    <p className="recipe-difficulty"><strong>Difficulty:</strong> {recipe.difficult}</p>
                    <p className="recipe-preparation-time"><strong>Preparation Time:</strong> {recipe.times.Preparation}</p>
                    <p className="recipe-cooking-time"><strong>Cooking Time:</strong> {recipe.times.Cooking}</p>
                </div>
            </div>



            <div className='recipe-ingredients'>
                <h2>Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className='recipe-method'>
                <h2>Method</h2>
                <ol>
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>

    );
};

export default RecipeDetail;
