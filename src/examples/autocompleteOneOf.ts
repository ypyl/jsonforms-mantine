export const schema = {
  type: 'object',
  properties: {
    autocompleteOneOf: {
      type: 'string',
      oneOf: [
        {
          const: 'foo',
          title: 'Foo',
        },
        {
          const: 'bar',
          title: 'Bar',
        },
        {
          const: 'foobar',
          title: 'FooBar',
        },
      ],
    },
  },
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/autocompleteOneOf',
      options: {
        autocomplete: true,
      },
    },
  ],
};

export const initialData = {};

export type AutocompleteOneOfFormData = typeof initialData;
