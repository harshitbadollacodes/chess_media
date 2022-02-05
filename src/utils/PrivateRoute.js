import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }) {
    
    const user = useSelector(state => state.user);
    
    const location = useLocation();

    return user?.token ? 
        children
        :   
        <Navigate replace to="/login" />
}
