export enum Port {
    COM_1 = 'COM 1',
    COM_2 = 'COM 2',
    COM_3 = 'COM 3',
    COM_4 = 'COM 4',
}

export interface CommonSettings {
    id: string;
    port: Port;
    speed: number;
}
