import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: ['../src/module'],

  devtools: { enabled: true },
  devServer: { port: 17002 },
  compatibilityDate: 'latest',

  tdesign: {
    resolveIcons: true,
    // include:['Button']
    // exclude: ['Button']
    // iconInclude: ['Edit1']
    // prefix: 'tdesign'
    // plugins:['NotifyPlugin'],
    // importVariables:'~/assets/theme.css'
  },
});
