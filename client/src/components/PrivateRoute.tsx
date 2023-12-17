import React, { FC, PropsWithChildren } from 'react'
import { useDefaultRoute } from '../hooks/useDefaultRoute'
import { useFirstLoad, useIsAuth } from '../hooks/account';
import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<PropsWithChildren> = ({
    children
}) => {

    const defaultRoute = useDefaultRoute();
    const isAuth = useIsAuth();
    const firstLoad = useFirstLoad();

    if(!firstLoad) {
        return (<></>);
    }

    if(!isAuth && firstLoad) {
        return <Navigate to={defaultRoute.path as string} replace/>
    }

    return (
        <>
            {children}
        </>
    )
}

export default PrivateRoute