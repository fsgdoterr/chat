import routes from "../routes";
import IRoute from "../types/models/IRoute";
import { ROUTE_MODIFIER } from "../utils/consts";
import { useIsAuth } from "./account"


export const useDefaultRoute = () => {

    const isAuth = useIsAuth();

    const modifier = isAuth ? ROUTE_MODIFIER.PRIVATE : ROUTE_MODIFIER.PUBLIC;

    const defaultRoute = routes.find(route => route.modifier === modifier && route.defaultRoute);

    return defaultRoute as  IRoute;
}