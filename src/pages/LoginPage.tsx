import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clock from "../components/Clock";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

export default function LoginPage(){
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <Header />
            </div>
            <div className="flex flex-col mt-10">
                <Clock />
                <LoginForm />
            </div>
            <button onClick={() => navigate("main")}> на граф </button>
        </div>
    )
}
