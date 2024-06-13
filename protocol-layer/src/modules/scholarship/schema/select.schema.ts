import { contextSchema } from './context.schema';

/**
 * This schema defines the structure for the message received when a selection is made within the course module.
 * It includes the context and a catalog of providers, items, and other relevant data that matches the selection criteria.
 *
 * The `context` property provides the necessary context for the selection process, while the
 * `message` property contains the actual search results, including provider details, items, and other relevant information.
 */
export const selectSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
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
