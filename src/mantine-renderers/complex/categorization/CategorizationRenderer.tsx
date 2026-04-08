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
import { useState } from 'react';
import type { Categorization, Category, LayoutProps } from '@jsonforms/core';
import {
  type TranslateProps,
  withJsonFormsLayoutProps,
  withTranslateProps,
} from '@jsonforms/react';
import { Stepper, Tabs } from '@mantine/core';
import { isCategorization } from './tester';
import { SingleCategory } from './SingleCategory';
import { withAjvProps, withVanillaControlProps } from '../../util';
import type { AjvProps, VanillaRendererProps } from '../../util';
import {
  deriveLabelForUISchemaElement,
  isVisible,
} from '@jsonforms/core';

export interface CategorizationState {
  selectedCategory: Category;
}

interface CategorizationProps {
  selected?: number;
  onChange?(selected: number, prevSelected: number): void;
}

export const CategorizationRenderer = ({
  data,
  uischema,
  schema,
  path,
  selected,
  t,
  visible,
  getStyleAsClassName,
  onChange,
  ajv,
  config,
}: LayoutProps &
  VanillaRendererProps &
  TranslateProps &
  CategorizationProps &
  AjvProps) => {
  const categorization = uischema as Categorization;
  const elements = categorization.elements as (Category | Categorization)[];

  const [previousCategorization, setPreviousCategorization] =
    useState<Categorization>(uischema as Categorization);
  const [activeTab, setActiveTab] = useState<string>(String(selected ?? 0));

  const activeCategoryIndex =
    activeTab === undefined ? 0 : parseInt(activeTab, 10);

  const safeCategoryIndex =
    activeCategoryIndex >= elements.length ? 0 : activeCategoryIndex;

  if (categorization !== previousCategorization) {
    setActiveTab('0');
    setPreviousCategorization(categorization);
  }

  const visibleElements = elements.filter((el) =>
    isVisible(el, data, undefined, ajv, config)
  );

  const handleTabChange = (newValue: string | null) => {
    if (newValue === null) return;
    if (onChange) {
      return onChange(parseInt(newValue, 10), safeCategoryIndex);
    }
    return setActiveTab(newValue);
  };

  if (visible === false) return null;

  const isStepperVariant = categorization.options?.variant === 'stepper';

  if (isStepperVariant) {
    return (
      <Stepper
        active={safeCategoryIndex}
        onStepChange={handleTabChange}
        className={getStyleAsClassName('categorization')}
      >
        {visibleElements.map((element, idx) => {
          const label = deriveLabelForUISchemaElement(element, t);
          return (
            <Stepper.Step key={idx} label={label}>
              {element && !isCategorization(element) ? (
                <SingleCategory
                  category={element as Category}
                  schema={schema}
                  path={path}
                />
              ) : null}
            </Stepper.Step>
          );
        })}
      </Stepper>
    );
  }

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      className={getStyleAsClassName('categorization')}
    >
      <Tabs.List>
        {visibleElements.map((element, idx) => {
          const label = deriveLabelForUISchemaElement(element, t);
          return (
            <Tabs.Tab key={idx} value={String(idx)}>
              {label}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      {visibleElements.map((element, idx) => {
        if (!isCategorization(element)) {
          return (
            <Tabs.Panel key={idx} value={String(idx)}>
              <SingleCategory
                category={element as Category}
                schema={schema}
                path={path}
              />
            </Tabs.Panel>
          );
        }
        return null;
      })}
    </Tabs>
  );
};

export default withAjvProps(
  withVanillaControlProps(
    withTranslateProps(withJsonFormsLayoutProps(CategorizationRenderer))
  )
);