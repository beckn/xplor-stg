import { contextSchema } from './context.schema';

export const ratingSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        ratings: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            rating_category: {
              type: 'string',
            },
            value: {
              type: 'string',
              pattern: '^\\d+$',
            },
          },
          required: ['id', 'rating_category', 'value'],
        },
      },
      required: ['ratings'],
    },
  },
  required: ['context', 'message'],
};
