import {
  MessageCategory,
  BridgeMessageSchema,
  type BridgeMessage,
  type RequestMessage,
  type ResponseMessage,
  type EventMessage,
} from './types';

const generateId = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const createRequest = <TPayload = unknown>(
  type: string,
  payload?: TPayload
): RequestMessage => ({
  id: generateId(),
  timestamp: Date.now(),
  category: MessageCategory.REQUEST,
  type,
  payload,
});

export const createResponse = <TData = unknown>(
  requestId: string,
  success: boolean,
  data?: TData,
  error?: string
): ResponseMessage => ({
  id: generateId(),
  timestamp: Date.now(),
  category: MessageCategory.RESPONSE,
  requestId,
  success,
  data,
  error,
});

export const createSuccessResponse = <TData = unknown>(
  requestId: string,
  data?: TData
): ResponseMessage => createResponse(requestId, true, data);

export const createErrorResponse = (
  requestId: string,
  error: string
): ResponseMessage => createResponse(requestId, false, undefined, error);

export const createEvent = <TPayload = unknown>(
  type: string,
  payload?: TPayload
): EventMessage => ({
  id: generateId(),
  timestamp: Date.now(),
  category: MessageCategory.EVENT,
  type,
  payload,
});

export const encode = (message: BridgeMessage): string => {
  return JSON.stringify(message);
};

export const decode = (data: string): BridgeMessage | null => {
  try {
    const json = JSON.parse(data);
    const result = BridgeMessageSchema.safeParse(json);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

export const isRequest = (message: BridgeMessage): message is RequestMessage =>
  message.category === MessageCategory.REQUEST;

export const isResponse = (
  message: BridgeMessage
): message is ResponseMessage => message.category === MessageCategory.RESPONSE;

export const isEvent = (message: BridgeMessage): message is EventMessage =>
  message.category === MessageCategory.EVENT;
