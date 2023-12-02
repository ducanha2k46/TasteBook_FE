import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
const apiUrl = process.env.REACT_APP_API_URL;

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [firstName, setFristName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const convertToYYYYMMDD = (isoString) => {
    return isoString ? new Date(isoString).toISOString().split('T')[0] : '';
  };
  const [birthDate, setBirthDate] = useState(convertToYYYYMMDD(profile.birthDate));
  const [email, setEmail] = useState(profile.email);
  const [biography, setBiography] = useState(profile.biography);
  const [gender, setGender] = useState(profile.gender)

  const resetStateProfileModal = useCallback(() => {
    setNickname(profile.nickname);
    setFristName(profile.firstName);
    setLastName(profile.lastName);
    setBirthDate(convertToYYYYMMDD(profile.birthDate));
    setEmail(profile.email);
    setBiography(profile.biography);
    setGender(profile.gender)
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
        nickname, birthDate, biography, gender, firstName, lastName
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
        <h2>Chỉnh sửa thông tin cá nhân</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} readOnly />
          </div>
          <div>
            <label>Biệt danh:</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div>
            <label>Tên:</label>
            <input type="text" value={firstName} onChange={e => setFristName(e.target.value)} />
          </div>
          <div>
            <label>Họ:</label>
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div>
            <label>Ngày sinh:</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>

          <div>
            <label>Giới tính:</label>
            <select className='gender' value={gender} onChange={e => setGender(e.target.value)}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
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
