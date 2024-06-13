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
            'bpp/fulfillments': {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  type: {
                    type: 'string',
                  },
                },
                required: ['id', 'type'],
              },
            },
            'bpp/descriptor': {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
                symbol: {
                  type: 'string',
                },
                short_desc: {
                  type: 'string',
                },
                long_desc: {
                  type: 'string',
                },
                images: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                tags: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      code: {
                        type: 'string',
                      },
                      list: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            code: {
                              type: 'string',
                            },
                            value: {
                              type: 'string',
                            },
                          },
                          required: ['code', 'value'],
                        },
                      },
                    },
                    required: ['code', 'list'],
                  },
                },
              },
              required: [
                'name',
                'symbol',
                'short_desc',
                'long_desc',
                'images',
                'tags',
              ],
            },
            'bpp/providers': {
              type: 'array',
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  time: {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'string',
                      },
                      timestamp: {
                        type: 'string',
                      },
                    },
                    required: ['label', 'timestamp'],
                  },
                  fulfillments: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                        },
                        type: {
                          type: 'string',
                        },
                        contact: {
                          type: 'object',
                          properties: {
                            phone: {
                              type: 'string',
                            },
                            email: {
                              type: 'string',
                            },
                          },
                          required: ['phone', 'email'],
                        },
                      },
                      required: ['id', 'type', 'contact'],
                    },
                  },
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: {
                        type: 'string',
                      },
                      symbol: {
                        type: 'string',
                      },
                      short_desc: {
                        type: 'string',
                      },
                      long_desc: {
                        type: 'string',
                      },
                      images: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                      },
                    },
                    required: [
                      'name',
                      'symbol',
                      'short_desc',
                      'long_desc',
                      'images',
                    ],
                  },
                  items: {
                    type: 'array',
                    minItems: 1,
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                        },
                        time: {
                          type: 'object',
                          properties: {
                            label: {
                              type: 'string',
                            },
                            timestamp: {
                              type: 'string',
                            },
                          },
                          required: ['label', 'timestamp'],
                        },
                        parent_item_id: {
                          type: 'string',
                        },
                        descriptor: {
                          type: 'object',
                          properties: {
                            name: {
                              type: 'string',
                            },
                            short_desc: {
                              type: 'string',
                            },
                            long_desc: {
                              type: 'string',
                            },
                            images: {
                              type: 'array',
                              items: {
                                type: 'string',
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
                        quantity: {
                          type: 'object',
                          properties: {
                            unitized: {
                              type: 'object',
                              properties: {
                                measure: {
                                  type: 'object',
                                  properties: {
                                    unit: {
                                      type: 'string',
                                    },
                                    value: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['unit', 'value'],
                                },
                              },
                              required: ['measure'],
                            },
                            available: {
                              type: 'object',
                              properties: {
                                count: {
                                  type: 'string',
                                },
                              },
                              required: ['count'],
                            },
                            maximum: {
                              type: 'object',
                              properties: {
                                count: {
                                  type: 'string',
                                },
                              },
                              required: ['count'],
                            },
                          },
                          required: ['unitized', 'available', 'maximum'],
                        },
                        category_id: {
                          type: 'string',
                        },
                        location_id: {
                          type: 'string',
                        },
                        fulfillment_id: {
                          type: 'string',
                        },
                        price: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                            },
                            value: {
                              type: 'string',
                            },
                            maximum_value: {
                              type: 'string',
                            },
                          },
                          required: ['currency', 'value'],
                        },
                        '@ondc/org/returnable': {
                          type: 'boolean',
                        },
                        '@ondc/org/cancellable': {
                          type: 'boolean',
                        },
                        '@ondc/org/return_window': {
                          type: 'string',
                        },
                        '@ondc/org/seller_pickup_return': {
                          type: 'boolean',
                        },
                        '@ondc/org/time_to_ship': {
                          type: 'string',
                        },
                        '@ondc/org/available_on_cod': {
                          type: 'boolean',
                        },
                        '@ondc/org/contact_details_consumer_care': {
                          type: 'string',
                        },
                        tags: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              code: {
                                type: 'string',
                              },
                              list: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    code: {
                                      type: 'string',
                                    },
                                    value: {
                                      type: 'string',
                                    },
                                  },
                                  required: ['code', 'value'],
                                },
                              },
                            },
                            required: ['code', 'list'],
                          },
                        },
                      },
                      required: [
                        'id',
                        'time',
                        'parent_item_id',
                        'descriptor',
                        'quantity',
                        'category_id',
                        'location_id',
                        'fulfillment_id',
                        'price',
                        '@ondc/org/returnable',
                        '@ondc/org/cancellable',
                        '@ondc/org/return_window',
                        '@ondc/org/seller_pickup_return',
                        '@ondc/org/time_to_ship',
                        '@ondc/org/available_on_cod',
                        '@ondc/org/contact_details_consumer_care',
                        'tags',
                      ],
                    },
                  },
                },
                required: ['id', 'time', 'fulfillments', 'descriptor', 'items'],
              },
            },
          },
          required: ['bpp/fulfillments', 'bpp/descriptor', 'bpp/providers'],
        },
      },
      required: ['message'],
    },
  },
  additionalProperties: true,
};
