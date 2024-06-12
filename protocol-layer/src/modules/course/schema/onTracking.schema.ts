import { contextSchema } from './context.schema';

export const onTrackingSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        tracking: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            url: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          required: ['id', 'url', 'status'],
        },
      },
      required: ['tracking'],
    },
  },
  required: ['context', 'message'],
};
