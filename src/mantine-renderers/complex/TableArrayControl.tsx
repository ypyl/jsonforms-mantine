/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import fpfilter from "lodash/fp/filter";
import fpmap from "lodash/fp/map";
import fpflow from "lodash/fp/flow";
import filter from "lodash/filter";
import join from "lodash/join";
import fpkeys from "lodash/fp/keys";
import fpstartCase from "lodash/fp/startCase";
import React from "react";
import {
  type ArrayControlProps,
  type ControlElement,
  createDefaultValue,
  Helpers,
  Paths,
  type RankedTester,
  Resolve,
  Test,
  getControlPath,
  encode,
  type ArrayTranslations,
} from "@jsonforms/core";
import {
  DispatchCell,
  withArrayTranslationProps,
  withJsonFormsArrayControlProps,
  withTranslateProps,
} from "@jsonforms/react";
import { Box, Button, Table, Text } from "@mantine/core";
import type { VanillaRendererProps } from "../index";
import { withVanillaControlProps } from "../util";

const { convertToValidClassName } = Helpers;

const { or, isObjectArrayControl, isPrimitiveArrayControl, rankWith } = Test;

export const tableArrayControlTester: RankedTester = rankWith(3, or(isObjectArrayControl, isPrimitiveArrayControl));

const TableArrayControl: React.FC<ArrayControlProps & VanillaRendererProps & { translations: ArrayTranslations }> = ({
  addItem,
  uischema,
  schema,
  rootSchema,
  path,
  data,
  visible,
  errors,
  label,
  getStyleAsClassName,
  childErrors,
  translations,
  enabled,
  removeItems,
}) => {
  if (visible === false) {
    return null;
  }

  const controlElement = uischema as ControlElement;
  const tableClass = getStyleAsClassName?.("array.table.table") ?? "";
  const labelClass = getStyleAsClassName?.("array.table.label") ?? "";
  const controlClass = [getStyleAsClassName?.("array.table") ?? "", convertToValidClassName(controlElement.scope)].join(
    " ",
  );
  const buttonClass = getStyleAsClassName?.("array.table.button") ?? "";
  const validationClass = getStyleAsClassName?.("array.table.validation") ?? "";
  const validationErrorClass = getStyleAsClassName?.("array.table.validation.error") ?? "";
  const isValid = errors.length === 0;
  const divClassNames = [validationClass].concat(isValid ? "" : validationErrorClass).join(" ");
  const createControlElement = (key?: string): ControlElement => ({
    type: "Control",
    label: false,
    scope: schema.type === "object" ? `#/properties/${key}` : "#",
  });

  const confirmDelete = (childPath: string, index: number) => {
    const p = childPath.substring(0, childPath.lastIndexOf("."));
    if (removeItems) {
      removeItems(p, [index])();
    }
  };

  return (
    <Box className={controlClass}>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <Text fw={500} className={labelClass}>
          {label}
        </Text>
        <Button
          className={buttonClass}
          variant="light"
          size="xs"
          disabled={!enabled}
          onClick={addItem(path, createDefaultValue(schema, rootSchema))}
        >
          {translations.addTooltip}
        </Button>
      </Box>
      {!isValid && (
        <Text className={divClassNames} c="red" size="sm" mb="xs">
          {errors}
        </Text>
      )}
      <Table className={tableClass} striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            {schema.properties ? (
              (() => {
                const props = schema.properties;
                return fpflow(
                  fpkeys,
                  fpfilter((prop) => props[prop].type !== "array"),
                  fpmap((prop) => <Table.Th key={prop}>{props[prop].title ?? fpstartCase(prop)}</Table.Th>),
                )(props);
              })()
            ) : (
              <Table.Th>Items</Table.Th>
            )}
            <Table.Th>Valid</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!data || !Array.isArray(data) || data.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3}>{translations.noDataMessage}</Table.Td>
            </Table.Tr>
          ) : (
            data.map((_child, index) => {
              const childPath = Paths.compose(path, `${index}`);
              const errorsPerEntry: any[] = filter(childErrors, (error) => {
                const errorPath = getControlPath(error);
                return errorPath.startsWith(childPath);
              });

              const validationClassName = getStyleAsClassName?.("array.validation") ?? "array.validation";
              const errorValidationClassName =
                getStyleAsClassName?.("array.validation.error") ?? "array.validation.error";
              const errorClassNames = errorsPerEntry
                ? [validationClassName].concat(errorValidationClassName).join(" ")
                : validationClassName;

              return (
                <Table.Tr key={childPath}>
                  {schema.properties ? (
                    (() => {
                      const props = schema.properties;
                      return fpflow(
                        fpkeys,
                        fpfilter((prop) => props[prop].type !== "array"),
                        fpmap((prop) => {
                          const childPropPath = Paths.compose(childPath, prop.toString());
                          return (
                            <Table.Td key={childPropPath}>
                              <DispatchCell
                                schema={Resolve.schema(schema, `#/properties/${encode(prop)}`, rootSchema)}
                                uischema={createControlElement(encode(prop))}
                                path={childPath + "." + prop}
                              />
                            </Table.Td>
                          );
                        }),
                      )(props);
                    })()
                  ) : (
                    <Table.Td key={Paths.compose(childPath, index.toString())}>
                      <DispatchCell schema={schema} uischema={createControlElement()} path={childPath} />
                    </Table.Td>
                  )}
                  <Table.Td>
                    {errorsPerEntry ? (
                      <Text className={errorClassNames} size="sm">
                        {join(
                          errorsPerEntry.map((e) => e.message),
                          " and ",
                        )}
                      </Text>
                    ) : (
                      <Text className={errorClassNames} size="sm">
                        OK
                      </Text>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="subtle"
                      color="red"
                      size="xs"
                      disabled={!enabled}
                      aria-label={translations.removeAriaLabel}
                      onClick={() => {
                        if (window.confirm(translations.deleteDialogMessage)) {
                          confirmDelete(childPath, index);
                        }
                      }}
                    >
                      {translations.removeTooltip}
                    </Button>
                  </Table.Td>
                </Table.Tr>
              );
            })
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default withVanillaControlProps(
  withJsonFormsArrayControlProps(withTranslateProps(withArrayTranslationProps(TableArrayControl))),
);
