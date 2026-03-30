import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { mantineRenderers, mantineCells } from './mantine-renderers';
import { Container, Title, Card, Stack, Button, Group } from '@mantine/core';

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
  ],
};

const initialData = {
  name: 'John Doe',
  age: 30,
  active: true,
  status: 'Active',
};

type FormData = typeof initialData;

function App() {
  const [data, setData] = useState<FormData>(initialData);

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={2}>JSON Forms + Mantine POC</Title>
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
        <Card shadow="sm" padding="lg">
          <Title order={4}>Current Data</Title>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Card>
        <Group>
          <Button onClick={() => setData(initialData)}>Reset</Button>
          <Button onClick={() => setData({} as FormData)} variant="outline">Clear</Button>
        </Group>
      </Stack>
    </Container>
  );
}

export default App;
