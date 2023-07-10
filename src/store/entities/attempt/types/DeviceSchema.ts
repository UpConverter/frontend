import { attemptActions } from '@store/entities/attempt';

export enum DeviceType {
    UPCONV = 'upconv',
    CAL = 'cal',
}

export const connectionActions = {
    [DeviceType.UPCONV]: attemptActions.setUpconv,
    [DeviceType.CAL]: attemptActions.setCals,
};
