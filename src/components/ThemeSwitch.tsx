import React, { useState } from "react";
import { FormControlLabel, Switch, styled } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const ThemeSwitch = styled(Switch)(({}) => ({
    width: 72,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 3,
        padding: 0,
        transform: "translateX(3px)",
        "&.Mui-checked": {
            color: "#1e1f26",
            transform: "translateX(40px)",
            "& + .MuiSwitch-track": {
                backgroundColor: "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "#1e1f26",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
            fontSize: "20px",
            color: "#1e1f26",
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        borderRadius: 20 / 2,
    },
}));

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
        document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    };

    return (
        <FormControlLabel
            control={
                <ThemeSwitch
                    checked={isDark}
                    onChange={toggleTheme}
                    icon={
                    <div style={{borderRadius: "50%", backgroundColor: "#1e1f26", padding: "2px"}}>
                        <LightModeOutlinedIcon className="-mt-0.5"/>
                    </div>
                }
                    checkedIcon={
                    <div style={{borderRadius: "50%", backgroundColor: "#dde4e6", padding: "2px"}}>
                        <DarkModeOutlinedIcon className="-mt-0.5"/>
                    </div>
                }
                />
            }
            label=""
        />
    );
}
