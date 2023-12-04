
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
import { toast } from 'react-toastify';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';
import EditProfileModal from '../components/EditProfileModal';
import RecipeCard from '../components/RecipesCard';
const apiUrl = process.env.REACT_APP_API_URL;

export default function Profile() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            const authToken = localStorage.getItem('userToken');

            try {
                const response = await fetch(`${apiUrl}/api/recipes/saved-recipes`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSavedRecipes(data);
                    console.log('Lấy dữ liệu công thức đã lưu thành công')
                } else {
                    console.error('Không thể lấy công thức đã lưu');
                }
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        fetchSavedRecipes();
    }, []);

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

    const toggleChangePasswordModal = () => {
        setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
        if (!isChangePasswordModalOpen) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

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
        const token = localStorage.getItem('userToken');

        axios.get(`${apiUrl}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile data', error);
            });
    }, []);
    const formattedBirthDate = new Date(profile.birthDate).toLocaleDateString();
    const [avatar, setAvatar] = useState('');

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await axios.post(`${apiUrl}/api/uploads`, formData);
                if (uploadResponse.data.success) {
                    const avatarUrl = uploadResponse.data.avatarUrl;

                    const token = localStorage.getItem('userToken');
                    await axios.post(`${apiUrl}/api/user/updateAvatar`, { avatarUrl }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    setAvatar(avatarUrl);
                    toast.success("Cập nhật ảnh đại diện thành công.")
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangePasswordSubmit = async (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem('userToken');

        if (newPassword !== confirmPassword) {
            toast.error("Mật khẩu xác nhận sai");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Password successfully changed');
                toast.success('Đổi mật khẩu thành công');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                toggleChangePasswordModal();
            } else {
                console.log('Failed to change password:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.response ? error.response.data : error);
            toast.error(error.response ? error.response.data.message : 'Lỗi không xác định');
        }
    };
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [password, setPassword] = useState('');

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`${apiUrl}/api/auth/delete-account`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                },
                data: { password: password }
            });

            if (response && response.data) {
                console.log(response.data.message);
                toast.success(response.data.message)
                navigate("/login");
                setLoggedIn(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error deleting account:', error.response.data.message);
                toast.error(error.message)
            } else {
                console.error('Error deleting account:', error.message);
            }
        }
    };
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const updateProfile = (updatedProfile) => {
    };

    return (
        <div>
            <div className="profile-container ">
                <div className="profile-basic-info ">
                    <div className="profile-details ">
                        <h2 className='title'>Hồ sơ</h2>
                        <p className='info'><strong>Biệt danh:</strong> {profile.nickname}</p>
                        <p className='info'><strong>Họ và tên:</strong> {profile.lastName} {profile.firstName}</p>
                        <p className='info'><strong>Giới tính:</strong> {profile.gender}</p>
                        <p className='info'><strong>Ngày sinh:</strong> {formattedBirthDate}</p>
                        <p className='info'><strong>Email:</strong> {profile.email}</p>
                        <p className='info'><strong>Tiểu sử:</strong> {profile.biography}</p>
                    </div>
                    <div className="profile-avatar ">
                        <img
                            src={avatar || profile.avatarUrl}
                            alt="Avatar"
                            onClick={() => document.getElementById('avatarInput').click()}
                            style={{ width: '150px', height: '150px' }}
                            className='avatar-image'
                        />
                        <input
                            id="avatarInput"
                            type="file"
                            onChange={handleAvatarChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>
                <div className="profile-actions">
                    <button className="btn" onClick={() => setEditModalOpen(true)}>Chỉnh sửa</button>
                </div>
            </div>
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                profile={profile}
                updateProfile={updateProfile}
            />

            <div className='profile-container'>
                <div className="profile-cooking-info">
                    <div>
                        <h2 className='title'>Thông tin nấu ăn</h2>
                    </div>
                    <div className="saved-recipes">
                        <h3>Công thức đã lưu</h3>
                        <div className='recipes-container'>
                            {savedRecipes.map((recipe, index) => (
                                // <li key={recipe._id} onClick={() => handleRecipeClick(recipe._id)}>
                                //     {recipe.name}
                                //     <CustomImage imgSrc={recipe.image} pt="50%" />
                                // </li>

                                <RecipeCard key={index} recipe={recipe} />

                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-container'>
                <div className="account-management ">
                    <h2 className='title'>Quản lý tài khoản</h2>
                    <button className="btn" onClick={toggleChangePasswordModal}>Đổi mật khẩu</button>

                    <button onClick={openDeleteModal} className="btn danger">Xóa tài khoản</button>

                </div>
            </div>
            <button className="btn logout" onClick={() => { navigate("/login"); setLoggedIn(false); }}>Đăng xuất</button>
            <ChangePasswordModal
                isChangePasswordModalOpen={isChangePasswordModalOpen}
                toggleChangePasswordModal={toggleChangePasswordModal}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleChangePasswordSubmit={handleChangePasswordSubmit}
            />
            <DeleteAccountModal
                isDeleteModalOpen={isDeleteModalOpen}
                closeDeleteModal={closeDeleteModal}
                password={password}
                setPassword={setPassword}
                handleDeleteAccount={handleDeleteAccount}
            />

        </div>
    );
}

