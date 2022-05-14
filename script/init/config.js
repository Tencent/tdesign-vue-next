function getToBeCreatedFiles(component) {
  // keys are directories, values are files.
  // desc - directory description
  // files - will be created
  // dirDeletable - if this directory can be deleted.
  return {
    [`src/${component}`]: {
      desc: 'component source code',
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
      files: [
        {
          file: 'index.test.js',
          template: 'index.test.tpl',
        },
        {
          file: 'demo.test.js',
          template: 'demo.test.tpl',
        },
      ],
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
