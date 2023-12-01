import React from 'react';

const DeleteAccountModal = ({ isDeleteModalOpen, closeDeleteModal, password, setPassword, handleDeleteAccount }) => {
    if (!isDeleteModalOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeDeleteModal}>&times;</span>
                <h2>Xóa tài khoản</h2>
                <form onSubmit={handleDeleteAccount}>
                    <div className="password-input">
                        <input
                            type='password'
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Xác nhận</button>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
