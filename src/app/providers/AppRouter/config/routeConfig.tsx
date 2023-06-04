import { getRouteMain, getRouteSettings } from '@app/providers/AppRouter';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { SettingsPage } from '@pages/SettingsPage';

import type { AppRoute } from '../model/types/AppRoute';

export const routeConfig: AppRoute[] = [
    { path: getRouteMain(), element: <MainPage /> },
    { path: getRouteSettings(), element: <SettingsPage /> },
    { path: '*', element: <NotFoundPage /> },
];
