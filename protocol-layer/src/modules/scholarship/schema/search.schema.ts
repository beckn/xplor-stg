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
                    name: { type: 'string' },
                  },
                },
              },
            },
            fulfillment: {
              type: 'object',
              properties: {
                customer: {
                  type: 'object',
                  properties: {
                    person: {
                      type: 'object',
                      properties: {
                        gender: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};
