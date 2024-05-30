import { searchContextSchema } from './context.schema';
/**
 * This schema defines the structure for the message received when the course module is initialized.
 * It includes detailed information about the order, including provider details, items,
 * billing information, fulfillments, and other relevant data necessary for the initialization
 * process.
 *
 * The `context` property provides the necessary context for the initialization, while the
 * `message` property contains the actual data payload for the initialization.
 */

export const onInitSchema = {
  type: 'object',
  properties: {
    context: searchContextSchema,
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
                          size_type: { type: 'string' },
                        },
                        required: ['url', 'size_type'],
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
                          count: { type: 'integer' },
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
                  fulfillment_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  rating: { type: 'string' },
                  rateable: { type: 'boolean' },
                  xinput: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      head: {
                        type: 'object',
                        properties: {
                          descriptor: {
                            type: 'object',
                            properties: { name: { type: 'string' } },
                            required: ['name'],
                          },
                          index: {
                            type: 'object',
                            properties: {
                              min: { type: 'integer' },
                              cur: { type: 'integer' },
                              max: { type: 'integer' },
                            },
                            required: ['min', 'cur', 'max'],
                          },
                          headings: {
                            type: 'array',
                            items: { type: 'string' },
                          },
                        },
                        required: ['descriptor', 'index', 'headings'],
                      },
                      form: {
                        type: 'object',
                        properties: {
                          mime_type: { type: 'string' },
                          url: { type: 'string' },
                          resubmit: { type: 'boolean' },
                        },
                        required: ['mime_type', 'url', 'resubmit'],
                      },
                    },
                    required: ['required', 'head', 'form'],
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
                  'fulfillment_ids',
                  'rating',
                  'rateable',
                  'xinput',
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
                  agent: {
                    type: 'object',
                    properties: {
                      person: {
                        type: 'object',
                        properties: { name: { type: 'string' } },
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
                        required: ['name', 'age', 'gender', 'tags'],
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
                required: ['id', 'type', 'agent', 'customer'],
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
                  url: { type: 'string' },
                  type: { type: 'string' },
                  status: { type: 'string' },
                  collected_by: { type: 'string' },
                },
                required: ['params', 'url', 'type', 'status', 'collected_by'],
              },
            },
          },
          required: [
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
  required: ['message'],
};
