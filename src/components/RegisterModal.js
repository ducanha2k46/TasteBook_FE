import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterModal({ isModalOpen, closeModal }) {
    // State cho mỗi trường input
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthDate: '',
        gender: '',
    });

    // Xử lý khi có sự thay đổi trong input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn trang web reload
        try {
            // Gửi dữ liệu đến endpoint đăng ký của backend
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            toast.success('Đăng ký thành công!');
            console.log(response.data);
            closeModal(); // Đóng modal sau khi đăng ký thành công
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
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Họ"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Tên"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
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
                        <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="date"
                            name="birthDate"
                            placeholder="Ngày sinh"
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
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}
