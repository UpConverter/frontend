export interface Configuration {
    id: number | undefined;
    name: string | undefined;
}
export interface AttemptState {
    configuration: Configuration;
    speed: number | undefined;
    port: string | undefined;
    attempt_token: string | undefined;
}

export interface RootState {
    attempt: AttemptState;
}
