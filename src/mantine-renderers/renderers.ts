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

import { type RankedTester } from "@jsonforms/core";

import {
  BooleanCell,
  booleanCellTester,
  DateTimeCell,
  dateTimeCellTester,
  EnumCell,
  enumCellTester,
  OneOfEnumCell,
  oneOfEnumCellTester,
  TimeCell,
  timeCellTester,
  TextCell,
  textCellTester,
  NumberCell,
  numberCellTester,
  TextAreaCell,
  textAreaCellTester,
  SliderCell,
  sliderCellTester,
  IntegerCell,
  integerCellTester,
  DateCell,
  dateCellTester,
} from "./cells";

import {
  BooleanControl,
  booleanControlTester,
  DateControl,
  dateControlTester,
  DateTimeControl,
  dateTimeControlTester,
  EnumControl,
  enumControlTester,
  InputControl,
  inputControlTester,
  IntegerControl,
  integerControlTester,
  NumberControl,
  numberControlTester,
  RadioGroupControl,
  radioGroupControlTester,
  OneOfRadioGroupControl,
  oneOfRadioGroupControlTester,
  SliderControl,
  sliderControlTester,
  TextAreaControl,
  textAreaControlTester,
  TextControl,
  textControlTester,
  TimeControl,
  timeControlTester,
} from "./controls";

import {
  ArrayControl,
  arrayControlTester,
  Categorization,
  categorizationTester,
  LabelRenderer,
  labelRendererTester,
  TableArrayControl,
  tableArrayControlTester,
} from "./complex";

import {
  GroupLayout,
  groupTester,
  HorizontalLayout,
  horizontalLayoutTester,
  VerticalLayout,
  verticalLayoutTester,
} from "./layouts";

export const mantineRenderers: { tester: RankedTester; renderer: any }[] = [
  { tester: booleanControlTester, renderer: BooleanControl },
  { tester: textControlTester, renderer: TextControl },
  { tester: numberControlTester, renderer: NumberControl },
  { tester: integerControlTester, renderer: IntegerControl },
  { tester: dateControlTester, renderer: DateControl },
  { tester: dateTimeControlTester, renderer: DateTimeControl },
  { tester: enumControlTester, renderer: EnumControl },
  { tester: textAreaControlTester, renderer: TextAreaControl },
  { tester: sliderControlTester, renderer: SliderControl },
  { tester: timeControlTester, renderer: TimeControl },
  { tester: inputControlTester, renderer: InputControl },
  { tester: radioGroupControlTester, renderer: RadioGroupControl },
  { tester: oneOfRadioGroupControlTester, renderer: OneOfRadioGroupControl },
  { tester: arrayControlTester, renderer: ArrayControl },
  { tester: labelRendererTester, renderer: LabelRenderer },
  { tester: categorizationTester, renderer: Categorization },
  { tester: tableArrayControlTester, renderer: TableArrayControl },
  { tester: groupTester, renderer: GroupLayout },
  { tester: verticalLayoutTester, renderer: VerticalLayout },
  { tester: horizontalLayoutTester, renderer: HorizontalLayout },
];

export const mantineCells: { tester: RankedTester; cell: any }[] = [
  { tester: booleanCellTester, cell: BooleanCell },
  { tester: dateTimeCellTester, cell: DateTimeCell },
  { tester: enumCellTester, cell: EnumCell },
  { tester: oneOfEnumCellTester, cell: OneOfEnumCell },
  { tester: timeCellTester, cell: TimeCell },
  { tester: textCellTester, cell: TextCell },
  { tester: textAreaCellTester, cell: TextAreaCell },
  { tester: numberCellTester, cell: NumberCell },
  { tester: sliderCellTester, cell: SliderCell },
  { tester: integerCellTester, cell: IntegerCell },
  { tester: dateCellTester, cell: DateCell },
];
