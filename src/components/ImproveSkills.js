import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"

export default function ImproveSkills() {
    const list = [
        "Học Cách Nấu Ăn Mới",
        "Cộng Đồng Đam Mê Nấu Ăn",
        "Lưu Trữ Công Thức Cá Nhân",
        "Cập Nhật Xu Hướng Mới",
        "Tìm Kiếm Công Thức Dễ Dàng",
        "Cải thiện Kỹ Năng Nấu Ăn"
    ];
    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();
    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/profile'); // Nếu đã đăng nhập, navigate tới trang profile
        } else {
            navigate('/login'); // Nếu chưa đăng nhập, navigate tới trang login
        }
    };
    return (
        <div className="section improve-skills">
            <div className="col img">
                <img alt="" src="/img/gallery/img_improve.png" />
            </div>
            <div className="col typography">
                <h1 className="title">Tham gia cùng chúng tôi</h1>
                {list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                ))}
                <button className="btn" onClick={handleButtonClick}>{isLoggedIn ? 'hồ sơ' : 'đăng nhập'}</button>
            </div>
        </div>
    )
}
