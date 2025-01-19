import React, {useEffect, useState } from "react";
import './clock.css';

export default function Clock() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        }
    }, []);

    const deg = 6;
    let day = date;
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;

    const switchTheme = (evt) => {
        const switchBtn = evt.target;
        if (switchBtn.textContent.toLowerCase() === "light") {
            switchBtn.textContent = "dark";
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            switchBtn.textContent = "light";
            document.documentElement.setAttribute("data-theme", "light");
        }
    };

    return (
        <div className="flex flex-col ml-32">
            <div className="clock">
                <div className="hour" style={{transform: `rotateZ(${hh + mm / 12}deg)`}}></div>
                <div className="min" style={{transform: `rotateZ(${mm}deg)`}}></div>
                <div className="sec" style={{transform: `rotateZ(${ss}deg)`}}></div>
            </div>
            <div className="switch-cont">
                <button className="switch-btn w-16 h-8 text-center text-xs" onClick={switchTheme}> Light</button>
            </div>
        </div>
    )
}