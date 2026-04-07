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
import type { ControlProps, RankedTester } from '@jsonforms/core';
import { isMultiLineControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Textarea } from '@mantine/core';
import merge from 'lodash/merge';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';

export const TextAreaControl = (props: ControlProps & VanillaRendererProps) => {
  const {
    id,
    data,
    label,
    description,
    errors,
    enabled,
    visible,
    required,
    uischema,
    schema,
    path,
    handleChange,
    classNames,
    config,
  } = props;

  if (visible === false) {
    return null;
  }

  const maxLength = schema.maxLength;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const isValid = !errors || errors.length === 0;

  const handleTextChange = (value: string) => {
    handleChange(path, value === '' ? undefined : value);
  };

  return (
    <Box className={classNames?.wrapper}>
      <Textarea
        id={id}
        label={label}
        description={isValid ? description : undefined}
        error={!isValid ? errors : undefined}
        withAsterisk={required}
        value={data ?? ''}
        onChange={(event) => handleTextChange(event.currentTarget.value)}
        disabled={!enabled}
        placeholder={appliedUiSchemaOptions.placeholder}
        autoFocus={appliedUiSchemaOptions.focus}
        maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
        autosize={appliedUiSchemaOptions.multi}
        minRows={2}
      />
    </Box>
  );
};

export const textAreaControlTester: RankedTester = rankWith(2, isMultiLineControl);

export default withVanillaControlProps(withJsonFormsControlProps(TextAreaControl));
