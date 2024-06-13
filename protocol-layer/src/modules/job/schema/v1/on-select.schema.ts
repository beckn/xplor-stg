import { contextSchema } from './context.schema';

export const onSelectSchema = {
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
                descriptor: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                  required: ['name'],
                },
                fulfillments: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      type: { type: 'string' },
                    },
                    required: ['id', 'type'],
                  },
                },
                locations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      city: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          code: { type: 'string' },
                        },
                        required: ['name', 'code'],
                      },
                      state: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          code: { type: 'string' },
                        },
                        required: ['name', 'code'],
                      },
                    },
                    required: ['id', 'city', 'state'],
                  },
                },
              },
              required: ['descriptor', 'fulfillments', 'locations'],
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
                      long_desc: { type: 'string' },
                    },
                    required: ['name', 'long_desc'],
                  },
                  fulfillment_ids: { type: 'array', items: { type: 'string' } },
                  location_ids: { type: 'array', items: { type: 'string' } },
                  time: {
                    type: 'object',
                    properties: {
                      range: {
                        type: 'object',
                        properties: {
                          start: { type: 'string', format: 'date-time' },
                          end: { type: 'string', format: 'date-time' },
                        },
                        required: ['start', 'end'],
                      },
                    },
                    required: ['range'],
                  },
                  tags: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        descriptor: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            code: { type: 'string' },
                          },
                          required: ['name'],
                        },
                        list: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              descriptor: {
                                type: 'object',
                                properties: {
                                  name: { type: 'string' },
                                  code: { type: 'string' },
                                },
                                required: ['name'],
                              },
                              value: { type: 'string' },
                            },
                            required: ['value'],
                          },
                        },
                        display: { type: 'boolean' },
                      },
                      required: ['descriptor', 'list', 'display'],
                    },
                  },
                },
                required: [
                  'id',
                  'descriptor',
                  'fulfillment_ids',
                  'location_ids',
                  'time',
                  'tags',
                ],
              },
            },
            type: { type: 'string' },
          },
          required: ['provider', 'items', 'type'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
