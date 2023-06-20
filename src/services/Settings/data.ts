export const ports = [
    { id: 1, value: 'COM 1' },
    { id: 2, value: 'COM 2' },
    { id: 3, value: 'COM 3' },
    { id: 4, value: 'COM 4' },
];
export const speeds = [
    { id: 1, value: 256000 },
    { id: 2, value: 257000 },
    { id: 3, value: 258000 },
    { id: 4, value: 259000 },
];

export const configs = [
    { id: 1, value: 'Конфигурация 1' },
    { id: 2, value: 'Конфигурация 2' },
    { id: 3, value: 'Конфигурация 3' },
    { id: 4, value: 'Конфигурация 4' },
];

export const cals = [
    { id: 1, value: 'Cal 1' },
    { id: 2, value: 'Cal 2' },
    { id: 3, value: 'Cal 3' },
    { id: 4, value: 'Cal 4' },
    { id: 5, value: 'Cal 5' },
];

export const channels = [
    { id: 1, value: 'SW1' },
    { id: 2, value: 'SW2' },
    { id: 3, value: 'SW3' },
    { id: 4, value: 'SW4' },
    { id: 5, value: 'SW5' },
    { id: 6, value: 'SW6' },
    { id: 7, value: 'SW7' },
];

export const types = [
    { id: 1, value: 'Coaxial' },
    { id: 2, value: 'Solid state' },
];

// Далее ничего нового не появляется, эти данные будут получаться через
// join select запросы для удобного отображения на фронте
export const cals_status = [
    { name: 'Cal 1', type: 'Coaxial', connected_to: 'Cal 1', current_chanel: 'SW1' },
    { name: 'Cal 2', type: 'Coaxial', connected_to: 'Cal 1', current_chanel: 'SW2' },
    { name: 'Cal 3', type: 'Solid state', connected_to: 'Cal 2', current_chanel: 'SW3' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'Cal 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW1' },
];

export const modules_status = [
    { name: 'UpConverter 1', type: 'Solid state', connected_to: 'Cal 1', current_chanel: 'SW1' },
    { name: 'UpConverter 2', type: 'Solid state', connected_to: 'Cal 2', current_chanel: 'SW1' },
    { name: 'UpConverter 3', type: 'Solid state', connected_to: 'Cal 2', current_chanel: 'SW2' },
    { name: 'UpConverter 4', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW3' },
    { name: 'UpConverter 5', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW2' },
    { name: 'UpConverter 6', type: 'Solid state', connected_to: 'Cal 2', current_chanel: 'SW2' },
    { name: 'UpConverter 7', type: 'Coaxial', connected_to: 'Cal 2', current_chanel: 'SW4' },
    { name: 'UpConverter 8', type: 'Solid state', connected_to: 'Cal 3', current_chanel: 'SW3' },
];
