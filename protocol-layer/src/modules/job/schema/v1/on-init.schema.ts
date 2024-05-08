import { contextSchema } from 'src/modules/scholarship/schema/context.schema';

export const OnInitSchema = {
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
                  fulfillment_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  location_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
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
                          email: { type: 'string', format: 'email' },
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
            type: { type: 'string' },
          },
          required: ['provider', 'items', 'fulfillments', 'type'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
