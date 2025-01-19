import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./assets/index.css";
import App from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />
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