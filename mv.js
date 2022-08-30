const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// const scripts = {
//   example: ``,
// };

function getComponentsName(dir) {
  const arr = fs.readdirSync(dir);
  const target = [];
  arr.forEach((item) => {
    const filePath = path.join(dir, item);
    if (fs.lstatSync(filePath).isDirectory()) {
      target.push(item);
    }
  });
  return target;
}

const comps = [...new Set(getComponentsName('src'))];
console.log(comps);

async function gitMv(comp, source, destination) {
  if (fs.existsSync(source) && fs.existsSync(`src/${comp}`)) {
    const script = `git mv ${source} ${destination}`;
    const { stderr } = await exec(script);
    if (stderr) {
      console.error('stderr:', stderr);
    }
  }
}

comps.forEach(async (comp) => {
  // examples
  //   await gitMv(comp, `examples/${comp}/demos/`, `src/${comp}/_example`);
  // usage
  //   await gitMv(comp, `examples/${comp}/usage/`, `src/${comp}/_usage`);
  // md
  //   await gitMv(comp, `examples/${comp}/*.md`, `src/${comp}/`);
  // unit
  await gitMv(comp, `test/unit/${comp}/`, `src/${comp}/__tests__`);
});

// git clean -fd
