export const updateSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          enum: ['onest:learning-experiences'],
        },
        version: {
          type: 'string',
          enum: ['1.1.0'],
        },
        action: {
          type: 'string',
          enum: ['update'],
        },
        bap_id: {
          type: 'string',
          pattern: '^onest\\.becknprotocol\\.io$',
        },
        bap_uri: {
          type: 'string',
          pattern: '^https://onest-network\\.becknprotocol\\.io/$',
        },
        bpp_id: {
          type: 'string',
          pattern: '^infosys\\.springboard\\.io$',
        },
        bpp_uri: {
          type: 'string',
          pattern: '^https://infosys\\.springboard\\.io$',
        },
        transaction_id: {
          type: 'string',
        },
        message_id: {
          type: 'string',
        },
        ttl: {
          type: 'string',
          pattern: '^PT\\d+M$',
        },
        timestamp: {
          type: 'string',
        },
      },
      required: [
        'domain',
        'version',
        'action',
        'bap_id',
        'bap_uri',
        'bpp_id',
        'bpp_uri',
        'transaction_id',
        'message_id',
        'ttl',
        'timestamp',
      ],
    },
    message: {
      type: 'object',
      properties: {
        order: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
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
                                code: {
                                  type: 'string',
                                  enum: ['COMPLETED'],
                                },
                                name: {
                                  type: 'string',
                                  enum: ['COMPLETED'],
                                },
                              },
                              // required: ['code', 'name'],
                            },
                            updated_at: {
                              type: 'string',
                            },
                          },
                          // required: ['descriptor', 'updated_at'],
                        },
                      },
                      // required: ['state'],
                    },
                  },
                },
                // required: ['id', 'fulfillments'],
              },
            },
          },
          // required: ['id', 'items'],
        },
        update_target: {
          type: 'string',
          enum: ['order.items[0].fulfillments[0].state'],
        },
      },
      required: ['order'],
    },
  },
  required: ['context', 'message'],
};
