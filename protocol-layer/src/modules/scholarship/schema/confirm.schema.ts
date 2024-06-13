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
            provider: {
              type: 'object',
              properties: {
                id: { type: 'string' },
              },
              required: ['id'],
            },
            billing: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                organization: {
                  type: 'object',
                  properties: {
                    descriptor: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        code: { type: 'string' },
                      },
                      required: ['name', 'code'],
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
                  required: ['descriptor', 'contact'],
                },
                address: { type: 'string' },
                phone: { type: 'string' },
              },
              required: ['name', 'organization', 'address', 'phone'],
            },
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  customer: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          age: { type: 'string' },
                          gender: { type: 'string' },
                        },
                        required: ['name', 'age', 'gender'],
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
                    required: ['id', 'person', 'contact'],
                  },
                },
                required: ['customer'],
              },
            },
            payment: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  params: {
                    type: 'object',
                    properties: {
                      bank_code: { type: 'string' },
                      bank_account_number: { type: 'string' },
                      bank_account_name: { type: 'string' },
                    },
                    required: [
                      'bank_code',
                      'bank_account_number',
                      'bank_account_name',
                    ],
                  },
                },
                required: ['params'],
              },
            },
          },
          required: ['items', 'provider', 'billing', 'fulfillments', 'payment'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
