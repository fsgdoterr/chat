import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { ROUTE_MODIFIER } from '../utils/consts'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { useDefaultRoute } from '../hooks/useDefaultRoute'

const AppRouter = () => {

    const defaultRoute = useDefaultRoute();

    return (
        <Routes>
            {routes.map(route => 
                <Route 
                    key={`${route.modifier}_${route.path}`}
                    path={route.path as string}
                    element={
                        route.modifier === ROUTE_MODIFIER.PUBLIC
                            ? <PublicRoute><route.component /></PublicRoute>
                            : route.modifier === ROUTE_MODIFIER.PRIVATE
                            ? <PrivateRoute><route.component /></PrivateRoute>
                            : <route.component />
                    }
                />
            )}
            <Route 
                path='/*'
                element={<Navigate to={defaultRoute.path as string} replace />}
            />
        </Routes>
    )
}

export default AppRouter