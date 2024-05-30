import { contextSchema } from './context.schema';

export const confirmSchema = {
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
                  fulfillment_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['id', 'fulfillment_ids'],
              },
            },
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  customer: {
                    type: 'object',
                    properties: {
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          gender: { type: 'string' },
                          age: { type: 'string' },
                          skills: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                name: { type: 'string' },
                              },
                              required: ['name'],
                            },
                          },
                          languages: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                code: { type: 'string' },
                                name: { type: 'string' },
                              },
                              required: ['code', 'name'],
                            },
                          },
                          tags: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                code: { type: 'string' },
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
                              },
                            },
                          },
                        },
                        required: [
                          'name',
                          'gender',
                          'age',
                          'skills',
                          'languages',
                          'tags',
                        ],
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
                required: ['id', 'customer'],
              },
            },
          },
          required: ['provider', 'items', 'fulfillments'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
