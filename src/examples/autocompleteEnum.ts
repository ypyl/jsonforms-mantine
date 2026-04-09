export const schema = {
  type: 'object',
  properties: {
    autocompleteEnum: {
      type: 'string',
      enum: ['foo', 'bar', 'foobar'],
    },
  },
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/autocompleteEnum',
      options: {
        autocomplete: true,
      },
    },
  ],
};

export const initialData = {};

export type AutocompleteEnumFormData = typeof initialData;
