import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

const ChangePasswordModal = ({ isChangePasswordModalOpen, toggleChangePasswordModal, currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmPassword, setConfirmPassword, handleChangePasswordSubmit }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const resetStates = () => {
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    useEffect(() => {
        if (isChangePasswordModalOpen) {
            resetStates();
        }
    }, [isChangePasswordModalOpen]);
    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };
    if (!isChangePasswordModalOpen) return null;
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleChangePasswordModal}>&times;</span>
                <h2>Đổi mật khẩu</h2>
                <form onSubmit={handleChangePasswordSubmit}>
                    <div className="password-input">
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu hiện tại"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <i onClick={toggleCurrentPasswordVisibility}>
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>

                    <div className="password-input">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <i onClick={toggleNewPasswordVisibility}>
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>

                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <i onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>

                    <button type="submit" className="btn">Xác nhận</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
