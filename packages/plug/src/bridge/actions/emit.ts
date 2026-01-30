import { createEvent, encode } from '@dds-app/bridge';

export const createEmit = (sendMessage: (data: string) => void) => {
  return <TPayload = unknown>(type: string, payload?: TPayload) => {
    sendMessage(encode(createEvent(type, payload)));
  };
};