import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AppRouter from "./UI/AppRouter";
import Navbar from "./UI/Navbar";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
