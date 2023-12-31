import Chat from "../pages/Chat/Chat";
import Empty from "../pages/Empty/Empty";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import IRoute from "../types/models/IRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROUTE_MODIFIER } from "../utils/consts";

const routes: IRoute[] = [
    {
        path: PUBLIC_ROUTES.SIGN_IN,
        component: SignIn,
        modifier: ROUTE_MODIFIER.PUBLIC,
        defaultRoute: true,
    },
    {
        path: PUBLIC_ROUTES.SIGN_UP,
        component: SignUp,
        modifier: ROUTE_MODIFIER.PUBLIC,
    },
    {
        path: PUBLIC_ROUTES.FORGOT_PASSWORD,
        component: ForgotPassword,
        modifier: ROUTE_MODIFIER.PUBLIC,
    },
    {
        path: PRIVATE_ROUTES.EMPTY,
        component: Empty,
        modifier: ROUTE_MODIFIER.PRIVATE,
        defaultRoute: true,
    },
    {
        path: PRIVATE_ROUTES.CHAT,
        component: Chat,
        modifier: ROUTE_MODIFIER.PRIVATE,
    },
];

export default routes;