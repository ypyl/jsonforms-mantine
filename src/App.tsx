import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { mantineRenderers, mantineCells } from './mantine-renderers';
import { Container, Title, Card, Stack, Button, Group, Tabs } from '@mantine/core';

const schema = {
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

  return (
    <Container size="sm" py="xl" fluid>
      <Stack gap="xl">
        <Title order={2}>JSON Forms + Mantine POC</Title>
        <Tabs defaultValue="basic">
          <Tabs.List>
            <Tabs.Tab value="basic">Basic Example</Tabs.Tab>
          </Tabs.List>
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
