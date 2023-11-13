import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseURL: 'https://rydlande.github.io/workflow_CA',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
