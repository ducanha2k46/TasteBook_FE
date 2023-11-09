import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { useState, useEffect } from "react"

export default function Settings() {
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('settings');
        return savedSettings ? JSON.parse(savedSettings) : {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--primary-color": "rgb(255, 0, 86)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757",
            "--font-size": "16px",
            "--animation-speed": "1"
        };
    });

    // Update the CSS variables when settings change
    useEffect(() => {
        const root = document.documentElement;
        for (let key in settings) {
            root.style.setProperty(key, settings[key]);
        }
        // Save to localStorage
        localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    const [theme, setTheme] = useState(() => {
        // Retrieve the selected theme from localStorage
        return localStorage.getItem('selectedTheme') || "light";
    });

    const themes = [
        {
            "--background-color": "#fff",
            "--background-light": "#fff",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#0A0A0A",
            "--text-light": "#575757",
        },
        {
            "--background-color": "rgb(29, 29, 29)",
            "--background-light": "rgb(77, 77, 77)",
            "--shadow-color": "rgba(0,0,0,0.2)",
            "--text-color": "#ffffff",
            "--text-light": "#eceaea",
        }
    ];

    function changeTheme(i) {
        const selectedTheme = i === 0 ? "light" : "dark";
        setTheme(selectedTheme);
        // Save the selected theme to localStorage
        localStorage.setItem('selectedTheme', selectedTheme);
        let _settings = { ...settings, ...themes[i] };
        setSettings(_settings);
    }

    function changeColor(i) {
        const _color = primaryColors[i]
        let _settings = { ...settings }
        _settings["--primary-color"] = _color
        setPrimaryColor(i)
        setSettings(_settings)
    }

    function changeFontSize(i) {
        const _size = fontSizes[i]
        let _settings = { ...settings }
        _settings["--font-size"] = _size.value
        setFontSize(i)
        setSettings(_settings)
    }

    function changeAnimationSpeed(i) {
        let _speed = animationSpeeds[i]
        let _settings = { ...settings }
        _settings["--animation-speed"] = _speed.value
        setAnimationSpeed(i)
        setSettings(_settings)
    }
    const primaryColors = [
        "rgb(255, 0, 86)",
        "rgb(33, 150, 243)",
        "rgb(255, 193, 7)",
        "rgb(0, 200, 83)",
        "rgb(156, 39, 176)",
    ]
    const [primaryColor, setPrimaryColor] = useState(0)
    const fontSizes = [
        {
            title: "Nhỏ",
            value: "12px",
        },
        {
            title: "Vừa",
            value: "16px",
        },
        {
            title: "Lớn",
            value: "20px",
        }
    ]
    const [fontSize, setFontSize] = useState(1)
    const animationSpeeds = [
        {
            title: "Chậm",
            value: 2
        },
        {
            title: "Vừa",
            value: 1
        },
        {
            title: "Nhanh",
            value: .5
        },
    ]
    const [animationSpeed, setAnimationSpeed] = useState(1)
    return (
        <div>
            <div className="section d-block">
                <h2>Lựa chọn chủ đề</h2>
                <div className="option-container">
                    <div className="option light" onClick={() => changeTheme(0)}>
                        {theme === "light" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                    <div className="option dark" onClick={() => changeTheme(1)}>
                        {theme === "dark" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="section d-block">
                <h2>Màu chủ đạo</h2>
                <div className="option-container">
                    {primaryColors.map((color, index) => (
                        <div className="option light" style={{ backgroundColor: color }} onClick={() => changeColor(index)}>
                            {primaryColor === index && (
                                <div className="check">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Cỡ chữ</h2>
                <div className="option-container">
                    {fontSizes.map((size, index) => (
                        <button className="btn" onClick={() => changeFontSize(index)}>
                            {size.title}
                            {fontSize === index && <span><FontAwesomeIcon icon={faCheck} /> </span>}
                        </button>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Tốc độ hoạt ảnh</h2>
                <div className="option-container">
                    {animationSpeeds.map((speed, index) => (
                        <button className="btn" onClick={() => changeAnimationSpeed(index)}>
                            {speed.title}
                            {animationSpeed === index && <span><FontAwesomeIcon icon={faCheck} /> </span>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}