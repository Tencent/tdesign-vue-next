import { getParameters } from 'codesandbox/lib/api/define';
import orgPkg from '../../../../package.json';

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>TDesign Demo</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`;

const App = `
<template>
  <demo />
</template>

<script>
import { defineComponent } from "vue";
import Demo from "./Demo.vue";

export default defineComponent({
components: {
  Demo,
},
});
</script>`;

const mainJs = `import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './App.vue';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App)
app.use(TDesign);
app.mount("#app");
`;

export function getCodeSandboxParams(code, meta) {
  return getParameters({
    files: {
      'package.json': {
        content: JSON.stringify(
          {
            title: meta.title,
            dependencies: {
              vue: orgPkg.devDependencies.vue,
              less: orgPkg.devDependencies.less,
              'tdesign-vue-next': orgPkg.version,
              'tdesign-icons-vue-next': orgPkg.dependencies['tdesign-icons-vue-next'],
            },
            devDependencies: {
              '@vue/cli-plugin-babel': '~4.5.0',
            },
          },
          null,
          2,
        ),
        isBinary: false,
      },
      'index.html': {
        content: indexHtml,
        isBinary: false,
      },
      'src/Demo.vue': {
        content: code,
        isBinary: false,
      },
      'src/App.vue': {
        content: App,
        isBinary: false,
      },
      'src/main.js': {
        content: mainJs,
        isBinary: false,
      },
    },
  });
}
