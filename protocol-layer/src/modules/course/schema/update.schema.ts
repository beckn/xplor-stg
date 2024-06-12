import { contextSchema } from './context.schema';

export const updateSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        update_target: { type: 'string' },
        order: {
          type: 'object',
          properties: {
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  customer: {
                    type: 'object',
                    properties: {
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                        },
                        required: ['name'],
                      },
                    },
                    required: ['person'],
                  },
                },
                required: ['customer'],
              },
            },
            id: { type: 'string' },
          },
          required: ['fulfillments', 'id'],
        },
      },
      required: ['update_target', 'order'],
    },
  },
  required: ['context', 'message'],
};
