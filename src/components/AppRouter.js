// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { authRoutes, publicRoutes } from "../routes";
// import {UserContext} from "./UserContext";
// import MainList from "../pages/MainList";
// import {BACHELOR_ROUTE, MAIN_ROUTE} from "../utils/consts";
//
// const AppRouter = () => {
//     const { user } = useContext(UserContext);
//
//     return (
//         <Routes>
//             {user && user.isAuth && authRoutes.map(({ path, Component }) => (
//                 <Route key={path} path={path} element={<Component />} />
//             ))}
//             {publicRoutes.map(({ path, Component }) => (
//                 <Route key={path} path={path} element={<Component />} />
//             ))}
//             <Route exact path={BACHELOR_ROUTE} element={<MainList role="master" />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//     );
// };
//
// export default AppRouter;
import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MainList from './pages/MainList';
import { BACHELOR_ROUTE, MASTER_ROUTE } from './utils/consts';
import { authRoutes, publicRoutes } from "../routes";

const AppRouter = observer(() => {
    return (
        <Routes>
            <Route path="/" element={<MainList />} />
            <Route path={BACHELOR_ROUTE} element={<MainList role="bachelor" />} />
            <Route path={MASTER_ROUTE} element={<MainList role="master" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
});

export default AppRouter;
