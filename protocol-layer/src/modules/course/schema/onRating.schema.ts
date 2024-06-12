import { contextSchema } from './context.schema';

export const onRatingSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    context: contextSchema,
    message: {
      type: 'object',
      properties: {
        feedback_form: {
          type: 'object',
          properties: {
            form: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                },
                mime_type: {
                  type: 'string',
                },
              },
              required: ['url', 'mime_type'],
            },
            required: {
              type: 'boolean',
            },
          },
          required: ['form', 'required'],
        },
      },
      required: ['feedback_form'],
    },
  },
  required: ['context', 'message'],
};
