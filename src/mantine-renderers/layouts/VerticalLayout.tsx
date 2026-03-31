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
import React from 'react';
import type { RankedTester, RendererProps } from '@jsonforms/core';
import { rankWith, uiTypeIs } from '@jsonforms/core';
import type { VerticalLayout as VerticalLayoutSchema } from '@jsonforms/core';
import { withJsonFormsLayoutProps } from '@jsonforms/react';
import { Stack } from '@mantine/core';
import { JsonFormsLayout } from './JsonFormsLayout';
import { renderChildren } from './util';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';

export const verticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));

export const VerticalLayoutRenderer = (
  props: RendererProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  return <VerticalLayoutRendererComponent {...otherProps} />;
};

const VerticalLayoutRendererComponent: React.FC<RendererProps & VanillaRendererProps> = React.memo(function VerticalLayoutRendererComponent({
  schema,
  uischema,
  path,
  visible,
  enabled,
  getStyle,
  getStyleAsClassName,
}) {
  const verticalLayout = uischema as VerticalLayoutSchema;
  const elementsSize = verticalLayout.elements?.length ?? 0;
  const layoutClassName = getStyleAsClassName?.('vertical.layout') ?? '';
  const childClassNames = ['vertical-layout-item']
    .concat(getStyle?.('vertical.layout.item', elementsSize) ?? [])
    .join(' ');

  if (visible === false) {
    return null;
  }

  return (
    <JsonFormsLayout
      className={layoutClassName}
      uischema={uischema}
      schema={schema}
      visible={visible}
      enabled={enabled}
      path={path}
      getStyle={getStyle}
      getStyleAsClassName={getStyleAsClassName}
    >
      <Stack gap="xs">
        {renderChildren(verticalLayout, schema, childClassNames, path, enabled)}
      </Stack>
    </JsonFormsLayout>
  );
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(VerticalLayoutRenderer, false)
);
