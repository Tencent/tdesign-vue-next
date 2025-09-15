import { Command } from 'commander';
import chalk from 'chalk';
import boxen from 'boxen';
import { log } from './utils';
import { getComponent } from './src/getComponent';
import { getCss } from './src/getCss';

interface CreateOptions {
  destination?: string;
  component?: string;
}

const program = new Command();

program.name('@tdesign/internal-cli').description('TDesign internal CLI tool').version('1.0.0');

program
  .option('-c, --component <component>', 'component')
  .option('-d, --destination <path>', 'destination path')
  .action(async (options: CreateOptions) => {
    // 显示欢迎信息
    const welcomeArt = [
      chalk.cyan.bold('╔══════════════════════════════════════╗'),
      chalk.cyan.bold('║') + chalk.white.bold('        🎨 TDesign CLI 工具          ') + chalk.cyan.bold('║'),
      chalk.cyan.bold('║') + chalk.white('                                      ') + chalk.cyan.bold('║'),
      chalk.cyan.bold('║') + chalk.white('    ✨ 快速拉取 TDesign 组件         ') + chalk.cyan.bold('║'),
      chalk.cyan.bold('║') + chalk.white('    🚀 Native AI              ') + chalk.cyan.bold('║'),
      chalk.cyan.bold('╚══════════════════════════════════════╝'),
    ].join('\n');
    const { destination, component } = options;
    log('\n' + welcomeArt + '\n');
    try {
      await getComponent({ destination, component });
      await getCss({ destination, component });
      log(
        boxen(
          chalk.green.bold('🎉 任务完成！') + '\n\n' + chalk.white(`组件已成功拉取到: ${chalk.cyan(destination)}`),
          {
            padding: 1,
            margin: { top: 1, bottom: 0, left: 0, right: 0 },
            borderStyle: 'double',
            borderColor: 'green',
          },
        ),
      );
    } catch (error) {
      log(
        boxen(
          chalk.red.bold('💥 错误信息:') + '\n\n' + chalk.white(error instanceof Error ? error.message : String(error)),
          {
            padding: 1,
            margin: { top: 1, bottom: 0, left: 0, right: 0 },
            borderStyle: 'single',
            borderColor: 'red',
          },
        ),
      );

      process.exit(1);
    }
  });

program.parse(process.argv);
