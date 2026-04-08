import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { mantineRenderers, mantineCells } from './mantine-renderers';
import { Container, Title, Box, Stack, Button, Group, Tabs } from '@mantine/core';
import { schema as basicSchema, uischema as basicUischema, initialData as basicInitialData, type BasicFormData } from './examples/basic';
import { schema as complexSchema, uischema as complexUischema, initialData as complexInitialData, type ComplexFormData } from './examples/complex';
import { schema as allTypesSchema, uischema as allTypesUischema, initialData as allTypesInitialData, type AllTypesFormData } from './examples/allTypes';
import { schema as optionsSchema, uischema as optionsUischema, initialData as optionsInitialData, type OptionsFormData } from './examples/options';
import { schema as categorizationSchema, uischema as categorizationUischema, initialData as categorizationInitialData, type CategorizationFormData } from './examples/categorization';
import { schema as categorizationStepperSchema, uischema as categorizationStepperUischema, initialData as categorizationStepperInitialData, type CategorizationStepperFormData } from './examples/categorizationStepper';
import { schema as horizontalLayoutSchema, uischema as horizontalLayoutUischema, initialData as horizontalLayoutInitialData, type HorizontalLayoutFormData } from './examples/horizontalLayout';
import { schema as verticalLayoutSchema, uischema as verticalLayoutUischema, initialData as verticalLayoutInitialData, type VerticalLayoutFormData } from './examples/verticalLayout';

function App() {
  const [basicData, setBasicData] = useState<BasicFormData>(basicInitialData);
  const [complexData, setComplexData] = useState<ComplexFormData>(complexInitialData);
  const [allTypesData, setAllTypesData] = useState<AllTypesFormData>(allTypesInitialData);
  const [optionsData, setOptionsData] = useState<OptionsFormData>(optionsInitialData);
  const [categorizationData, setCategorizationData] = useState<CategorizationFormData>(categorizationInitialData);
  const [categorizationStepperData, setCategorizationStepperData] = useState<CategorizationStepperFormData>(categorizationStepperInitialData);
  const [horizontalLayoutData, setHorizontalLayoutData] = useState<HorizontalLayoutFormData>(horizontalLayoutInitialData);
  const [verticalLayoutData, setVerticalLayoutData] = useState<VerticalLayoutFormData>(verticalLayoutInitialData);

  return (
    <Container size="sm" py="xl" fluid>
      <Stack gap="xl">
        <Title order={2}>JSON Forms + Mantine POC</Title>
        <Tabs defaultValue="basic">
          <Tabs.List>
            <Tabs.Tab value="basic">Basic Example</Tabs.Tab>
            <Tabs.Tab value="controls">Controls</Tabs.Tab>
            <Tabs.Tab value="categorization">Categorization Example</Tabs.Tab>
            <Tabs.Tab value="layout">Layout Example</Tabs.Tab>
            <Tabs.Tab value="complex">Complex Example</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="controls" pt="md">
            <Tabs variant='pills' defaultValue="allTypes">
              <Tabs.List>
                <Tabs.Tab value="allTypes">All Types Example</Tabs.Tab>
                <Tabs.Tab value="options">Options Example</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="allTypes" pt="md">
                <Box>
                  <JsonForms
                    schema={allTypesSchema}
                    uischema={allTypesUischema}
                    data={allTypesData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setAllTypesData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(allTypesData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setAllTypesData(allTypesInitialData)}>Reset</Button>
                  <Button onClick={() => setAllTypesData({} as AllTypesFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="options" pt="md">
                <Box>
                  <JsonForms
                    schema={optionsSchema}
                    uischema={optionsUischema}
                    data={optionsData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setOptionsData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(optionsData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setOptionsData(optionsInitialData)}>Reset</Button>
                  <Button onClick={() => setOptionsData({} as OptionsFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>
          <Tabs.Panel value="categorization" pt="md">
            <Tabs variant='pills' defaultValue="default">
              <Tabs.List>
                <Tabs.Tab value="default">Default Tabs</Tabs.Tab>
                <Tabs.Tab value="stepper">Stepper Variant</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="default" pt="md">
                <Box>
                  <JsonForms
                    schema={categorizationSchema}
                    uischema={categorizationUischema}
                    data={categorizationData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setCategorizationData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(categorizationData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setCategorizationData(categorizationInitialData)}>Reset</Button>
                  <Button onClick={() => setCategorizationData({} as CategorizationFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="stepper" pt="md">
                <Box>
                  <JsonForms
                    schema={categorizationStepperSchema}
                    uischema={categorizationStepperUischema}
                    data={categorizationStepperData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setCategorizationStepperData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(categorizationStepperData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setCategorizationStepperData(categorizationStepperInitialData)}>Reset</Button>
                  <Button onClick={() => setCategorizationStepperData({} as CategorizationStepperFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>
          <Tabs.Panel value="layout" pt="md">
            <Tabs variant='pills' defaultValue="horizontalLayout">
              <Tabs.List>
                <Tabs.Tab value="horizontalLayout">Horizontal Layout</Tabs.Tab>
                <Tabs.Tab value="verticalLayout">Vertical Layout</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="horizontalLayout" pt="md">
                <Box>
                  <JsonForms
                    schema={horizontalLayoutSchema}
                    uischema={horizontalLayoutUischema}
                    data={horizontalLayoutData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setHorizontalLayoutData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(horizontalLayoutData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setHorizontalLayoutData(horizontalLayoutInitialData)}>Reset</Button>
                  <Button onClick={() => setHorizontalLayoutData({} as HorizontalLayoutFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="verticalLayout" pt="md">
                <Box>
                  <JsonForms
                    schema={verticalLayoutSchema}
                    uischema={verticalLayoutUischema}
                    data={verticalLayoutData}
                    renderers={mantineRenderers}
                    cells={mantineCells}
                    onChange={({ data }) => setVerticalLayoutData(data)}
                  />
                </Box>
                <Box mt="md">
                  <Title order={4}>Current Data</Title>
                  <pre>{JSON.stringify(verticalLayoutData, null, 2)}</pre>
                </Box>
                <Group mt="md">
                  <Button onClick={() => setVerticalLayoutData(verticalLayoutInitialData)}>Reset</Button>
                  <Button onClick={() => setVerticalLayoutData({} as VerticalLayoutFormData)} variant="outline">Clear</Button>
                </Group>
              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>
          <Tabs.Panel value="complex" pt="md">
            <Box>
              <JsonForms
                schema={complexSchema}
                uischema={complexUischema}
                data={complexData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setComplexData(data)}
              />
            </Box>
            <Box mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(complexData, null, 2)}</pre>
            </Box>
            <Group mt="md">
              <Button onClick={() => setComplexData(complexInitialData)}>Reset</Button>
              <Button onClick={() => setComplexData({} as ComplexFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
          <Tabs.Panel value="basic" pt="md">
            <Box>
              <JsonForms
                schema={basicSchema}
                uischema={basicUischema}
                data={basicData}
                renderers={mantineRenderers}
                cells={mantineCells}
                onChange={({ data }) => setBasicData(data)}
              />
            </Box>
            <Box mt="md">
              <Title order={4}>Current Data</Title>
              <pre>{JSON.stringify(basicData, null, 2)}</pre>
            </Box>
            <Group mt="md">
              <Button onClick={() => setBasicData(basicInitialData)}>Reset</Button>
              <Button onClick={() => setBasicData({} as BasicFormData)} variant="outline">Clear</Button>
            </Group>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}

export default App;
