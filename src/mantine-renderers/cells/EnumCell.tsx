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
import { useMemo } from 'react';
import type { EnumCellProps, RankedTester } from '@jsonforms/core';
import { isEnumControl, rankWith } from '@jsonforms/core';
import {
  type TranslateProps,
  withJsonFormsEnumCellProps,
  withTranslateProps,
} from '@jsonforms/react';
import { i18nDefaults, withVanillaEnumCellProps } from '../util';
import type { VanillaRendererProps } from '../index';
import { Select } from '@mantine/core';

export const EnumCell = (
  props: EnumCellProps & VanillaRendererProps & TranslateProps
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    t,
  } = props;

  const noneOptionLabel = useMemo(
    () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
    [t, schema, uischema, path]
  );

  if (props.visible === false) {
    return null;
  }

  return (
    <Select
      className={className}
      id={id}
      value={data ?? null}
      onChange={(value) => handleChange(path, value ?? undefined)}
      disabled={!enabled}
      data={[
        { value: '', label: noneOptionLabel },
        ...(options?.map((opt) => ({ value: opt.value, label: opt.label || opt.value })) ?? []),
      ]}
      placeholder={noneOptionLabel}
      clearable
      allowDeselect
      autoFocus={uischema?.options?.focus}
    />
  );
};

export const enumCellTester: RankedTester = rankWith(2, isEnumControl);

export default withJsonFormsEnumCellProps(
  withTranslateProps(withVanillaEnumCellProps(EnumCell))
);
