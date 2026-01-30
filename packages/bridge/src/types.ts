import { z } from 'zod';

export const MessageCategory = {
  REQUEST: 'REQUEST',
  RESPONSE: 'RESPONSE',
  EVENT: 'EVENT',
} as const;

export type MessageCategoryValue =
  (typeof MessageCategory)[keyof typeof MessageCategory];

const BaseMessageSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
});

export const RequestMessageSchema = BaseMessageSchema.extend({
  category: z.literal(MessageCategory.REQUEST),
  type: z.string(),
  payload: z.unknown().optional(),
});

export const ResponseMessageSchema = BaseMessageSchema.extend({
  category: z.literal(MessageCategory.RESPONSE),
  requestId: z.string(),
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});

export const EventMessageSchema = BaseMessageSchema.extend({
  category: z.literal(MessageCategory.EVENT),
  type: z.string(),
  payload: z.unknown().optional(),
});

export const BridgeMessageSchema = z.discriminatedUnion('category', [
  RequestMessageSchema,
  ResponseMessageSchema,
  EventMessageSchema,
]);

export type RequestMessage = z.infer<typeof RequestMessageSchema>;
export type ResponseMessage = z.infer<typeof ResponseMessageSchema>;
export type EventMessage = z.infer<typeof EventMessageSchema>;
export type BridgeMessage = z.infer<typeof BridgeMessageSchema>;

export type RequestHandler<TPayload = unknown, TResponse = unknown> = (
  payload: TPayload,
  message: RequestMessage
) => TResponse | Promise<TResponse>;

export type EventHandler<TPayload = unknown> = (
  payload: TPayload,
  message: EventMessage
) => void;
