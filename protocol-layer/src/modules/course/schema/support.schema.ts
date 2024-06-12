import { contextSchema } from './context.schema';

export const supportSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        support: {
          type: 'object',
          properties: {
            order_id: { type: 'string' },
          },
          required: ['order_id'],
        },
      },
      required: ['support'],
    },
  },
  required: ['context', 'message'],
};
