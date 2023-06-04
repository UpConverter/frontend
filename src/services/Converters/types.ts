export interface Converter {
    id: string;
    name: string;
    info: string;
    mode: 'cryo' | 'cal' | 'off';
}

export type ConvertersList = Converter[];
