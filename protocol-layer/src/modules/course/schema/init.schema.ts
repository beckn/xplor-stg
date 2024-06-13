import { contextSchema } from './context.schema';
/**
 * This schema defines the structure for the initialization message of the course module.
 * It includes the context and message properties, which are required for the application
 * to process and route messages correctly during the initialization phase.
 *
 * The `context` property is an object that adheres to the `searchContextSchema`, providing
 * necessary context information for the initialization process.
 *
 * The `message` property is an object that contains details about the order, including
 * provider, items, billing, and fulfillments information.
 */
export const initSchema = {
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
            billing: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                phone: { type: 'string' },
                email: { type: 'string' },
                address: { type: 'string' },
              },
              required: ['name', 'phone', 'email', 'address'],
            },
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
                          age: { type: 'string' },
                          gender: { type: 'string' },
                          tags: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                descriptor: {
                                  type: 'object',
                                  properties: {
                                    code: { type: 'string' },
                                    name: { type: 'string' },
                                  },
                                  required: ['code', 'name'],
                                },
                                list: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      descriptor: {
                                        type: 'object',
                                        properties: {
                                          code: { type: 'string' },
                                          name: { type: 'string' },
                                        },
                                        required: ['code', 'name'],
                                      },
                                      value: { type: 'string' },
                                    },
                                    required: ['descriptor', 'value'],
                                  },
                                },
                                display: { type: 'boolean' },
                              },
                              required: ['descriptor', 'list', 'display'],
                            },
                          },
                        },
                        required: ['name', 'age', 'gender', 'tags'],
                      },
                      contact: {
                        type: 'object',
                        properties: {
                          phone: { type: 'string' },
                          email: { type: 'string' },
                        },
                        required: ['phone', 'email'],
                      },
                    },
                    required: ['person', 'contact'],
                  },
                },
              },
            },
          },
          required: ['provider', 'items', 'billing', 'fulfillments'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
