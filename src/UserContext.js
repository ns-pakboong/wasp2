import React, { useEffect, useState } from 'react'
import { auth } from "./firebase";


export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    return 
    <UserContext.UserProvider value={currentUser}>
        {children}
    </UserContext.UserProvider>
};

