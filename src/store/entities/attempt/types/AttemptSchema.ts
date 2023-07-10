import type { Connections } from '@api/generatedApi';

export interface Configuration {
    id: number | undefined;
    name: string | undefined;
}
export interface AttemptState {
    cals: Connections[];
    upconv: Connections[];
    configuration: Configuration;
    speed: number | undefined;
    port: string | undefined;
    success: boolean;
}

export interface RootState {
    attempt: AttemptState;
}
