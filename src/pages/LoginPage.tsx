import React from 'react';
import Clock from "../components/Clock";
import LoginHeader from "../components/LoginHeader";
import LoginForm from "../components/LoginForm";

export default function LoginPage(){
    return (
        <div className="flex flex-col w-screen">
            <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <LoginHeader />
            </div>
            <div className="flex justify-between content-center mt-16 w-full ">
                <Clock />
                <LoginForm />
            </div>
        </div>
    )
}
