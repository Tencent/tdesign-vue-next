import { defineConfig } from 'cypress';
import { resolveConfig, basePlugin } from '../../script/vite.base.config';

export default defineConfig({
  projectId: '7uyn3a',
  fileServerFolder: 'test/cypress',
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  videosFolder: 'test/cypress/videos',
  video: true,
  videoCompression: 15,
  viewportWidth: 1024,
  viewportHeight: 600,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/cypress-output-[hash].xml',
    toConsole: true,
  },
  component: {
    // specPattern: '**/*.cy.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    supportFile: 'test/cypress/support/component.js',
    indexHtmlFile: 'test/cypress/support/component-index.html',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig: { resolve: resolveConfig, plugins: basePlugin },
    },
  },

  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
