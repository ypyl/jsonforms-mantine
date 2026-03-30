# Agents Documentation

## Project Overview

This is a POC React application integrating JSON Forms (https://jsonforms.io/) with Mantine UI (https://mantine.dev/) using Vite as the build tool.

## Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build (TypeScript check + Vite build)
npm run build

# TypeScript check only (fast, uses project references)
tsc -b

# Lint all files
npm run lint

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── App.tsx                      # Main application entry
├── main.tsx                     # React DOM entry
├── index.css                    # Global styles
└── mantine-renderers/           # JSON Forms Mantine renderers
    ├── index.ts                 # Main exports
    ├── renderers.ts             # Renderer/cell registration
    ├── cells/                   # Cell components (TextCell, BooleanCell, etc.)
    ├── controls/                # Control components (InputControl, etc.)
    ├── layouts/                 # Layout components (VerticalLayout, etc.)
    ├── complex/                 # Complex renderers (arrays, categorization)
    ├── util/                    # Utilities (i18n, props helpers)
    └── styles/                  # Style configuration (currently unused)
```

## Code Style Guidelines

### TypeScript

- **verbatimModuleSyntax**: All type-only imports MUST use `import type` syntax:
  ```typescript
  // Correct
  import type { CellProps, RankedTester } from '@jsonforms/core';
  import { isStringControl, rankWith } from '@jsonforms/core';

  // Incorrect (will cause build errors)
  import { CellProps, RankedTester } from '@jsonforms/core';
  ```

- **strict mode enabled**: All strict checks are enforced
- **noUnusedLocals / noUnusedParameters**: Remove or prefix unused variables with `_`
- **erasableSyntaxOnly**: Use `type` instead of `interface` where possible

### Imports

1. External dependencies first, then internal:
   ```typescript
   import { useState } from 'react';
   import { JsonForms } from '@jsonforms/react';
   import { TextInput } from '@mantine/core';
   import type { CellProps } from '@jsonforms/core';
   ```

2. Sort imports alphabetically within groups

### React Components

- Use functional components with `React.FC` or `React.memo` for optimization
- Destructure props at the top of the function
- Handle `visible === false` early to return `null`
- Wrap with `withJsonFormsCellProps` or `withJsonFormsControlProps` HOCs

### Naming Conventions

- **Components**: PascalCase (e.g., `TextCell`, `VerticalLayoutRenderer`)
- **Testers**: camelCase with `Tester` suffix (e.g., `textCellTester`, `inputControlTester`)
- **Exports**: Named exports preferred; default export wraps with HOC
- **Files**: PascalCase for components, camelCase for utilities (e.g., `TextCell.tsx`, `util.tsx`)

### Mantine Components

- Import from `@mantine/core` directly
- Use `Stack` for vertical layouts, `Group` for horizontal
- Use `Box` for simple wrappers
- Use `Input.Wrapper` for label/description/error handling in controls
- Use `TextInput`, `NumberInput`, `Select`, `Checkbox` for form inputs

### JSON Forms Patterns

- **Cell Pattern**: Use `CellProps` and wrap with `withJsonFormsCellProps`
- **Control Pattern**: Use `ControlProps` and wrap with `withJsonFormsControlProps`
- **Layout Pattern**: Use `RendererProps` and wrap with `withJsonFormsLayoutProps`
- **Tester Pattern**: `rankWith(number, predicate)` to create ranked testers
- **Visibility**: Check `visible === false` first, return `null` if hidden

### Error Handling

- Use `console.warn` for non-critical issues (e.g., "No applicable cell found")
- Never expose internal errors to users without logging
- Consider adding try/catch around data transformations

### JSON Forms Renderer Structure

```typescript
// Cell example
export const TextCell = (props: CellProps) => {
  const { data, id, enabled, path, handleChange } = props;
  if (props.visible === false) return null;
  return (
    <TextInput
      id={id}
      value={data ?? ''}
      onChange={(event) => handleChange(path, event.currentTarget.value)}
      disabled={!enabled}
    />
  );
};
export const textCellTester: RankedTester = rankWith(1, isStringControl);
export default withJsonFormsCellProps(TextCell);

// Layout example
export const VerticalLayoutRenderer = (props: RendererProps) => {
  const { data: _data, ...otherProps } = props;
  return <VerticalLayoutRendererComponent {...otherProps} />;
};
const VerticalLayoutRendererComponent: React.FC<RendererProps> = React.memo(function VerticalLayoutRendererComponent({ ... }) { ... });
export default withJsonFormsLayoutProps(VerticalLayoutRenderer, false);
```

## Key Dependencies

- **@jsonforms/core** v3.7.0 - Core JSON Forms logic
- **@jsonforms/react** v3.7.0 - React integration
- **@mantine/core** v8.3.18 - UI component library
- **react** v19.2.4 - React framework
- **lodash** - Utility functions (merge, isEmpty, maxBy, etc.)

## Type Proxies

JSON Forms uses proxy objects for `schema`, `uischema`, and `path`. Access properties directly without guards for simple properties. For nested property access, use `_.get` or similar utilities.

## Current State

The `mantine-renderers` package is in transition from vanilla HTML elements to Mantine components. The following are updated and working:

- **Cells**: TextCell, IntegerCell, BooleanCell, EnumCell
- **Layouts**: VerticalLayout, JsonFormsLayout
- **Controls**: InputControl

The following still use vanilla HTML and need updating:

- **Cells**: DateCell, DateTimeCell, NumberCell, NumberFormatCell, OneOfEnumCell, SliderCell, TextAreaCell, TimeCell
- **Layouts**: GroupLayout, HorizontalLayout
- **Controls**: RadioGroupControl, OneOfRadioGroupControl
- **Complex**: ArrayControlRenderer, CategorizationRenderer, LabelRenderer, TableArrayControl
