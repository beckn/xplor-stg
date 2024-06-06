import { contextSchema } from './context.schema';

export const confirmSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'OrderConfirmation',
  description: 'Schema for an order confirmation message.',
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
                    required: ['person', 'contact'],
                  },
                },
                required: ['customer'],
              },
            },
            payments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  params: {
                    type: 'object',
                    properties: {
                      amount: { type: 'string' },
                      currency: { type: 'string' },
                    },
                    required: ['amount', 'currency'],
                  },
                  status: { type: 'string' },
                },
                required: ['params', 'status'],
              },
            },
          },
          required: ['provider', 'items', 'billing', 'payments'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
