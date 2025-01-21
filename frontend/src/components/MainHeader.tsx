import React from "react";
import {useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "./ThemeContext";

export default function MainHeader() {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    return (
        <header>
            <div className="flex justify-center w-screen">
                <div className="fixed w-full items-baseline ml-6">
                    <IconButton
                        aria-label="logout"
                        size="large"
                        style={{ color: isDark ? "white" : "black" }}
                        onClick={() => navigate("/")}>
                        <LogoutIcon/>
                    </IconButton>
                </div>
                <header className="text-center">
                    <h1>Лабораторная работа №4</h1>
                    <h1>Денисова Алена Александровна P3211, вариант 21041</h1>
                </header>
                <div className="fixed right-0 mr-4">
                    <ThemeSwitch/>
                    <IconButton
                        aria-label="user"
                        style={{ color: isDark ? "white" : "black" }}
                        size="large"
                    >
                        <AccountCircleOutlinedIcon fontSize="medium"/>
                    </IconButton>
                </div>
            </div>
        </header>
    )
    }