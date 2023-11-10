import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseURL: 'https://rydlande.github.io/workflow_CA',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
