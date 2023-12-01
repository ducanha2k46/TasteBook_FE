import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const convertToYYYYMMDD = (isoString) => {
    return isoString ? new Date(isoString).toISOString().split('T')[0] : '';
  };
  const [birthDate, setBirthDate] = useState(convertToYYYYMMDD(profile.birthDate));
  const [email, setEmail] = useState(profile.email);
  const [biography, setBiography] = useState(profile.biography);


  const resetStateProfileModal = useCallback(() => {
    setNickname(profile.nickname);
    setBirthDate(convertToYYYYMMDD(profile.birthDate));
    setEmail(profile.email);
    setBiography(profile.biography);
  }, [profile]);

  useEffect(() => {
    if (isOpen) {
      resetStateProfileModal();
    }
  }, [isOpen, resetStateProfileModal]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const updateData = {
        nickname, birthDate, biography
      };
      const token = localStorage.getItem('userToken');

      const response = await fetch(`${apiUrl}/api/auth/update-profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      toast.success(data)
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Lỗi không xác định');
    }
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Chỉnh sửa profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Biệt danh:</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div>
            <label>Ngày sinh:</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} readOnly />
          </div>
          <div>
            <label>Tiểu sử:</label>
            <textarea value={biography} onChange={e => setBiography(e.target.value)} />
          </div>
          <div className="modal-actions">
            <button className='btn' type="submit" disabled={!nickname || !email || !birthDate}>Lưu thay đổi</button>
            <button className='btn' type="button" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditProfileModal;
