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
import type { ControlProps, OwnPropsOfEnum, RankedTester } from '@jsonforms/core';
import { isEnumControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps, withJsonFormsEnumProps } from '@jsonforms/react';
import { Box, Select } from '@mantine/core';
import { i18nDefaults, withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';

export const EnumControl = (props: ControlProps & VanillaRendererProps & OwnPropsOfEnum) => {
  const {
    data,
    id,
    label,
    description,
    errors,
    enabled,
    visible,
    required,
    schema,
    uischema,
    path,
    handleChange,
    options,
    classNames,
    t,
  } = props as any;

  console.log('EnumControl props', props);


  const noneOptionLabel = useMemo(
    () => (typeof t === 'function' ? t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }) : i18nDefaults['enum.none']),
    [t, schema, uischema, path]
  );

  if (visible === false) {
    return null;
  }

  const isValid = !errors || errors.length === 0;

  console.log('EnumControl render', { data, options, label });

  return (
    <Box className={classNames?.wrapper}>
      <Select
        id={id}
        label={label}
        description={isValid ? description : undefined}
        error={!isValid ? errors : undefined}
        withAsterisk={required}
        value={data ?? null}
        onChange={(value) => handleChange(path, value ?? undefined)}
        disabled={!enabled}
        data={[
          { value: '', label: noneOptionLabel },
          ...(options?.map((opt: any) => ({ value: opt.value, label: opt.label || opt.value })) ?? []),
        ]}
        placeholder={noneOptionLabel}
        clearable
        allowDeselect
        autoFocus={uischema?.options?.focus}
      />
    </Box>
  );
};

export const enumControlTester: RankedTester = rankWith(3, isEnumControl);

export default withJsonFormsEnumProps(
  withJsonFormsControlProps(EnumControl) as any
);
