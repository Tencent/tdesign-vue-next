import { defineConfig } from 'cypress';
import { resolveConfig, basePlugin } from '../../script/vite.base.config';

export default defineConfig({
  fileServerFolder: 'script/cypress',
  fixturesFolder: 'script/cypress/fixtures',
  screenshotsFolder: 'script/cypress/screenshots',
  videosFolder: 'script/cypress/videos',
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
    supportFile: 'script/cypress/support/component.js',
    indexHtmlFile: 'script/cypress/support/component-index.html',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
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
