import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header";

export default function MainPage(){
    const navigate = useNavigate();
    return (
        <>
            вернуться назад <br></br>
            <button onClick={() => navigate("/")}>клик</button>
        </>
    )
}