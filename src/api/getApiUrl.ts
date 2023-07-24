import * as process from 'process';

export const getApiUrl = (): string => {
    return process.env.REACT_APP_DEV === 'dev' ? 'http://0.0.0.0:8000' : `http://0.0.0.0:9000`;
};
