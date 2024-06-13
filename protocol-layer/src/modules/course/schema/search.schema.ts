import { searchContextSchema } from './context.schema';

/**
 * This schema defines the structure for the message received when performing a search operation
 * within the course module. It includes the context and a catalog of providers, items, and
 * other relevant data that matches the search criteria.
 *
 * The `context` property provides the necessary context for the search operation, while the
 * `message` property contains the actual search results, including provider details, items,
 * and other relevant information.
 */
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
          },
        },
      },
    },
  },
  additionalProperties: false,
};
