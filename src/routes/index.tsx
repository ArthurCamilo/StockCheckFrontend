import React from 'react';
import { useAuth } from '../contexts/auth';
import AppRoute from './app.routes';
import AuthRoute from './auth.routes';

const Routes: React.FC = () => {
    const { logged } = useAuth();
    console.log(logged);
    return logged ? <AppRoute /> : <AuthRoute />;
};

export default Routes;