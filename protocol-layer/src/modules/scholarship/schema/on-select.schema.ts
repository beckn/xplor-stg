import { contextSchema } from './context.schema';

export const onSelectSchema = {
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
                locations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      city: { type: 'string' },
                      state: { type: 'string' },
                    },
                    required: ['id', 'city', 'state'],
                  },
                },
                rateable: { type: 'boolean' },
              },
              required: ['id', 'descriptor', 'locations', 'rateable'],
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
                  time: {
                    type: 'object',
                    properties: {
                      label: { type: 'string' },
                      range: {
                        type: 'object',
                        properties: {
                          start: { type: 'string' },
                          end: { type: 'string' },
                        },
                        required: ['start', 'end'],
                      },
                    },
                    required: ['label', 'range'],
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
                              value: { type: 'string' },
                            },
                            required: ['value'],
                          },
                        },
                      },
                      required: ['display', 'descriptor', 'list'],
                    },
                  },
                  location_ids: { type: 'array', items: { type: 'string' } },
                  category_ids: { type: 'array', items: { type: 'string' } },
                },
                required: [
                  'id',
                  'descriptor',
                  'price',
                  'time',
                  'rateable',
                  'tags',
                  'location_ids',
                  'category_ids',
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
                  agent: {
                    type: 'object',
                    properties: {
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                        },
                        required: ['name'],
                      },
                      contact: {
                        type: 'object',
                        properties: {
                          email: { type: 'string' },
                        },
                        required: ['email'],
                      },
                    },
                    required: ['person', 'contact'],
                  },
                },
                required: ['id', 'type', 'tracking', 'agent'],
              },
            },
            quote: {
              type: 'object',
              properties: {
                price: {
                  type: 'object',
                  properties: {
                    currency: { type: 'string' },
                    value: { type: 'string' },
                  },
                  required: ['currency', 'value'],
                },
                breakup: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      title: { type: 'string' },
                      price: {
                        type: 'object',
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'string' },
                        },
                        required: ['currency', 'value'],
                      },
                    },
                    required: ['title', 'price'],
                  },
                },
              },
              required: ['price', 'breakup'],
            },
          },
          required: ['order'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
