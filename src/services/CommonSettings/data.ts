export const ports = [
    { value: 'COM_1', label: 'COM 1' },
    { value: 'COM_2', label: 'COM 2' },
    { value: 'COM_3', label: 'COM 3' },
    { value: 'COM_4', label: 'COM 4' },
];
export const speeds = [
    { value: 256000, label: '256 000' },
    { value: 257000, label: '257 000' },
    { value: 258000, label: '258 000' },
];

export const configs = [
    { value: 'Конфигурация 1', label: 'Конфигурация 1' },
    { value: 'Конфигурация 2', label: 'Конфигурация 2' },
    { value: 'Конфигурация 3', label: 'Конфигурация 3' },
    { value: 'Конфигурация 4', label: 'Конфигурация 4' },
];

export const cals = [
    { value: 'Cal 1', label: 'Cal 1' },
    { value: 'Cal 2', label: 'Cal 2' },
    { value: 'Cal 3', label: 'Cal 3' },
    { value: 'Cal 4', label: 'Cal 4' },
];

export const channels = [
    { value: 'SW1', label: 'SW1' },
    { value: 'SW2', label: 'SW2' },
    { value: 'SW3', label: 'SW3' },
    { value: 'SW4', label: 'SW4' },
];

export const types = [
    { value: 'Coaxial', label: 'Coaxial' },
    { value: 'Solid_state', label: 'Solid State' },
];

export const cals_status = [
    { name: 'Cal 1', type: 'Coaxial', connected_to: 'Cal 1', current_chanel: 'SW1' },
    { name: 'Cal 2', type: 'Coaxial', connected_to: 'Cal 1', current_chanel: 'SW2' },
    { name: 'Cal 3', type: 'Solid_state', connected_to: 'Cal 2', current_chanel: 'SW3' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
];
