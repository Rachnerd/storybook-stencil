import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'storybook-stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-json',
      file: './.storybook/docs.json',
    },
  ],
};
