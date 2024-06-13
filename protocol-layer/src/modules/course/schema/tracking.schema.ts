import { contextSchema } from 'src/modules/job/schema/v1/context.schema';

export const trackingSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        order_id: {
          type: 'string',
        },
      },
      required: ['order_id'],
    },
  },
  required: ['context', 'message'],
};
