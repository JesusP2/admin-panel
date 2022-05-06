import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import type { User, UserCredential } from 'firebase/auth';
import {
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase';

interface IContext {
    getUser: () => Promise<null | User>;
    currentUser: User | null;
    isAdmin: () => Promise<boolean | undefined>;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext({} as IContext);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<null | User>(null);
    const [loading, setLoading] = useState(true);

    async function signIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    async function logOut(): Promise<void> {
        return signOut(auth);
    }

    async function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function getUser(): Promise<null | User> {
        return new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((user: null | User) => {
                unsubscribe();
                setCurrentUser(user);
                resolve(user);
            });
        });
    }

    async function isAdmin() {
        if (!currentUser) {
            return;
        }

        const idTokenResult = await currentUser.getIdTokenResult();
        return !!idTokenResult.claims.admin;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value: IContext = {
        getUser,
        currentUser,
        isAdmin,
        signIn,
        logOut,
        signUp,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

