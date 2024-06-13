import { searchContextSchema } from './context.schema';
/**
 * This schema defines the structure for the message received when performing a search operation
 * within the course module. It includes the context and a catalog of providers, items, and
 * other relevant data that matches the search criteria.
 *
 * The `context` property provides the necessary context for the search operation, while the
 * `message` property contains the actual search results, including provider details, items,
 * and other relevant information.
 */
export const onSearchSchema = {
  type: 'object',
  properties: {
    context: searchContextSchema,
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
                  fulfillments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        type: { type: 'string' },
                      },
                      required: [],
                    },
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
                              required: [
                                'name',
                                'short_desc',
                                'long_desc',
                                'images',
                              ],
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
                        'tags',
                      ],
                    },
                  },
                },
                required: ['id', 'descriptor', 'items'],
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
