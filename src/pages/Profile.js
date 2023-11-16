
import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

export default function Profile() {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    // State for password visibility
    const toggleChangePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
    };

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault();
        // Password change logic here
        console.log("Password change submitted");
        toggleChangePasswordModal();
    };

    // Toggle the type of password input field

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const navigate = useNavigate();
    const { setLoggedIn } = useAuth();
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        nickname: '',
        birthDate: '',
        gender: '',
        avatarImg: '',
        biography: '',
        role: ''
    });

    useEffect(() => {
        // Replace with actual token retrieval method
        const token = localStorage.getItem('userToken');

        axios.get('http://localhost:5000/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile data', error);
            });
    }, []);
    const formattedBirthDate = new Date(profile.birthDate).toLocaleDateString();

    return (
        <div>
            <div className="profile-container ">
                <div className="profile-basic-info ">
                    <div className="profile-details ">
                        <h2 className='title'>Hồ sơ</h2>
                        <p className='info'><strong>Biệt danh:</strong> {profile.nickname}</p>
                        <p className='info'><strong>Ngày sinh:</strong> {formattedBirthDate}</p>
                        <p className='info'><strong>Email:</strong> {profile.email}</p>
                        <p className='info'><strong>Tiểu sử:</strong> {profile.biography}</p>
                    </div>
                    <div className="profile-avatar ">
                        <img src={profile.avatarImg || "https://www.gravatar.com/avatar/?d=identicon"} alt="Avatar" className="avatar-image" />
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="btn">Chỉnh sửa</button>
                </div>
            </div>
            <div className='profile-container'>
                <div className="profile-cooking-info">
                    <div>
                        <h2 className='title'>Thông tin nấu ăn</h2>
                    </div>
                    <div className="posted-recipes">
                        <h4>Công thức đã đăng</h4>
                        {/* List of recipes user has posted */}
                    </div>
                    <div className="saved-recipes">
                        <h4>Công thức đã lưu</h4>
                        {/* List of recipes the user has saved */}
                    </div>
                </div>
            </div>
            <div className='profile-container'>
                <div className="account-management ">
                    <h2 className='title'>Quản lý tài khoản</h2>
                    <button className="btn" onClick={toggleChangePasswordModal}>Đổi mật khẩu</button>
                    <button className="btn danger">Xóa tài khoản</button>
                </div>
            </div>
            <button className="btn logout" onClick={() => {navigate("/profile"); setLoggedIn(false);}}>Đăng xuất</button>
            {/* The Change Password Modal */}
            {isChangePasswordModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleChangePasswordModal}>&times;</span>
                        <h2>Đổi mật khẩu</h2>
                        <form onSubmit={handleChangePasswordSubmit}>
                            {/* Password fields with toggleable visibility */}
                            <div className="password-input">
                                <input type={showCurrentPassword ? 'text' : 'password'} placeholder="Mật khẩu hiện tại" required />
                                <i onClick={toggleCurrentPasswordVisibility}>{showCurrentPassword ? <FaEyeSlash /> : <FaEye />}</i>
                            </div>


                            <div className="password-input">
                                <input type={showNewPassword ? 'text' : 'password'} placeholder="Mật khẩu mới" required />
                                <i onClick={toggleNewPasswordVisibility}>{showNewPassword ? <FaEyeSlash /> : <FaEye />}</i>
                            </div>


                            <div className="password-input">
                                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Nhập lại mật khẩu mới" required />
                                <i onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</i>
                            </div>

                            <button type="submit" className="btn">Xác nhận</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

