import { Link, useLocation } from "react-router-dom"

import { useState } from "react"
import { useAuth } from "../AuthContext"
import Sidebar from "./Sidebar"

import { faHome, faList, faCog, faSignIn, faUser } from "@fortawesome/free-solid-svg-icons"


export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const { isLoggedIn } = useAuth();

    const links = isLoggedIn ? [
        {
            name: "Trang chủ",
            path: "/",
            icon: faHome
        },
        {
            name: "Công thức",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Cài đặt",
            path: "/settings",
            icon: faCog
        },
        {
            name: "Hồ sơ",
            path: "/profile",
            icon: faUser
        }
        // ... các liên kết khác khi đăng nhập
    ] : [
        {
            name: "Trang chủ",
            path: "/",
            icon: faHome
        },
        {
            name: "Công thức",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Cài đặt",
            path: "/settings",
            icon: faCog
        },
        { name: "Đăng nhập", 
        path: "/login", 
        icon: faSignIn }
        // ... các liên kết khác khi chưa đăng nhập
    ];
    
    function closeSidebar() {
        setShowSidebar(false)
    }
    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">TasteB<span>oo</span>k</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                    {/* <a href="#!">Home</a>
                    <a href="#!">Recipes</a>
                    <a href="#!">Settings</a> */}
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </>
    )
}