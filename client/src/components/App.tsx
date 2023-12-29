import React from 'react'
import AppRouter from './AppRouter'
import '../assets/styles/app.scss';
import { useRefresh } from '../hooks/useRefresh';
import { useIsAuth } from '../hooks/account';
import Sidebar from './Sidebar/Sidebar';

const App = () => {

    const isAuth = useIsAuth();
    const isLoading = useRefresh();

    if(isLoading) {
        return(
            <></>
        );
    }

    const appClasses = ['app'];
    if(isAuth) appClasses.push('app-authed');

    return (
        <div className={appClasses.join(' ')}>
            {isAuth && <Sidebar />}
            <AppRouter />
        </div>
    )
}

export default App