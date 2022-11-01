import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../Component/MainPage";
import {UserPage} from "../Component/UserPage";
import StateRoute from "../Component/StateRoute";

const AppRouter = () => {
    return (
        <Routes>
            {/*<Route element={<StateRoute/>}>*/}
                <Route path={"/main"} element={<MainPage />}/>
                <Route path={"/user/:id"} element={<UserPage />}/>
                <Route path={"/users"} element={<UserPage />}/>
            {/*</Route>*/}
        </Routes>
    );
};

export default AppRouter;