import { useNavigate } from "react-router-dom";

export default function ImproveSkills() {
    const list = [
        "champions",
        "champions",
        "champions",
        "champions",
        "champions",
        "champions"
    ];

    const navigate = useNavigate();

    return (
        <div className="section improve-skills">
            <div className="col img">
                <img alt="" src="/img/gallery/img_1.jpg" />
            </div>
            <div className="col typography">
                <h1 className="title">Tham gia cùng chúng tôi</h1>
                {list.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                ))}
                <button className="btn" onClick={() => navigate("/login")}>signup now</button>
            </div>
        </div>
    )
}
