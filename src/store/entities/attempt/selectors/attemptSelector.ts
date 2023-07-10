import type { RootState } from '@store/index';

export const getAttempt = (state: RootState) => state.attempt;
export const getAttemptCals = (state: RootState) => state.attempt.cals;
export const getAttemptUpconv = (state: RootState) => state.attempt.upconv;
export const getAttemptSpeed = (state: RootState) => state.attempt.speed;
export const getAttemptPort = (state: RootState) => state.attempt.port;
export const getAttemptConfigName = (state: RootState) => state.attempt.configuration.name;
export const getAttemptConfigId = (state: RootState) => state.attempt.configuration.id;
export const getAttemptSuccess = (state: RootState) => state.attempt.success;
