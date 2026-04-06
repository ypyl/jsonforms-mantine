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
import maxBy from "lodash/maxBy";
import type { ControlProps, ControlState, RankedTester } from "@jsonforms/core";
import { computeLabel, isControl, NOT_APPLICABLE, rankWith } from "@jsonforms/core";
import { Control, DispatchCell, withJsonFormsControlProps } from "@jsonforms/react";
import { Box, Input } from "@mantine/core";
import merge from "lodash/merge";
import { withVanillaControlProps } from "../util";
import type { VanillaRendererProps } from "../index";

export class InputControl extends Control<ControlProps & VanillaRendererProps, ControlState> {
  render() {
    const {
      classNames,
      description,
      id,
      errors,
      label,
      uischema,
      schema,
      rootSchema,
      visible,
      enabled,
      required,
      path,
      cells,
      config,
    } = this.props;

    const isValid = errors.length === 0;
    const appliedUiSchemaOptions = merge({}, config, { hideRequiredAsterisk: true }, uischema.options);
    const showDescription = !this.isDescriptionHidden(
      visible,
      description,
      this.state.isFocused,
      appliedUiSchemaOptions.showUnfocusedDescription,
    );
    const testerContext = { rootSchema, config };
    const cell = maxBy(cells, (r) => r.tester(uischema, schema, testerContext));

    if (cell === undefined || cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE) {
      console.warn("No applicable cell found.", uischema, schema);
      return null;
    }

    if (visible === false) {
      return null;
    }

    return (
      <Box className={classNames?.wrapper} onFocus={this.onFocus} onBlur={this.onBlur}>
        <Input.Wrapper
          id={id}
          label={computeLabel(label, required ?? false, appliedUiSchemaOptions.hideRequiredAsterisk)}
          description={showDescription ? description : null}
          error={!isValid ? errors : undefined}
          withAsterisk={appliedUiSchemaOptions.hideRequiredAsterisk ? false : required}
          className={classNames?.label}
          inputWrapperOrder={["label", "input", "description", "error"]}
        >
          <DispatchCell uischema={uischema} schema={schema} path={path} id={id + "-input"} enabled={enabled} />
        </Input.Wrapper>
      </Box>
    );
  }

  private isDescriptionHidden(
    visible: boolean | undefined,
    description: string | undefined,
    isFocused: boolean,
    showUnfocusedDescription: boolean | undefined,
  ): boolean {
    if (visible === false || !description) {
      return true;
    }
    if (showUnfocusedDescription) {
      return false;
    }
    return !isFocused;
  }
}

export const inputControlTester: RankedTester = rankWith(1, isControl);

export default withVanillaControlProps(withJsonFormsControlProps(InputControl));
