// /frontend/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import RegisterModal from '../components/RegisterModal';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { setLoggedIn } = useAuth();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
            navigate("/profile")
            toast.success('Đăng nhập thành công!');
            setLoggedIn(true);
            console.log(response.data);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : 'Đăng nhập thất bại, lỗi không xác định');
            console.error(error.response ? error.response.data : error);
        }
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);

    const openForgotPasswordModal = () => {
        setForgotPasswordModalOpen(true);
    }

    const closeForgotPasswordModal = () => {
        setForgotPasswordModalOpen(false);
    }

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <input type="password" name="password" placeholder="Mật khẩu" value={loginData.password} onChange={handleChange} required />
                </div>
                <button className="btn login-btn" type="submit">Đăng nhập</button>
            </form>

            <span className="forget-text" onClick={openForgotPasswordModal}>Quên mật khẩu?</span>
            <button className="btn register-btn" onClick={openModal}>Tạo tài khoản mới</button>

            <RegisterModal isModalOpen={isModalOpen} closeModal={closeModal} />
            <ForgotPasswordModal isModalOpen={isForgotPasswordModalOpen} closeModal={closeForgotPasswordModal} />
        </div>
    );
}
