import { contextSchema } from '../../../scholarship/schema/context.schema';

export const selectSchema = {
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          properties: {
            provider: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
              required: ['id'],
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                },
                required: ['id'],
              },
            },
          },
          required: ['provider', 'items'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
