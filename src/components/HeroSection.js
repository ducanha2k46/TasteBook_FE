import CustomImage from "./CustomImage"
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
    const images = [
        "img/gallery/img_1.jpg",
        "img/gallery/img_2.jpg",
        "img/gallery/img_3.jpg",
        "img/gallery/img_4.jpg",
        "img/gallery/img_5.jpg",
        "img/gallery/img_6.jpg",
        "img/gallery/img_7.jpg",
        "img/gallery/img_8.jpg",
        "img/gallery/img_9.jpg"
    ]
    const navigate = useNavigate();
    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">TasteBook</h1>
                <p className="info">TasteBook không chỉ là một cuốn sách hướng dẫn nấu ăn khác—nó còn là la bàn ẩm thực của bạn. TasteBook được thiết kế để trở thành người bạn đồng hành đáng tin cậy của bạn trong nhà bếp, cung cấp các công thức nấu ăn, kỹ thuật và hiểu biết sâu sắc phục vụ cho các đầu bếp ở mọi cấp độ.</p>
                <button className="btn" onClick={() => navigate("/login")}>explore now</button>
            </div>
            <div className="col gallery">
                {images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                ))}

            </div>
        </div>
    )
}