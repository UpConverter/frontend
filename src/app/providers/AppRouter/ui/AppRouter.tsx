import type { FC } from 'react';
import { Suspense } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { routeConfig } from '../config/routeConfig';
import type { AppRoute } from '../model/types/AppRoute';

export const AppRouter: FC = () => {
    const renderWithWrapper = (route: AppRoute) => {
        const element = <Suspense fallback=''>{route.element}</Suspense>;

        return (
            <Route
                element={element}
                key={route.path}
                path={route.path}
            />
        );
    };

    return <Routes>{routeConfig.map(renderWithWrapper)}</Routes>;
};
