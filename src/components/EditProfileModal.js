import React, { useState, useEffect, useCallback } from 'react';

const EditProfileModal = ({ isOpen, onClose, profile, updateProfile }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { ...profile, nickname, birthDate, email, biography };
    updateProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="modal">
      <section className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nickname:</label>
            <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
          </div>
          <div>
            <label>Birth Date:</label>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Biography:</label>
            <textarea value={biography} onChange={e => setBiography(e.target.value)} />
          </div>
          <button className='btn' type="submit">Save Changes</button>
          <button className='btn' onClick={onClose}>Cancel</button>
        </form>
      </section>
    </div>
  );
};

export default EditProfileModal;
