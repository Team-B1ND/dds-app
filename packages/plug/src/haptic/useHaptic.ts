import { useCallback } from 'react';
import { MessageType, type HapticFeedbackType } from '@dds-app/bridge';
import { usePlug } from '../PlugContext';

export const useHaptic = () => {
  const { send } = usePlug();

  const trigger = useCallback(
    (type: HapticFeedbackType = 'impactLight') => {
      send(MessageType.HAPTIC_TRIGGER, { type });
    },
    [send]
  );

  return { trigger };
};