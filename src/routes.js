import AdminPage from "./pages/AdminPage";
import {ADD_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, UPDATE_ROUTE, USER_ROUTE, VIEW_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import MainList from "./pages/MainList";
import UserPage from "./pages/UserPage";
import ViewPage from "./pages/ViewPage";
import UpdatePage from "./pages/UpdatePage";
import AddUser from "./pages/AddUser";

export  const authRoutes =[
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: UPDATE_ROUTE,
        Component: UpdatePage,
    },
    {
        path: ADD_ROUTE,
        Component: AddUser,
    }
]

export const publicRoutes =[
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: MainList
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    },
    {
        path: VIEW_ROUTE,
        Component: ViewPage
    },
]

