import { getComponentsRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';
import { promises, readdirSync, statSync } from 'fs';
import path from 'path';

import type { ViteDevServer } from 'vite';
import type { ComponentLog, ComponentLogMap, LogItem, Logs, LogType, VersionLog } from './types';

const outputPath = joinTdesignVueNextRoot('site/dist/changelog.json');
const changelogPath = joinTdesignVueNextRoot('CHANGELOG.md');
const componentsDir = getComponentsRoot();

const EXCLUDED_DIR = ['locale', 'style'];
const COMP_LIST = getComponentList();

export const LOG_TYPES = ['🚨 Breaking Changes', '🚀 Features', '🐞 Bug Fixes'];

export default function changelog2Json() {
  return {
    name: 'changelog-to-json',
    configureServer(server: ViteDevServer) {
      // 开发模式时拦截请求
      server.middlewares.use('/changelog.json', async (_, res) => {
        const json = await generateChangelogJson();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
      });
    },
    async closeBundle() {
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV === 'production') {
        const json = await generateChangelogJson();
        await promises.writeFile(outputPath, JSON.stringify(json));
      }
    },
  };
}

async function generateChangelogJson() {
  try {
    const logMd = await promises.readFile(changelogPath, 'utf-8');
    const detailedLogs = parseMd2Json(logMd);
    const compMap = formatJson2CompMap(detailedLogs);
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', '✅ Sync CHANGELOG.md to changelog.json');
    return compMap;
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Fail to generate changelog.json', '\x1b[33m', error);
    return {};
  }
}

/**
 * 将整份 Markdown 先根据版本号拆分
 */
function parseMd2Json(logMd: string) {
  const headerRegex = /^\s*##\s*🌈\s*(\d+\.\d+\.\d+)\s+`(\d{4}-\d{2}-\d{2})`\s*$/gm;
  const matches = Array.from(logMd.matchAll(headerRegex));

  const logs = matches.map((match, i) => {
    const version = match[1];
    const date = match[2];

    const start = match.index + match[0].length;
    const end = i < matches.length - 1 ? matches[i + 1].index : logMd.length;
    const log = logMd.slice(start, end).trim();

    return {
      version,
      date,
      log: parseLogByType(log),
    };
  });

  return logs;
}

/**
 * 进一步根据指定的变更类型拆分
 */
function parseLogByType(logBlock: string) {
  const logs: Logs = {};

  LOG_TYPES.forEach((type) => {
    const typeRegex = new RegExp(`### ${type}\\r?\\n([\\s\\S]+?)(?=### |$)`, 'g');
    const matches = Array.from(logBlock.matchAll(typeRegex));

    if (matches.length > 0) {
      const logBlock = matches.map((match) => match[1]).join('\n');
      const entries = extractLogEntries(logBlock);
      logs[type] = groupLogByComponent(entries);
    }
  });

  return logs;
}

/**
 * 获取每种变更类型里面的每一段日志
 * - case 1: 单独一行 -> 作为一条
 * - case 2: 存在父子列表 -> 使用换行符，合并为一条
 */
function extractLogEntries(logBlock: string) {
  const lines = logBlock.split('\n').filter((line) => line.trim() !== '');
  const logs: string[] = [];

  let currEntry = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过空行
    if (!line) continue;

    // 是否为子项（短横线前面有空格）
    const isChildEntry = /^\s+-/.test(lines[i]);

    // 是否为父项（直接以短横线开头）
    const isParentEntry = line.startsWith('-') && !isChildEntry;

    if (isParentEntry) {
      // 如果是父项，保存之前的日志
      if (currEntry) {
        logs.push(currEntry.trim());
      }
      // 开始新项，去掉开头的 -
      currEntry = line.substring(1).trim();
    } else if (isChildEntry) {
      // 如果是子项，添加到当前项中
      const childContent = line.replace(/^\s*-\s*/, '').trim();
      currEntry += `\n${childContent}`;
    }
  }

  // 处理最后一项
  logs.push(currEntry.trim());
  return logs;
}

/**
 * 根据每一条日志提及的组件名，将其归类
 */
function groupLogByComponent(entries: string[]) {
  const logs: LogItem[] = [];

  const compRegex = /`([^`]+)`/g;
  entries.forEach((entry) => {
    // 使用 Set 去重
    const components = [
      ...new Set(
        Array.from(entry.matchAll(compRegex))
          // 所有反引号包裹的字符
          .map((match) => match[1])
          // 过滤无效组件名
          .filter((name) => COMP_LIST.includes(name)),
      ),
    ];

    // 移除冒号前面的总结部分
    const description = entry.replace(/^[^:]+[:]\s*/, '');

    // 如果一条日志提到了多个组件，则每个组件都插入一条对应的日志
    components.forEach((component) => {
      logs.push({
        component,
        description,
      });
    });
  });

  return logs;
}

/**
 * 将解析后的日志 JSON 转换为以组件名作为 key 的映射格式
 */
function formatJson2CompMap(logJson: VersionLog[]) {
  const compMap: ComponentLogMap = {};

  logJson.forEach((entry) => {
    const { version, date, log } = entry;

    (Object.keys(log) as LogType[]).forEach((type) => {
      log[type].forEach((item: LogItem) => {
        const { component, description } = item;

        if (!compMap[component]) {
          compMap[component] = [];
        }

        // 查找当前组件的版本记录
        let versionEntry = compMap[component].find((v) => v.version === version);

        if (!versionEntry) {
          versionEntry = {
            version,
            date,
          } as ComponentLog;
          compMap[component].push(versionEntry);
        }

        if (!versionEntry[type]) {
          versionEntry[type] = [];
        }
        versionEntry[type].push(description);
      });
    });
  });

  // 按组件名字母顺序排序
  const sortedCompMap = Object.keys(compMap)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => ({ ...acc, [key]: compMap[key] }), {});

  return sortedCompMap as ComponentLogMap;
}

/**
 * 使组件名符合帕斯卡命名规范
 */
function convert2PascalCase(str: string) {
  return str
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * 生成可用的组件名列表
 */
function getComponentList() {
  const compList: string[] = [];
  const files = readdirSync(componentsDir);
  files.forEach((file) => {
    const filePath = path.join(componentsDir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory() && !EXCLUDED_DIR.includes(file)) {
      const componentName = convert2PascalCase(file);
      compList.push(componentName);
    }
  });
  return compList;
}
