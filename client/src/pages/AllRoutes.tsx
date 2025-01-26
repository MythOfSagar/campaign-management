import React from "react";

import { useSelector } from "react-redux";

import { Route, Routes, Navigate } from "react-router-dom";

import Campaigns from "./Campaigs.tsx";
import SignUp from "./SignUp.tsx";
import SignIn from "./SignIn.tsx";
import TaskBoard from "./TaskBoard.tsx";

import { ROUTES } from "../constants.ts";
import ResetPassword from "./ResetPassword.tsx";


const Allroutes = () => {
    const isLogedIn = !!useSelector((state: any) => state?.auth?.loginData?.token);

    return (
        <Routes>
            <Route
                path={"/"}
                element={<Navigate to={isLogedIn ? ROUTES.DEFAULT : ROUTES.SIGN_UP} />} />
            <Route
                path={ROUTES.CAMPAIGNS}
                element={isLogedIn ? <Campaigns /> : <Navigate to={ROUTES.SIGN_IN} />} />
            <Route
                path={ROUTES.TASK}
                element={isLogedIn ? <TaskBoard /> : <Navigate to={ROUTES.SIGN_IN} />} />
            <Route
                path={ROUTES.SIGN_IN}
                element={isLogedIn ? <Navigate to={ROUTES.DEFAULT} /> : <SignIn />} />
            <Route
                path={ROUTES.SIGN_UP}
                element={isLogedIn ? <Navigate to={ROUTES.DEFAULT} /> : <SignUp />} />
            <Route
                path={ROUTES.RESET_PASSWORD}
                element={isLogedIn ? <Navigate to={ROUTES.DEFAULT} /> : <ResetPassword />} />
        </Routes>
    );
};

export default Allroutes;
