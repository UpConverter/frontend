export enum ConverterMode {
    Cryo = 'cryo',
    Cal = 'cal',
    Off = 'off',
}

export interface Converter {
    id: string;
    name: string;
    info: string;
    mode: ConverterMode;
}

export type ConvertersList = Converter[];
