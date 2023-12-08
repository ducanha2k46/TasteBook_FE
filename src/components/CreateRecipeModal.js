import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

function CreateRecipeModal({ isOpen, onClose }) {
    const [recipeData, setRecipeData] = useState({
        image: '',
        name: '',
        description: '',
        ingredients: [''],
        steps: [''],
        times: {
            Preparation: '',
            Cooking: ''
        },
        difficult: '',
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name.startsWith('ingredients') || e.target.name.startsWith('steps')) {
            const index = parseInt(e.target.name.split('-')[1]);
            const key = e.target.name.split('-')[0];
            const newArr = [...recipeData[key]];
            newArr[index] = e.target.value;
            setRecipeData({ ...recipeData, [key]: newArr });
        } else if (e.target.name.startsWith('times')) {
            const key = e.target.name.split('.')[1];
            setRecipeData({ ...recipeData, times: { ...recipeData.times, [key]: e.target.value } });
        } else {
            setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
        }
    };
    const handleUploadImage = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await axios.post(`${apiUrl}/api/recipes/upload-recipe-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data.imageUrl;
        } catch (error) {
            console.error('Lỗi khi tải ảnh lên:', error);
            return null;
        }
    };
    const handleAddField = (key) => {
        setRecipeData({ ...recipeData, [key]: [...recipeData[key], ''] });
    };

    const handleRemoveField = (key, index) => {
        const newArr = [...recipeData[key]];
        newArr.splice(index, 1);
        setRecipeData({ ...recipeData, [key]: newArr });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = await handleUploadImage();
        if (!imageUrl) return;

        const fullRecipeData = {
            ...recipeData,
            image: imageUrl
        };

        try {
            const token = localStorage.getItem('userToken');
            const response = await axios.post(`${apiUrl}/api/recipes/create`, fullRecipeData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            toast.success('Tạo công thức thành công')
            onClose();
        } catch (error) {
            console.error('Lỗi khi tạo công thức:', error.response);
        }
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    if (!isOpen) return null;

    return (
        <div className='create-recipe-modal'>
            <div className="modal">
                <div className='modal-content'>
                    <h3 className="modal-title">Tạo công thức</h3>
                    <form onSubmit={handleSubmit} className="recipe-form">
                        <div className="form-group">
                            <label>Ảnh công thức</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Tên công thức</label>
                            <input type="text" name="name" value={recipeData.name} onChange={handleChange} placeholder="Ngắn gọn" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Mô tả</label>
                            <textarea name="description" value={recipeData.description} onChange={handleChange} placeholder="10-15 từ" className="form-control"></textarea>
                        </div>
                        <label>Nguyên liệu</label>
                        {recipeData.ingredients.map((ingredient, index) => (
                            <div key={`ingredient-${index}`} className="form-group ingredient-group">
                                <input
                                    type="text"
                                    name={`ingredients-${index}`}
                                    value={ingredient}
                                    onChange={handleChange}
                                    placeholder={`Nguyên liệu ${index + 1}`}
                                    className="form-control"
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveField('ingredients', index)} className="btn btn-secondary btn-sm">Xóa</button>
                                )}
                            </div>
                        ))}
                        <div className="add-button-container">
                            <button type="button" onClick={() => handleAddField('ingredients')} className="btn btn-primary btn-sm">Thêm Nguyên liệu</button>
                        </div>
                        <label>Cách nấu</label>
                        {recipeData.steps.map((step, index) => (
                            <div key={`step-${index}`} className="form-group step-group">
                                <textarea
                                    name={`steps-${index}`}
                                    value={step}
                                    onChange={handleChange}
                                    placeholder={`Bước ${index + 1}`}
                                    className="form-control"
                                />
                                {index > 0 && (
                                    <button type="button" onClick={() => handleRemoveField('steps', index)} className="btn btn-secondary btn-sm">Xóa</button>
                                )}
                            </div>
                        ))}
                        <div className="add-button-container">
                            <button type="button" onClick={() => handleAddField('steps')} className="btn btn-primary btn-sm">Thêm Bước</button>
                        </div>

                        <div className="form-group">
                            <label>Thời gian chuẩn bị</label>
                            <input type="text" name="times.Preparation" value={recipeData.times.Preparation} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Thời gian nấu</label>
                            <input type="text" name="times.Cooking" value={recipeData.times.Cooking} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Độ khó</label>
                            <input type="text" name="difficult" value={recipeData.difficult} onChange={handleChange} placeholder="Độ khó" className="form-control" />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className='btn '>Đăng Công Thức</button>
                            <button onClick={onClose} className='btn '>Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default CreateRecipeModal;
