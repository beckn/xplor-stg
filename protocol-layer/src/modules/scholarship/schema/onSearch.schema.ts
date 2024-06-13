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
                          // required: ['url'],
                        },
                      },
                    },
                    required: ['name', 'short_desc', 'images'],
                  },
                  categories: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        descriptor: {
                          type: 'object',
                          properties: {
                            code: { type: 'string' },
                            name: { type: 'string' },
                          },
                          required: ['code', 'name'],
                        },
                      },
                      required: ['id', 'descriptor'],
                    },
                  },
                  fulfillments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        tracking: { type: 'boolean' },
                      },
                      required: ['id', 'tracking'],
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
                        price: {
                          type: 'object',
                          properties: {
                            currency: { type: 'string' },
                            value: { type: 'string' },
                          },
                          required: ['currency', 'value'],
                        },
                        time: {
                          type: 'object',
                          properties: {
                            range: {
                              type: 'object',
                              properties: {
                                start: { type: 'string' },
                                end: { type: 'string' },
                              },
                              required: ['start', 'end'],
                            },
                          },
                          required: ['range'],
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
                                  short_desc: { type: 'string' },
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
                                        short_desc: { type: 'string' },
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
                        category_ids: {
                          type: 'array',
                          items: { type: 'string' },
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
                        'price',
                        'time',
                        'rateable',
                        'tags',
                        'category_ids',
                        'location_ids',
                        'fulfillment_ids',
                      ],
                    },
                  },
                  rateable: { type: 'boolean' },
                },
                required: [
                  'id',
                  'descriptor',
                  'categories',
                  'fulfillments',
                  'locations',
                  'items',
                  'rateable',
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
