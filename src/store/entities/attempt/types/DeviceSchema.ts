import { attemptActions } from '@store/entities/attempt';

export enum DeviceType {
    UPCONV = 'UPCONVERTER',
    CAL = 'CAL',
}

export const connectionActions = {
    [DeviceType.UPCONV]: attemptActions.setUpconv,
    [DeviceType.CAL]: attemptActions.setCals,
};
