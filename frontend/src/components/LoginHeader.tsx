import React from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function LoginHeader() {
    return (
        <header className="text-center">
            <div className="flex fixed w-full items-baseline ml-6 mt-2">
                <ThemeSwitch />
            </div>
            <h1>Лабораторная работа №4</h1>
            <h1>Денисова Алена Александровна P3211, вариант 21041</h1>
        </header>
    )
}