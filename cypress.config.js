import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    baseUrl: 'http://localhost:5173',
    video: false,
    includeShadowDom: true
  },
});
