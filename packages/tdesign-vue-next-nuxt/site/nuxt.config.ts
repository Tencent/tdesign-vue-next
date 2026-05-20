import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    [
      '../src/module',
      {
        resolveIcons: true,
        // include:['Button']
        // exclude: ['Button']
        // iconInclude: ['Edit1']
        // prefix: 'tdesign'
        // plugins:['NotifyPlugin'],
        // importVariables:'~/assets/theme.css'
      },
    ],
  ],

  devtools: { enabled: true },
  devServer: { port: 17002 },
  compatibilityDate: 'latest',
});
