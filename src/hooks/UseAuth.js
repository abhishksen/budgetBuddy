import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase"
import { onAuthStateChanged } from "firebase/auth";

const UseAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, user => {
            // console.log(user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unSub;
    }, [])

    return { user }
};

export default UseAuth;
