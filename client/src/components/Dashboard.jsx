/// Only accesible to auth users

import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Welcome, {user ? user.name : "User"}</h1>
            <button onClick={logout}>Log Out</button>
        </div>
    );
};

export default Dashboard;
