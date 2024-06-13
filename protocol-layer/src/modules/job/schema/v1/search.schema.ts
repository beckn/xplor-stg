import { searchContextSchema } from './context.schema';

export const searchSchema = {
  type: 'object',
  properties: {
    context: searchContextSchema,
    message: {
      type: 'object',
      properties: {
        intent: {
          type: 'object',
          properties: {
            item: {
              type: 'object',
              properties: {
                descriptor: {
                  type: 'object',
                  properties: {
                    code: { type: 'string' },
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
              },
              required: ['descriptor'],
            },
          },
          required: ['item'],
        },
      },
      required: ['intent'],
    },
  },
  required: ['context', 'message'],
};
