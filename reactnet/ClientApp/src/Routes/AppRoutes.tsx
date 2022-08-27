import React from 'react'
import {Routes, Route, Link} from "react-router-dom";
import Dashboard from '../Pages/Dashboard';
import NotFound from '../Pages/NotFound';
import Restaurants from '../Pages/Restaurants';
import Reservations from '../Pages/Reservations';
import Orders from '../Pages/Orders';
import Meals from '../Pages/Meals';
import Users from '../Pages/Users';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/Users" element={<Users/>}/>
                <Route path="/" element={<Restaurants/>}/>
                <Route path="/restaurants" element={<Restaurants/>}/>
                <Route path="/orders/:reservationID/:restaurantID" element={<Orders/>}/>
                <Route path="/reservations/:restaurantID" element={<Reservations/>}/>
                <Route path="/Meals/:restaurantID" element={<Meals/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </>
    )
}

export default AppRoutes