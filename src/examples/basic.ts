export const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      minLength: 1,
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0,
    },
    active: {
      type: 'boolean',
      title: 'Active',
    },
    status: {
      type: 'string',
      title: 'Status',
      enum: ['Pending', 'Active', 'Completed'],
    },
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
  required: ['name'],
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/age',
    },
    {
      type: 'Control',
      scope: '#/properties/active',
    },
    {
      type: 'Control',
      scope: '#/properties/status',
    },
    {
      type: 'Control',
      scope: '#/properties/comments',
    },
  ],
};

export const initialData = {
  name: 'John Doe',
  age: 30,
  active: true,
  status: 'Active',
  comments: [
    { date: '2024-01-15', message: 'Hello', enum: 'foo' },
    { date: '2024-01-16', message: 'World', enum: 'bar' },
  ],
};

export type BasicFormData = typeof initialData;
