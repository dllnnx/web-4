import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./assets/index.css";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <LoginPage />
        },
        {
            path: "/main",
            element: <MainPage />
        }
    ]
)

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);