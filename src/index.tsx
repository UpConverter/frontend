import './app/styles/index.css';

import { App } from '@app/App';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { StyledEngineProvider } from '@mui/material/styles';
import { store } from '@store/index';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (!container) {
    throw new Error();
}

const root = createRoot(container);

root.render(
    <StrictMode>
        <ErrorBoundary>
            <StyledEngineProvider injectFirst>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </StyledEngineProvider>
        </ErrorBoundary>
    </StrictMode>
);
