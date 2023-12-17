import { FC } from "react";
import { ANY_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTE_MODIFIER } from "../../utils/consts";

interface IBaseRoute {
    component: FC;
    defaultRoute?: boolean;
}

export interface IPublicRoute extends IBaseRoute {
    path: PUBLIC_ROUTES,
    modifier: ROUTE_MODIFIER.PUBLIC
}

export interface IPrivateRoute extends IBaseRoute {
    path: PRIVATE_ROUTES,
    modifier: ROUTE_MODIFIER.PRIVATE
}

export interface IAnyRoute extends IBaseRoute {
    path: ANY_ROUTES,
    modifier: ROUTE_MODIFIER.ANY
}

type IRoute = IPublicRoute | IPrivateRoute | IAnyRoute;

export default IRoute;