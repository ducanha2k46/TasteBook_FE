
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
    return (
        <div>
            <div className="profile-container ">
                <div className="profile-basic-info ">
                    <div className="profile-details ">
                        <h2 className='title'>Hồ sơ</h2>
                        <p className='info'><strong>Biệt danh:</strong> Đức Anh</p>
                        <p className='info'><strong>Ngày sinh:</strong> 26 tháng 12 năm 2002</p>
                        <p className='info'><strong>Email:</strong>ducanha2k46@gmail.com</p>
                        <p className='info'><strong>Tiểu sử:</strong>Không có gì</p>
                    </div>
                    <div className="profile-avatar ">
                        <img src="https://www.gravatar.com/avatar/?d=mp" alt="Avatar" className="avatar-image" />
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
