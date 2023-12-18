import React, { useEffect } from 'react'
import AppRouter from './AppRouter'
import { useAppDispatch } from '../hooks/redux'
import { setFirstLoad } from '../store/slices/account.slice';
import '../assets/styles/app.scss';

const App = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setFirstLoad(true));
    }, []);


    return (
        <div className='app'>
            <AppRouter />
        </div>
    )
}

export default App