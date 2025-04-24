import React, { createContext, useState } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // updata user data

    const updateUser = (userData) => {
        setUser(userData);
    };

    // clear user data on logout
    const clearUser = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{
            user,
            updateUser,
            clearUser,
        }}>
            {children}
        </UserContext.Provider>


    );
};

export default UserContext;
