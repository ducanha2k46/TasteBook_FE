import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterModal({ isModalOpen, closeModal }) {
    // State cho mỗi trường input
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        gender: '',
        nickname: ''
    });

    // Xử lý khi có sự thay đổi trong input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, formData);
            toast.success('Đăng ký thành công!');
            console.log(response.data);
            closeModal(); 
        } catch (error) {
            toast.error('Đăng ký thất bại: ' + (error.response && error.response.data.message ? error.response.data.message : 'Lỗi không xác định'));
            console.error('Đăng ký thất bại', error.response.data);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3 className="modal-title">Đăng ký</h3>
                <span className="close-btn" onClick={closeModal}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Họ</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Tên</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Biệt danh</label>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Tên hiển thị trong công thức của bạn"
                            value={formData.nickname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Tối thiểu 6 ký tự"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Ngày sinh</label>
                        <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}
