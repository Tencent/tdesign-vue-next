function getToBeCreatedFiles(component) {
  // keys are directories, values are files.
  return {
    [`src/${component}`]: {
      desc: 'source code',
      files: [
        {
          file: 'index.ts',
          template: 'index.ts.tpl',
        },
        {
          file: `${component}.tsx`,
          template: 'component.tsx.tpl',
        },
      ],
    },
    [`examples/${component}`]: {
      desc: 'component API',
      files: [
        {
          file: `${component}.md`,
          template: 'component.md.tpl',
        },
      ],
    },
    [`examples/${component}/demos`]: {
      desc: 'component demo code',
      files: [
        {
          file: 'base.vue',
          template: 'base.demo.tpl',
        },
      ],
    },
    [`test/unit/${component}`]: {
      desc: 'unit test',
      files: ['index.test.js', 'demo.test.js']
    },
    [`test/e2e/${component}`]: {
      desc: 'e2e test',
      files: [`${component}.spec.js`],
    },
  };
}

module.exports = {
  getToBeCreatedFiles,
};
