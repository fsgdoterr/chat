import React from 'react'
import Button from '../UI/Button/Button'
import { MdLogout } from "react-icons/md";
import { useFetching } from '../../hooks/useFetching';
import { AuthApi } from '../../http/AuthApi';
import { useAppDispatch } from '../../hooks/redux';
import { setIsAuth, setUser } from '../../store/slices/account.slice';

const Logout = () => {

    const dispatch = useAppDispatch();

    const [logout, isLoading] = useFetching(async () => {
        const response = await AuthApi.logout();
        dispatch(setUser(undefined));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token')
    });

    return (
        <Button
            onClick={logout}
            loading={isLoading}
        >
            <MdLogout
                className='svg'
            />
        </Button>
    )
}

export default Logout