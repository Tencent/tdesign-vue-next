export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,
  devtools: { enabled: true },
  devServer: { port: 17002 },
  compatibilityDate: '2024-11-18',
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
