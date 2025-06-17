import { promises, readdirSync, statSync } from 'fs';
import path from 'path';
import { joinTdesignVueNextRoot, getComponentsRoot } from '@tdesign/internal-utils';
import type { ViteDevServer } from 'vite';

const outputPath = joinTdesignVueNextRoot('site/dist/changelog.json');
const changelogPath = joinTdesignVueNextRoot('CHANGELOG.md');
const componentsDir = getComponentsRoot();

const excludedDir = ['_util', 'common', 'hooks', 'locale', 'style'];

const LOG_TYPES = ['❗ Breaking Changes', '🚀 Features', '🐞 Bug Fixes'];

type LogType = Record<string, string | string[] | { component: string; description: string }[]>;
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
      // eslint-disable-next-line no-console
      console.log('✅ Sync CHANGELOG.md to JSON endpoint');
    },
    async closeBundle() {
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV === 'production') {
        const json = await generateChangelogJson();
        await promises.writeFile(outputPath, JSON.stringify(json));
        // eslint-disable-next-line no-console
        console.log('✅ Generate changelog.json in dist');
      }
    },
  };
}

async function generateChangelogJson() {
  const md = await promises.readFile(changelogPath, 'utf-8');
  const parsedResult = parseMd2Json(md);
  const compMap = formatJson2CompMap(parsedResult);
  return compMap;
}

/**
 * 将整份 Markdown 先根据版本号拆分
 * @returns
 * [{
 *   version: '',
 *   date: '',
 *   log: ''
 * }]
 */
function parseMd2Json(logMd: string) {
  const lines = logMd.split('\n');
  const result = [];
  let currentEntry = null;
  let currentLogContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headerMatch = line.match(/^\s*##\s*🌈\s*(\d+\.\d+\.\d+)\s+`(\d{4}-\d{2}-\d{2})`\s*/);

    if (headerMatch) {
      if (currentEntry) {
        currentEntry.log.push(currentLogContent.trim());
        result.push(currentEntry);
      }

      currentEntry = {
        version: headerMatch[1],
        date: headerMatch[2],
        log: [],
      };
      currentLogContent = '';
    } else if (currentEntry && line && !line.startsWith('## ')) {
      // 在当前条目存在且不是新的主标题时，添加内容进 `log`
      currentLogContent += `\n${line}`;
    }
  }

  const logJson = result.map((entry) => ({
    ...entry,
    log: entry.log.join('\n'),
  }));

  return processLogContent(logJson);
}

/**
 * 进一步将 log 根据变更类型拆分
 * @returns
 * [{
 *   version: '',
 *   date: '',
 *   log: {
 *    '🚀 Features': ''
 *    '🐞 Bug Fixes': ''
 * }]
 */
function processLogContent(logJson: Array<{ version: string; date: string; log: string }>) {
  return logJson.map((entry) => {
    const originalLog = entry.log;
    const log: LogType = {};

    LOG_TYPES.forEach((type) => {
      const regex = new RegExp(`### ${type}\\r?\\n([\\s\\S]+?)(?=### |$)`, 'g');
      const matches = [...originalLog.matchAll(regex)];

      if (matches.length > 0) {
        log[type] = matches.map((match) => match[1]).join('\n');
        log[type] = processLogItem(log[type]);
        log[type] = categorizeLogByComp(log[type]);
      }
    });

    return {
      version: entry.version,
      date: entry.date,
      log,
    };
  });
}

/**
 * 处理具体的一段日志
 * @returns
 * [{
 *   version: '',
 *   date: '',
 *   log: {
 *    '🚀 Features': ['', '']
 *    '🐞 Bug Fixes': ['', '']
 * }]
 */
function processLogItem(logItem: string) {
  if (!logItem || !logItem.trim()) return [];

  const lines = logItem.split(/\r?\n/).filter((line) => line.trim());
  const result = [];
  let currentItem = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过空行
    if (!line) continue;

    // 判断是否为父项（直接以短横线开头，或者是第一行且不以空格开头）
    const isParentItem = line.startsWith('-') && !/^\s+-/.test(lines[i]);

    // 判断是否为子项（短横线前面有空格）
    const isChildItem = /^\s+-/.test(lines[i]);

    if (isParentItem) {
      // 如果是父项，先保存之前的项目
      if (currentItem) {
        result.push(currentItem.trim());
      }
      // 开始新项，去掉开头的 -
      currentItem = line.substring(1).trim();
    } else if (isChildItem) {
      // 如果是子项，添加到当前项中
      const childContent = line.replace(/^\s*-\s*/, '').trim();
      if (childContent) {
        currentItem += `\n${childContent}`;
      }
    }
  }

  // 将最后一个正在处理的项存入结果
  if (currentItem.trim()) {
    result.push(currentItem.trim());
  }

  return result;
}

// 统一转驼峰
function convert2CamelCase(str: string) {
  return str
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * 生成可用的组件名列表
 */
function generateCompList() {
  const compList: Array<string> = [];
  const files = readdirSync(componentsDir);
  files.forEach((file) => {
    const filePath = path.join(componentsDir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory() && !excludedDir.includes(file)) {
      const componentName = convert2CamelCase(file);
      compList.push(componentName);
    }
  });
  return compList;
}

/**
 * 根据组件名进行分类
 * @returns
 * [{
 *   version: '',
 *   date: '',
 *   log: {
 *    '🚀 Features': [
 *         {
 *           component: 'Button'
 *           description: ''
 *         }
 *    ]
 * }]
 */
function categorizeLogByComp(log: Array<string>) {
  if (!log || !Array.isArray(log)) return [];

  const compList = generateCompList();
  const categorizedLogs: Array<{ component: string; description: string }> = [];

  log.forEach((logItem) => {
    const matches = logItem.match(/`([^`]+)`/g); // 提取反引号包裹的内容
    const components = matches
      ? Array.from(
          new Set(
            matches
              .map((name: string) => convert2CamelCase(name.replace(/`/g, '').trim()))
              .filter((name: string) => compList.includes(name)),
          ),
        ) // 使用 Set 去重
      : [];

    const cleanLog = (logItem: string) =>
      // 移除冒号前面的组件名字（容错处理中英文情况）
      logItem.replace(/^[^:：]+[:：]\s*/, '');

    if (components.length > 0) {
      // 如果一条日志提到了多个组件，则每个组件都插入一条对应的日志
      components.forEach((component) => {
        categorizedLogs.push({
          component,
          description: cleanLog(logItem),
        });
      });
    }
  });

  return categorizedLogs;
}

/**
 *
 * 将解析后的日志 JSON 转换为以组件名作为 key 的映射格式
 * @returns
 * {
 *  Button:[{
 *  version: '',
 *  date: '',
 *   '🚀 Features': ['', '']
 *   }]
 * }
 */
function formatJson2CompMap(logJson: Array<{ version: string; date: string; log: any }>) {
  if (!logJson || !Array.isArray(logJson)) return {};

  const compMap: Record<string, Record<string, any>[]> = {};

  logJson.forEach((entry) => {
    const { version, date, log } = entry;

    Object.keys(log).forEach((type) => {
      log[type].forEach((item: Record<string, string>) => {
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
            [type]: [],
          };
          compMap[component].push(versionEntry);
        }

        // 添加日志到对应的类型
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

  return sortedCompMap;
}
