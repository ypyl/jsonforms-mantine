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
import type { ControlProps, OwnPropsOfEnum, RankedTester } from '@jsonforms/core';
import { isEnumControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps, withJsonFormsEnumProps } from '@jsonforms/react';
import { Autocomplete } from '@mantine/core';
import { i18nDefaults, withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';

export const AutocompleteEnumControl = (props: ControlProps & VanillaRendererProps & OwnPropsOfEnum) => {
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
  } = props as any;

  if (visible === false) {
    return null;
  }

  const isValid = !errors || errors.length === 0;

  return (
    <Autocomplete
      id={id}
      label={label}
      description={isValid ? description : undefined}
      error={!isValid ? errors : undefined}
      withAsterisk={required}
      value={data ?? ''}
      onChange={(value) => handleChange(path, value)}
      disabled={!enabled}
      data={options?.map((opt: any) => opt.label || opt.value) ?? []}
      placeholder={`Select or enter ${label?.toLowerCase() ?? 'a value'}`}
      autoFocus={uischema?.options?.focus}
    />
  );
};

export const autocompleteEnumControlTester: RankedTester = rankWith(4, isEnumControl);

export default withJsonFormsEnumProps(
  withJsonFormsControlProps(AutocompleteEnumControl) as any
);
