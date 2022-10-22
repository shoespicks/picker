import { AuthRepository } from '~/repository/AuthRepository';
import { SpikeRepository } from '~/repository/SpikeRepository';

export const $spikeRepository = new SpikeRepository();
export const $authRepository = new AuthRepository();
