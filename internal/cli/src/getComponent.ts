/**
 * git 拉取组件源码 + 删除无关文件
 */

import { Command } from 'commander';
import degit from 'degit';
import * as path from 'path';
import * as fs from 'fs';
import { ensureDirSync } from 'fs-extra';
import { downloadNpmFile, log } from '../utils';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';

function cleanupUnnecessaryFiles(dirPath: string): void {
  const spinner = ora('🧹 开始清理无关文件...').start();

  // 要删除的文件夹名称
  const foldersToDelete = ['__tests__', '_example', '_example-ts', '_usage'];
  let deletedCount = 0;

  // 递归遍历目录
  function traverseDirectory(currentPath: string): void {
    if (!fs.existsSync(currentPath)) return;

    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // 检查是否是要删除的文件夹
        if (foldersToDelete.includes(item)) {
          spinner.text = `🗑️  删除文件夹: ${chalk.red(path.relative(dirPath, itemPath))}`;
          fs.rmSync(itemPath, { recursive: true, force: true });
          deletedCount++;
        } else {
          // 递归遍历子目录
          traverseDirectory(itemPath);
        }
      } else if (stat.isFile()) {
        // 检查是否是 .md 文件
        if (item.endsWith('.md')) {
          spinner.text = `🗑️  删除文件: ${chalk.red(path.relative(dirPath, itemPath))}`;
          fs.unlinkSync(itemPath);
          deletedCount++;
        }
      }
    }
  }

  traverseDirectory(dirPath);
  spinner.succeed(chalk.green(`✨ 清理完成！删除了 ${chalk.bold(deletedCount)} 个文件/文件夹`));
}

export async function getComponent(params: { destination: string; component: string }) {
  const destination = path.resolve(process.cwd(), params.destination);
  log(
    boxen(`📍 ${chalk.bold('目标路径:')} ${chalk.cyan(destination)}`, {
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
      borderStyle: 'single',
      borderColor: 'blue',
    }),
  );

  ensureDirSync(destination);
  const cloneSpinner = ora('📦 正在拉取源码...').start();
  const emitter = degit(`Tencent/tdesign-vue-next/packages/components/${params.component}#develop`, {
    cache: false,
    force: true,
    verbose: false,
  });

  await emitter.clone(destination);
  cloneSpinner.succeed(chalk.green('✅ 源码拉取完成'));
  cleanupUnnecessaryFiles(destination);
}
