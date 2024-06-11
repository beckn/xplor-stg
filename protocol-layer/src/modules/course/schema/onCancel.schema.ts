import { contextSchema } from './context.schema';

export const onCancelSchema = {
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
            id: { type: 'string' },
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
                          size_type: { type: 'string' },
                        },
                        required: ['url'],
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
              },
              required: ['id', 'descriptor', 'categories'],
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  quantity: {
                    type: 'object',
                    properties: {
                      maximum: {
                        type: 'object',
                        properties: {
                          count: { type: 'number' },
                        },
                        required: ['count'],
                      },
                    },
                    required: ['maximum'],
                  },
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      short_desc: { type: 'string' },
                      long_desc: { type: 'string' },
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
                      media: {
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
                    required: [
                      'name',
                      'short_desc',
                      'long_desc',
                      'images',
                      'media',
                    ],
                  },
                  creator: {
                    type: 'object',
                    properties: {
                      descriptor: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          short_desc: { type: 'string' },
                          long_desc: { type: 'string' },
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
                        required: ['name', 'short_desc', 'long_desc', 'images'],
                      },
                    },
                    required: ['descriptor'],
                  },
                  price: {
                    type: 'object',
                    properties: {
                      currency: { type: 'string' },
                      value: { type: 'string' },
                    },
                    required: ['currency', 'value'],
                  },
                  category_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  rating: { type: 'string' },
                  rateable: { type: 'boolean' },
                  'add-ons': {
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
                            media: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  mimetype: { type: 'string' },
                                  url: { type: 'string' },
                                },
                                required: ['mimetype', 'url'],
                              },
                            },
                          },
                          required: ['name', 'long_desc', 'media'],
                        },
                      },
                      required: ['id', 'descriptor'],
                    },
                  },
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
                required: [
                  'id',
                  'quantity',
                  'descriptor',
                  'creator',
                  'price',
                  'category_ids',
                  'rating',
                  'rateable',
                  'add-ons',
                  'tags',
                ],
              },
            },
            fulfillments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  state: {
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
                      updated_at: { type: 'string' },
                    },
                    required: ['descriptor', 'updated_at'],
                  },
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
                  stops: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        instructions: {
                          type: 'object',
                          properties: {
                            name: { type: 'string' },
                            long_desc: { type: 'string' },
                            media: {
                              type: 'array',
                              items: {
                                type: 'object',
                                properties: {
                                  mimetype: { type: 'string' },
                                  url: { type: 'string' },
                                },
                                required: ['mimetype', 'url'],
                              },
                            },
                          },
                          required: ['name', 'long_desc', 'media'],
                        },
                      },
                      required: ['id', 'instructions'],
                    },
                  },
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
                required: ['state', 'agent', 'customer', 'stops', 'tags'],
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
              },
              required: ['price'],
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
                  type: { type: 'string' },
                  status: { type: 'string' },
                  collected_by: { type: 'string' },
                },
                required: ['params', 'type', 'status', 'collected_by'],
              },
            },
          },
          required: [
            'id',
            'provider',
            'items',
            'fulfillments',
            'quote',
            'billing',
            'payments',
          ],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
