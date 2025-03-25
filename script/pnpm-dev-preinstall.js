const child_process = require('child_process');

function initSubmodule() {
  if (process.env.CI) {
    return;
  }
  try {
    child_process.execSync('git submodule update --init', { stdio: 'inherit' });
    console.log('子模块初始化成功');
  } catch (error) {
    console.error(`子模块初始化失败: ${error.message}`);
  }
}

initSubmodule();
