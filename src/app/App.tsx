import { Header } from '@components/Header';
import type { FC } from 'react';

import { AppRouter } from './providers/AppRouter';

export const App: FC = () => {
    return (
        <div>
            <Header />
            <AppRouter />
        </div>
    );
};
