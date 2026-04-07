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
import { isBooleanControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Checkbox, Switch, Text } from '@mantine/core';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';

export const BooleanControl = (props: ControlProps & VanillaRendererProps) => {
  const {
    id,
    data,
    label,
    description,
    errors,
    enabled,
    visible,
    uischema,
    path,
    handleChange,
    classNames,
  } = props;

  if (visible === false) {
    return null;
  }

  const isValid = !errors || errors.length === 0;
  const showDescription = description && isValid;

  const checkboxLabel = label;

  const handleBooleanChange = (value: boolean) => {
    handleChange(path, value);
  };

  if (uischema?.options?.toggle) {
    return (
      <Box className={classNames?.wrapper}>
        <Switch
          id={id}
          label={checkboxLabel}
          checked={!!data}
          onChange={(event) => handleBooleanChange(event.currentTarget.checked)}
          disabled={!enabled}
          error={!isValid ? errors : undefined}
        />
        {showDescription && <Text size="xs">{description}</Text>}
      </Box>
    );
  }

  return (
    <Box className={classNames?.wrapper}>
      <Checkbox
        id={id}
        label={checkboxLabel}
        checked={!!data}
        onChange={(event) => handleBooleanChange(event.currentTarget.checked)}
        disabled={!enabled}
        error={!isValid ? errors : undefined}
        autoFocus={uischema?.options?.focus}
      />
      {showDescription && <Text size="xs">{description}</Text>}
    </Box>
  );
};

export const booleanControlTester: RankedTester = rankWith(2, isBooleanControl);

export default withVanillaControlProps(withJsonFormsControlProps(BooleanControl));
