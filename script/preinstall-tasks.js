const childProcess = require('child_process');

function initSubmodule() {
  if (process.env.CI) {
    return;
  }
  try {
    childProcess.execSync('git submodule update --init', { stdio: 'inherit' });
    console.log('submodule init success');
  } catch (error) {
    console.error(`submodule init failed: ${error.message}`);
  }
}

initSubmodule();
