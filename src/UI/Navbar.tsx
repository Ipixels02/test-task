import React from 'react';
import MyButton from "./Button/MyButton";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"navbar"}>
            <div className="navbar__links">
                <Link style={{marginRight: 20}} to={"/main"}>Главная</Link>
                <Link to={"/users"}>тест</Link>
            </div>
        </div>
    );
};

export default Navbar;