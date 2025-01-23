import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeSwitch from "./ThemeSwitch";
import { useTheme } from "./ThemeContext";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function MainHeader() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const dispatch = useDispatch();

    const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const toggleLogoutDialog = () => {
        setLogoutDialogOpen(!isLogoutDialogOpen);
    };

    return (
        <header>
            <div className="flex justify-center w-screen">
                <div className="fixed w-full items-baseline ml-6">
                    <IconButton
                        aria-label="logout"
                        size="large"
                        style={{ color: isDark ? "white" : "black" }}
                        onClick={toggleLogoutDialog}>
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

            <Dialog
                open={isLogoutDialogOpen}
                onClose={toggleLogoutDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
            >
                <DialogTitle id="logout-dialog-title">{"Вы точно хотите выйти из аккаунта?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={toggleLogoutDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleLogout} color="error" autoFocus>
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </header>
    )
    }