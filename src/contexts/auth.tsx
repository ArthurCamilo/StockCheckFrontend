import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationRequester } from '../requesters/authenticationRequester';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

interface User {
    fullName: string;
    email: string;
}

interface AuthContextData {
    logged: boolean;
    user: User | null;
    token: string | null;
    login(email: string, password: string): Promise<void>;
    logout(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const authenticationRequester = new AuthenticationRequester();

    async function loadStoragedData() {
        const storedToken = localStorage.getItem('@STOCKCHECKAuth:token');
        const storedUser = localStorage.getItem('@STOCKCHECKAuth:user');
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStoragedData();
    }, [])

    async function login (email: string, password: string) {
        setLoading(true);

        authenticationRequester.authenticate(email, password).then(response => {
            localStorage.setItem('@STOCKCHECKAuth:token', response.token);
            const user = response.user;
            localStorage.setItem('@STOCKCHECKAuth:user', JSON.stringify(user));
            loadStoragedData();
        }).catch(error => {
            toast.error(error.response.data);
            setLoading(false);
        });
    }

    async function logout () {
        localStorage.clear();
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{logged: token != null, user, token, logout, login, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}