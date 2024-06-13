import { contextSchema } from './context.schema';

export const onSearchSchema = {
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        catalog: {
          type: 'object',
          properties: {
            descriptor: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
              required: ['name'],
            },
            payments: { type: 'array' },
            providers: {
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
                      images: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            url: { type: 'string' },
                          },
                          required: ['url'],
                        },
                      },
                    },
                    required: ['name', 'short_desc', 'images'],
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
                        location_ids: {
                          type: 'array',
                          items: { type: 'string' },
                        },
                        fulfillment_ids: {
                          type: 'array',
                          items: { type: 'string' },
                        },
                      },
                      required: [
                        'id',
                        'descriptor',
                        'location_ids',
                        'fulfillment_ids',
                      ],
                    },
                  },
                },
                required: [
                  'id',
                  'descriptor',
                  'fulfillments',
                  'locations',
                  'items',
                ],
              },
            },
          },
          required: ['descriptor', 'providers'],
        },
      },
      required: ['catalog'],
    },
  },
  required: ['context', 'message'],
};
