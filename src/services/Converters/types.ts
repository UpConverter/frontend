export enum ConverterMode {
    CRYO = 'CRYO',
    CAL = 'CAL',
    TERMINATE = 'OFF',
}

export interface Converter {
    id: number;
    name: string;
    info: string;
    mode: ConverterMode;
}

export type ConvertersList = Converter[];
