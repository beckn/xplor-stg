import { contextSchema } from './context.schema';

export const onInitSchema = {
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
            type: { type: 'string' },
            provider: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                descriptor: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    short_desc: { type: 'string' },
                  },
                  required: ['name', 'short_desc'],
                },
                rateable: { type: 'boolean' },
              },
              required: ['id', 'descriptor', 'rateable'],
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      short_desc: { type: 'string' },
                    },
                    required: ['name', 'short_desc'],
                  },
                  price: {
                    type: 'object',
                    properties: {
                      currency: { type: 'string' },
                      value: { type: 'string' },
                    },
                    required: ['currency', 'value'],
                  },
                  xinput: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      form: {
                        type: 'object',
                        properties: {
                          url: { type: 'string' },
                          data: { type: 'object' },
                          mime_type: { type: 'string' },
                          submission_id: { type: 'string' },
                        },
                        required: ['url', 'data', 'mime_type', 'submission_id'],
                      },
                    },
                    required: ['required', 'form'],
                  },
                  rateable: { type: 'boolean' },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        display: { type: 'boolean' },
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
                              display: { type: 'boolean' },
                            },
                            required: ['descriptor', 'value', 'display'],
                          },
                        },
                      },
                      required: ['display', 'descriptor', 'list'],
                    },
                  },
                  category_ids: { type: 'array', items: { type: 'string' } },
                },
                required: [
                  'id',
                  'descriptor',
                  'price',
                  'xinput',
                  'rateable',
                  'tags',
                ],
              },
            },
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  type: { type: 'string' },
                  tracking: { type: 'boolean' },
                  customer: {
                    type: 'object',
                    properties: {
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          gender: { type: 'string' },
                        },
                        required: ['name', 'gender'],
                      },
                    },
                    required: ['person'],
                  },
                  contact: {
                    type: 'object',
                    properties: {
                      phone: { type: 'string' },
                      email: { type: 'string' },
                    },
                    required: ['phone', 'email'],
                  },
                  stops: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        type: { type: 'string' },
                        time: {
                          type: 'object',
                          properties: {
                            timestamp: { type: 'string' },
                          },
                          required: ['timestamp'],
                        },
                      },
                      required: ['type', 'time'],
                    },
                  },
                },
                required: [
                  'id',
                  'type',
                  'tracking',
                  'customer',
                  'contact',
                  'stops',
                ],
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
