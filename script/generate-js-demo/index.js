const compiler = require('@vue/compiler-sfc');
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const fse = require('fs-extra');

function fileWriteCallback(filePath) {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    const parsed = compiler.parse(content).descriptor;
    const template = parsed.template ? parsed.template.content : '';
    // transform script
    const script = parsed.script ? parsed.script.content : '';
    const transformedScriptCode = babel.transform(script, {
      plugins: [
        [
          '@babel/plugin-transform-typescript',
          {
            onlyRemoveTypeImports: true,
          },
        ],
      ],
    })?.code;
    const transformedScript = `<script>
  ${transformedScriptCode}
  </script>`;
    // transform script setup
    // @ts-ignore
    const scriptSetup = parsed.scriptSetup ? parsed.scriptSetup.content : '';
    const transformedScriptSetupCode = babel.transform(scriptSetup, {
      plugins: [
        [
          '@babel/plugin-transform-typescript',
          {
            onlyRemoveTypeImports: true,
          },
        ],
      ],
    })?.code;
    const transformedScriptSetup = `<script setup>
  ${transformedScriptSetupCode}
  </script>`;

    let styleContent = '';
    if (parsed.styles)
      for (const iterator of parsed.styles) {
        if (iterator.lang) {
          styleContent += `<style lang="${iterator.lang}" scoped>
          ${iterator.content}
    </style>`;
        } else {
          styleContent += `<style scoped>
          ${iterator.content}
    </style>`;
        }
      }
    const res = `<template>${template}
  </template>\n${transformedScript}\n${transformedScriptSetup}\n${styleContent}`;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fse.outputFile(filePath, res, () => {});
    return res;
  });
}

function walkSync(paramPath) {
  fs.readdirSync(paramPath, { withFileTypes: true }).forEach(function (dirent) {
    const filePath = path.join(paramPath, dirent.name);

    if (dirent.isFile() && /.vue/.test(dirent.name)) {
      fileWriteCallback(filePath);
    } else if (dirent.isDirectory()) {
      walkSync(filePath);
    }
  });
}

const rootPath = path.resolve(__dirname, `../../src/`);

function SfcTransformer(rootPath) {
  fs.readdirSync(rootPath, { withFileTypes: true }).forEach(function (dirent) {
    const filePath = path.join(rootPath, dirent.name);

    if (dirent.isFile() && /.vue/.test(dirent.name)) {
      fileWriteCallback(filePath);
    } else if (dirent.isDirectory()) {
      walkSync(filePath);
    }
  });
}

SfcTransformer(rootPath);
