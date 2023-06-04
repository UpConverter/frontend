import type { RouteProps } from 'react-router-dom';

export type AppRoute = RouteProps & {
    auth?: boolean;
};
