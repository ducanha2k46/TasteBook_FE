import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        fetch(`${apiUrl}/api/recipes/${id}`)
            .then(response => response.json())
            .then(data => setRecipe(data))
            .catch(error => console.error('Error:', error));
    }, [id]);
    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const authToken = localStorage.getItem('userToken');

                const response = await fetch(`${apiUrl}/api/recipes/is-saved/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsSaved(data.isSaved);
                } else {
                    console.error('Không thể kiểm tra trạng thái lưu.');
                }
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
            }
        };

        checkIfSaved();
    }, [id]); // Thêm recipeId vào danh sách phụ thuộc của useEffect

    if (!recipe) {
        return <div>Loading...</div>;
    }
    const handlePrint = () => {
        window.print();
    };


    const saveRecipe = async (recipeId) => {
        try {
            const authToken = localStorage.getItem('userToken');

            const response = await fetch(`${apiUrl}/api/recipes/save-recipe/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                setIsSaved(true);
                console.log('Công thức đã được lưu.');
                toast.success('Công thức đã được lưu.')
            } else {
                console.error('Không thể lưu công thức.');
                toast.error('Hãy đăng nhập để lưu công thức.')
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            toast.error(error.response ? error.response.data.message : 'Lỗi không xác định');
        }
    };
    const removeRecipe = async (recipeId) => {
        try {
            const authToken = localStorage.getItem('userToken');

            const response = await fetch(`${apiUrl}/api/recipes/remove-recipe/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                setIsSaved(false);
                console.log('Công thức đã được xóa khỏi danh sách lưu.');
                toast.success('Công thức đã được xóa khỏi danh sách lưu.')
            } else {
                console.error('Không thể xóa công thức.');
                toast.error('Không thể xóa công thức.')
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            toast.error(error.response ? error.response.data.message : 'Lỗi không xác định');
        }
    };
    const handleSaveOrRemoveRecipe = async () => {
        if (isSaved) {
            await removeRecipe(id);
        } else {
            await saveRecipe(id);
        }
    };

    return (
        <div>
            <div className='recipe-detail'>

                <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                    <div className="recipe-buttons">
                        <button type="button" className="btn" onClick={handleSaveOrRemoveRecipe}>
                            <FontAwesomeIcon icon={faBookmark} />
                            {isSaved ? "Đã Lưu" : "Lưu"}
                        </button>
                        <button type="button" className="btn print" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faPrint} />
                            In
                        </button>
                    </div>
                </div>
                <div className="recipe-content">
                    <h1 className="recipe-title">{recipe.name}</h1>
                    <p className="recipe-description">{recipe.description}</p>
                    <p className="recipe-author"><strong>Tác giả:</strong> {recipe.author}</p>
                    <p className="recipe-difficulty"><strong>Độ khó:</strong> {recipe.difficult}</p>
                    <p className="recipe-preparation-time"><strong>Thời gian chuẩn bị:</strong> {recipe.times.Preparation}</p>
                    <p className="recipe-cooking-time"><strong>Thời gian nấu:</strong> {recipe.times.Cooking}</p>
                </div>
            </div>



            <div className='recipe-ingredients'>
                <h2>Nguyên liệu</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className='recipe-method'>
                <h2>Phương pháp</h2>
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
