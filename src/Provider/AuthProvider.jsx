import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
}

const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}

const logOut = () => {
    return signOut(auth);
}

const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
}

useEffect( () => {

    const unSubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('Spying user ', currentUser)
        setUser(currentUser);
        const userInfo = {email: currentUser?.email}
        if(currentUser){
            axiosPublic.post('/jwt', userInfo)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('access-token', res.data.token)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            localStorage.removeItem('access-token')
            setLoading(false);
        }
    })
    return () => {
        unSubscribe();
    }

}, [axiosPublic])

const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
    })
}

    const authInfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        googleLogIn,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AuthProvider;