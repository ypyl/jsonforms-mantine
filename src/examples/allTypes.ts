export const schema = {
  type: 'object',
  properties: {
    string: {
      type: 'string',
    },
    boolean: {
      type: 'boolean',
      description: 'Boolean description as a tooltip',
    },
    number: {
      type: 'number',
    },
    integer: {
      type: 'integer',
    },
    date: {
      type: 'string',
      format: 'date',
    },
    time: {
      type: 'string',
      format: 'time',
    },
    dateTime: {
      type: 'string',
      format: 'date-time',
    },
    enum: {
      type: 'string',
      enum: ['One', 'Two', 'Three'],
    },
  },
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/string',
    },
    {
      type: 'Control',
      scope: '#/properties/boolean',
    },
    {
      type: 'Control',
      scope: '#/properties/number',
    },
    {
      type: 'Control',
      scope: '#/properties/integer',
    },
    {
      type: 'Control',
      scope: '#/properties/date',
    },
    {
      type: 'Control',
      scope: '#/properties/time',
    },
    {
      type: 'Control',
      scope: '#/properties/dateTime',
    },
    {
      type: 'Control',
      scope: '#/properties/enum',
    },
  ],
};

export const initialData = {
  string: 'This is a string',
  boolean: true,
  number: 50.5,
  integer: 50,
  date: '2020-06-25',
  time: '23:08:00',
  dateTime: '2020-06-25T23:08:42+02:00',
  enum: 'Two',
};

export type AllTypesFormData = typeof initialData;
