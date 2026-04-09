export const schema = {
  type: 'object',
  properties: {
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          message: {
            type: 'string',
            maxLength: 5,
          },
          enum: {
            type: 'string',
            enum: ['foo', 'bar'],
          },
        },
      },
    },
  },
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/comments',
    },
  ],
};

export const initialData = {
  comments: [
    {
      date: '2001-09-10',
      message: 'This is an example message',
    },
    {
      date: '2026-04-09',
      message: 'Get ready for booohay',
    },
  ],
};

export type TableArrayFormData = typeof initialData;
