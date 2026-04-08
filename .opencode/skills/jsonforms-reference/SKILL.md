---
name: jsonforms-reference
description: Reference guide for @jsonforms/core and @jsonforms/react packages. Use this skill when working on JSON Forms renderers, integrating JSON Forms into a project, or needing to understand how core concepts like testers, cells, controls, renderers, dispatchers, state management, or data handling work. Trigger when the user asks about JSON Forms internals, how a specific JSON Forms function works, debugging JSON Forms issues, or implementing custom renderers.
---

# JSON Forms Source Reference

This skill provides guidance for referencing the `@jsonforms/core` and `@jsonforms/react` source code when working in this repository.

## Source Locations

The JSON Forms monorepo is located at `../jsonforms/` relative to this project:

| Package | Source Path |
|---------|-------------|
| `@jsonforms/core` | `../jsonforms/packages/core/src/` |
| `@jsonforms/react` | `../jsonforms/packages/react/src/` |

## When to Reference These Sources

Reference these packages when you need to:

1. **Understand type definitions** - Check `@jsonforms/core` for interfaces like `CellProps`, `ControlProps`, `RendererProps`, `JsonFormsState`, etc.
2. **Understand testers** - Review how `isStringControl`, `rankWith`, `and`, `or`, `optionIs` etc. work
3. **Understand state/store** - See how the Redux store, actions, and reducers are structured
4. **Understand HOC patterns** - See how `withJsonFormsCellProps`, `withJsonFormsControlProps`, `withJsonFormsLayoutProps` are implemented
5. **Debug rendering issues** - Check the dispatch mechanism, context providers, or unknown renderer handling

## Key Files by Task

### Understanding Types and Props

- `core/src/models/index.ts` - Core type definitions
- `core/src/util/index.ts` - Utility types and helpers
- `react/src/JsonFormsContext.tsx` - React context types

### Understanding Testers

- `core/src/testers/index.ts` - All tester exports
- `core/src/testers/testers.ts` - Tester implementations

### Understanding HOCs and Mappers

- `react/src/Renderer.tsx` - Renderer component and HOC wrappers
- `core/src/mappers/` - Data mappers
- `react/src/JsonFormsContext.tsx` - Context hooks and providers

### Understanding State Management

- `core/src/store/index.ts` - Store creation
- `core/src/reducers/index.ts` - State reducers
- `core/src/actions/index.ts` - Redux actions

### Understanding Dispatch and Resolution

- `react/src/DispatchCell.tsx` - How cells are resolved and rendered
- `core/src/generators/` - Schema/uischema generation

## How to Search

Use the Grep tool to search for specific patterns:

```
# Find type definitions
Grep pattern: "interface.*Props" in ../jsonforms/packages/core/src/

# Find specific function
Grep pattern: "export.*withJsonFormsCellProps" in ../jsonforms/packages/react/src/

# Find tester implementations
Grep pattern: "export.*isStringControl" in ../jsonforms/packages/core/src/
```

Use the Read tool to examine specific files:

```
Read ../jsonforms/packages/core/src/models/index.ts
Read ../jsonforms/packages/react/src/JsonFormsContext.tsx
```

## Common Patterns

### Cell Pattern
```
core/src/models/index.ts → CellProps interface
react/src/Renderer.tsx → withJsonFormsCellProps HOC
```

### Control Pattern
```
core/src/models/index.ts → ControlProps interface
react/src/Renderer.tsx → withJsonFormsControlProps HOC
```

### Layout Pattern
```
core/src/models/index.ts → RendererProps interface
react/src/Renderer.tsx → withJsonFormsLayoutProps HOC
```

## Quick Reference

| Concept | Core Location | React Location |
|---------|--------------|----------------|
| Props types | `models/` | `JsonFormsContext.tsx` |
| Testers | `testers/` | - |
| State types | `store/`, `reducers/` | `JsonFormsContext.tsx` |
| Actions | `actions/` | - |
| HOCs | - | `Renderer.tsx` |
| Context | - | `JsonFormsContext.tsx` |
| Dispatch logic | - | `DispatchCell.tsx` |