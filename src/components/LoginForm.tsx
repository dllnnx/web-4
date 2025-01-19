import React, { useState } from "react";

export default function LoginForm() {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleRegisterMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <>
            <form className="flex flex-col mx-auto mt-10">
                <div className="flex items-center mb-2">
                    <label htmlFor="login" className="mr-2 w-1/4">логин</label>
                    <input
                        type="text"
                        id="login"
                        className="border border-black rounded-md p-2 w-3/4"
                        placeholder="ваш логин"
                    />
                </div>
                <div className="flex items-center mb-2">
                    <label htmlFor="password" className="mr-2 w-1/4">пароль</label>
                    <input
                        type="password"
                        id="password"
                        className="border border-black rounded-md p-2 w-3/4"
                        placeholder="ваш пароль"
                    />
                </div>
                {isRegistering && (
                    <div className="flex items-center mb-2">
                        <label htmlFor="confirmPassword" className="mr-2 w-1/4"></label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="border border-black rounded-md p-2 w-3/4 ml-auto"
                            placeholder="повторите пароль"
                        />
                    </div>
                )}
                <button className="bg-blue-500 text-white rounded-md p-2 mt-2">
                    {isRegistering ? "зарегистрироваться" : "войти"}
                </button>
                <button
                    type="button"
                    className="bg-blue-500 text-white rounded-md p-2 mt-3"
                    onClick={toggleRegisterMode}
                >
                    {isRegistering ? "я уверенный пользователь сайта" : "я тут первый раз ваще"}
                </button>
            </form>
        </>
    );
}
