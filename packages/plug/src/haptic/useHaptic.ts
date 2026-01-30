import { useCallback } from 'react';
import {
  HAPTIC_EVENT_TYPE,
  type HapticType,
  type HapticPayload,
} from '@dds-app/bridge';
import { usePlug } from '../PlugProvider';

export const useHaptic = () => {
  const { emit } = usePlug();

  const trigger = useCallback(
    (type: HapticType = 'impactLight') => {
      emit<HapticPayload>(HAPTIC_EVENT_TYPE, { type });
    },
    [emit]
  );

  return { trigger };
};