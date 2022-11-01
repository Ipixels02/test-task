import React from 'react';
import {Outlet} from "react-router-dom";

const StateRoute = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default StateRoute;