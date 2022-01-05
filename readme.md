# Storybook Stencil

## Run

Start Stencil build:

```bash
npm run build.watch
```

In parallel run Storybook:

```
npm run storybook
```

## Project creation

### Tools setup

Generate Stencil project:

```bash
npm init stencil
> component
> storybook-stencil
> y
```

Add Storybook support:

```bash
npx -p @storybook/cli sb init -t react
```

_Note: React is chosen over HTML as a workaround since HTML loaders have issues with tsx._

Add React packages as devDeps:

```bash
npm i -D react react-dom
```

### First story

Add a command that builds Stencil each time code changes:

```json
"build.watch": "stencil build --watch",
```

Add a command that runs Storybook and checks the Stencil `dist` folder:

```json
"storybook": "start-storybook -p 6006 -s dist",
```

_Note: -s is a workaround to make sure Storybook detects Stencil changes._

Remove example code storybook and add a stories file for `my-component`.

```tsx
export default {
  title: 'Demo/MyComponent',
  component: 'my-component',
};

const Template = args => <my-component {...args}></my-component>;

export const Primary = Template.bind({});
```

Fix error `Property 'my-component' does not exist on type 'JSX.IntrinsicElements'.`:

.storybook/intrinsic-elements.d.ts

```typescript
import { JSX as StencilJSX } from '../dist/types/components';

declare global {
  namespace JSX {
    interface IntrinsicElements extends StencilJSX.IntrinsicElements {}
  }
}
```

Ignore stories files in tsconfig.json (Stencil):

```json
"exclude": ["node_modules", "src/**/*.stories.*"]
```

Running storybook shows an empty page because the webcomponents are not defined.

Run a Stencil build so it generates a `loader` folder:

```
npm run build
```

Define the webcomponents in Storybook:

.storybook/preview.ts

```typescript
import { defineCustomElements } from '../loader';

defineCustomElements(window);
```

### Fix Docs + Controls

Install third party addon that converts Stencil metadata to addon-docs format:

```bash
npm i -D @pxtrn/storybook-addon-docs-stencil
```

Add the addon to main.js:

```json
addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@pxtrn/storybook-addon-docs-stencil'],
```

Add Stencil output target so it generated the metadata:

stencil.config.ts

```typescript
    {
      type: 'docs-json',
      file: './.storybook/docs.json'
    }
```

Update preview.ts so it imports the metadata en overrides some addon-docs options:

```typescript
import { defineCustomElements } from '../loader';
import { setStencilDocJson, extractArgTypes, extractComponentDescription } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from './docs.json';

if (docJson) setStencilDocJson(docJson as any);

defineCustomElements(window);

export const parameters = {
  ...
  docs: {
    extractArgTypes,
    extractComponentDescription,
  },
};
```

Now Controls work as expected and the docs tab is automatically populated with comments found in Stencil components.

### Fix Actions

Since we have access to metadata of Stencil, a simple function can enable automatic detection of Actions:

```typescript
const eventsWithSelectors = docJson.components.map(({ events, tag }) => events.map(({ event }) => `${event} ${tag}`)).reduce((acc, events) => [...acc, ...events], []);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*', handles: eventsWithSelectors },
  ...
};
```
