import React, { useState, useEffect } from 'react'

import {auth} from './base';
import 'firebase/auth';

export const AuthPage = () => {
    const [currentUser, setCurrentUser] = useState();
    const provider = new auth.GoogleAuthProvider()


    const authWithGoogle = () => {
        auth.signInWithPopup(provider);
    };

    return(
        <>
            {currentUser && <>
            <img src={currentUser.photoURL} width="100" height="1000"alt="avatar" />
            <p>{currentUser.displayName}</p>
            <p>{currentUser.email}</p>

            </>}
            <button onClick={authWithGoogle}>Login</button>
        </>
    );
};

export default AuthPage;