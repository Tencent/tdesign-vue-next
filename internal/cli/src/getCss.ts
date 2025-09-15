/**
 * 从 npm 仓库拉取 css
 */

import * as path from 'path';
import { downloadNpmFile } from '../utils';
import chalk from 'chalk';
import ora from 'ora';

export async function getCss(params: { destination: string; component: string }) {
  // 从 npm 拉取 css 到 style 目录
  const downloadSpinner = ora('📥 正在下载样式文件...').start();
  await downloadNpmFile({
    packageName: 'tdesign-vue-next@latest',
    filePathInPackage: `es/${params.component}/style/index.css`,
    localDir: path.join(params.destination, 'style'),
    localFileName: 'index.css',
  });
  downloadSpinner.succeed(chalk.green('✅ 样式文件下载完成'));
}
