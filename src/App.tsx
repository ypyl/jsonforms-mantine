import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { mantineRenderers, mantineCells } from './mantine-renderers';
import { Container, Title, Card, Stack, Button, Group, Tabs } from '@mantine/core';

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name2',
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

const uischema = {
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

const initialData = {
  name: 'John Doe',
  age: 30,
  active: true,
  status: 'Active',
  comments: [
    { date: '2024-01-15', message: 'Hello', enum: 'foo' },
    { date: '2024-01-16', message: 'World', enum: 'bar' },
  ],
};

type FormData = typeof initialData;

function App() {
  const [data, setData] = useState<FormData>(initialData);

  const complexSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        description: 'Please enter your name',
      },
      vegetarian: {
        type: 'boolean',
      },
      birthDate: {
        type: 'string',
        format: 'date',
      },
      nationality: {
        type: 'string',
        enum: ['DE', 'IT', 'JP', 'US', 'RU', 'Other'],
      },
      personalData: {
        type: 'object',
        properties: {
          age: {
            type: 'integer',
            description: 'Please enter your age.',
          },
          height: {
            type: 'number',
          },
          drivingSkill: {
            type: 'number',
            maximum: 10,
            minimum: 1,
            default: 7,
          },
        },
        required: ['age', 'height'],
      },
      occupation: {
        type: 'string',
      },
      postalCode: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['occupation', 'nationality'],
  };

  const complexUischema = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/name',
          },
          {
            type: 'Control',
            scope: '#/properties/personalData/properties/age',
          },
          {
            type: 'Control',
            scope: '#/properties/birthDate',
          },
        ],
      },
      {
        type: 'Label',
        text: 'Additional Information',
      },
      {
        type: 'HorizontalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/personalData/properties/height',
          },
          {
            type: 'Control',
            scope: '#/properties/nationality',
          },
          {
            type: 'Control',
            scope: '#/properties/occupation',
            options: {
              suggestion: [
                'Accountant',
                'Engineer',
                'Freelancer',
                'Journalism',
                'Physician',
                'Student',
                'Teacher',
                'Other',
              ],
            },
          },
        ],
      },
    ],
  };

  const complexInitialData = {
    name: 'John Doe',
    vegetarian: false,
    birthDate: '1985-06-02',
    personalData: {
      age: 34,
    },
    postalCode: '12345',
  };

  const [complexData, setComplexData] = useState(complexInitialData);

  return (
    <Container size="sm" py="xl" fluid>
      <Stack gap="xl">
        <Title order={2}>JSON Forms + Mantine POC</Title>
        <Tabs defaultValue="complex">
          <Tabs.List>
            <Tabs.Tab value="complex">Complex Example</Tabs.Tab>
            <Tabs.Tab value="basic">Basic Example</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="complex" pt="md">
            <Card shadow="sm" padding="lg">
              <JsonForms
                schema={complexSchema}
                uischema={complexUischema}
                data={complexData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setComplexData(data)}
              />
            </Card>
            <Card shadow="sm" padding="lg" mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(complexData, null, 2)}</pre>
            </Card>
            <Group mt="md">
              <Button onClick={() => setComplexData(complexInitialData)}>Reset</Button>
              <Button onClick={() => setComplexData({})} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value="basic" pt="md">
            <Card shadow="sm" padding="lg">
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setData(data)}
              />
            </Card>
            <Card shadow="sm" padding="lg" mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </Card>
            <Group mt="md">
              <Button onClick={() => setData(initialData)}>Reset</Button>
              <Button onClick={() => setData({} as FormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default App;
