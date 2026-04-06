import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { mantineRenderers, mantineCells } from './mantine-renderers';
import { Container, Title, Card, Stack, Button, Group, Tabs, Slider } from '@mantine/core';
import { schema as basicSchema, uischema as basicUischema, initialData as basicInitialData, type BasicFormData } from './examples/basic';
import { schema as complexSchema, uischema as complexUischema, initialData as complexInitialData, type ComplexFormData } from './examples/complex';
import { schema as allTypesSchema, uischema as allTypesUischema, initialData as allTypesInitialData, type AllTypesFormData } from './examples/allTypes';
import { schema as optionsSchema, uischema as optionsUischema, initialData as optionsInitialData, type OptionsFormData } from './examples/options';

function App() {
  const [basicData, setBasicData] = useState<BasicFormData>(basicInitialData);
  const [complexData, setComplexData] = useState<ComplexFormData>(complexInitialData);
  const [allTypesData, setAllTypesData] = useState<AllTypesFormData>(allTypesInitialData);
  const [optionsData, setOptionsData] = useState<OptionsFormData>(optionsInitialData);

  return (
    <Container size="sm" py="xl" fluid>
      <Stack gap="xl">
        <Title order={2}>JSON Forms + Mantine POC</Title>
        <Tabs defaultValue="allTypes">
          <Tabs.List>
            <Tabs.Tab value="allTypes">All Types Example</Tabs.Tab>
            <Tabs.Tab value="complex">Complex Example</Tabs.Tab>
            <Tabs.Tab value="basic">Basic Example</Tabs.Tab>
            <Tabs.Tab value="options">Options Example</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="allTypes" pt="md">
            <Card shadow="sm" padding="lg">
              <JsonForms
                schema={allTypesSchema}
                uischema={allTypesUischema}
                data={allTypesData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setAllTypesData(data)}
              />
            </Card>
            <Card shadow="sm" padding="lg" mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(allTypesData, null, 2)}</pre>
            </Card>
            <Group mt="md">
              <Button onClick={() => setAllTypesData(allTypesInitialData)}>Reset</Button>
              <Button onClick={() => setAllTypesData({} as AllTypesFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
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
              <Button onClick={() => setComplexData({} as ComplexFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value="basic" pt="md">
            <Card shadow="sm" padding="lg">
              <JsonForms
                schema={basicSchema}
                uischema={basicUischema}
                data={basicData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setBasicData(data)}
              />
            </Card>
            <Card shadow="sm" padding="lg" mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(basicData, null, 2)}</pre>
            </Card>
            <Group mt="md">
              <Button onClick={() => setBasicData(basicInitialData)}>Reset</Button>
              <Button onClick={() => setBasicData({} as BasicFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value="options" pt="md">
            <Card shadow="sm" padding="lg">
              <JsonForms
                schema={optionsSchema}
                uischema={optionsUischema}
                data={optionsData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setOptionsData(data)}
              />

            </Card>
            <Card shadow="sm" padding="lg" mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(optionsData, null, 2)}</pre>
            </Card>
            <Group mt="md">
              <Button onClick={() => setOptionsData(optionsInitialData)}>Reset</Button>
              <Button onClick={() => setOptionsData({} as OptionsFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default App;
