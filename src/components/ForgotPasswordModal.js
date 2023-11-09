import React from 'react';

export default function ForgotPasswordModal({ isModalOpen, closeModal }) {
    if (!isModalOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h3 className="modal-title">Quên mật khẩu?</h3>
                <span className="close-btn" onClick={closeModal}>&times;</span>
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Email hoặc số điện thoại" required />
                    </div>
                    <div className="modal-actions">
                        <button className="btn cancel-btn" onClick={closeModal} type="button">Hủy</button>
                        <button className="btn search-btn" type="submit">Tìm kiếm</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
