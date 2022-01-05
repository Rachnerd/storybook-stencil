import { defineCustomElements } from '../loader';
import { setStencilDocJson, extractArgTypes, extractComponentDescription } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from './docs.json';

if (docJson) setStencilDocJson(docJson as any);

defineCustomElements(window);

const eventsWithSelectors = docJson.components.map(({ events, tag }) => events.map(({ event }) => `${event} ${tag}`)).reduce((acc, events) => [...acc, ...events], []);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*', handles: eventsWithSelectors },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractArgTypes,
    extractComponentDescription,
  },
};
