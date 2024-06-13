import { contextSchema } from './context.schema';

export const onStatusSchema = {
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
                        },
                      },
                    },
                  },
                },
                rateable: { type: 'boolean' },
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
                  },
                  price: {
                    type: 'object',
                    properties: {
                      currency: { type: 'string' },
                      value: { type: 'string' },
                    },
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
                              },
                              value: { type: 'string' },
                              display: { type: 'boolean' },
                            },
                          },
                        },
                      },
                    },
                  },
                  fulfillment_ids: { type: 'array', items: { type: 'string' } },
                },
              },
            },
            billing: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                organization: {
                  type: 'object',
                  properties: {
                    descriptor: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        code: { type: 'string' },
                      },
                    },
                    contact: {
                      type: 'object',
                      properties: {
                        phone: { type: 'string' },
                        email: { type: 'string' },
                      },
                    },
                  },
                },
                address: { type: 'string' },
                phone: { type: 'string' },
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
                      },
                      updated_at: { type: 'string' },
                    },
                  },
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
                      },
                      contact: {
                        type: 'object',
                        properties: {
                          email: { type: 'string' },
                        },
                      },
                    },
                  },
                  customer: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      person: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          age: { type: 'string' },
                          gender: { type: 'string' },
                        },
                      },
                      contact: {
                        type: 'object',
                        properties: {
                          phone: { type: 'string' },
                          email: { type: 'string' },
                        },
                      },
                    },
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
                        },
                      },
                    },
                  },
                },
              },
            },
            cancellation_terms: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  cancellation_fee: {
                    type: 'object',
                    properties: {
                      amount: {
                        type: 'object',
                        properties: {
                          currency: { type: 'string' },
                          value: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
            docs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  descriptor: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      short_desc: { type: 'string' },
                    },
                  },
                  url: { type: 'string' },
                  mime_type: { type: 'string' },
                },
              },
            },
            payments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  params: {
                    type: 'object',
                    properties: {
                      bank_code: { type: 'string' },
                      bank_account_number: { type: 'string' },
                      bank_account_name: { type: 'string' },
                    },
                  },
                },
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
                      },
                    },
                  },
                },
              },
            },
          },
          required: ['id', 'provider', 'items'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
