import React from 'react'
import AppRouter from './AppRouter'
import '../assets/styles/app.scss';
import { useRefresh } from '../hooks/useRefresh';

const App = () => {

    const isLoading = useRefresh();

    if(isLoading) {
        return(
            <></>
        );
    }


    return (
        <div className='app'>
            <AppRouter />
        </div>
    )
}

export default App