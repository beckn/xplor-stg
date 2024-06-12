import { contextSchema } from './context.schema';

export const cancelSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        order_id: {
          type: 'string',
        },
        cancellation_reason_id: {
          type: 'string',
        },
        descriptor: {
          type: 'object',
          properties: {
            short_desc: {
              type: 'string',
            },
          },
          required: ['short_desc'],
        },
      },
      required: ['order_id', 'cancellation_reason_id', 'descriptor'],
    },
  },
  required: ['context', 'message'],
};
