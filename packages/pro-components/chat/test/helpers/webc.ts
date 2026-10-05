import ts from 'typescript';
import { parse } from 'vue/compiler-sfc';

export const isWebcModule = (name: string): boolean =>
  /^(?:tdesign-web-components|@tdesign\/web-components(?:-chat)?|omi-vueify)(?:\/|$)/.test(name);

/** 每个一级组件目录为迁移单元，根入口 / 类型文件归入「.」。不绑定文件名或扩展名。 */
export const webcBudget = (references: Record<string, string[]>): Record<string, number> => {
  const budget: Record<string, number> = {};
  Object.entries(references).forEach(([file, modules]) => {
    const unit = file.includes('/') ? file.split('/')[0] : '.';
    budget[unit] = (budget[unit] || 0) + modules.length;
  });
  return budget;
};

export const exceededWebcBudget = (references: Record<string, string[]>, limits: Record<string, number>) =>
  Object.entries(webcBudget(references))
    .filter(([unit, count]) => count > (limits[unit] || 0))
    .map(([unit, count]) => ({ unit, count, limit: limits[unit] || 0 }));

/** 仅统计模块引用，避免把注释、文案当成依赖。包括类型、动态 import 和 require。 */
export const webcModules = (source: string, filename: string): string[] => {
  const scripts = filename.endsWith('.vue')
    ? (() => {
        const { descriptor } = parse(source);
        return [descriptor.script?.content, descriptor.scriptSetup?.content].filter(Boolean);
      })()
    : [source];
  const modules = new Set<string>();
  const add = (node: ts.Node | undefined) => {
    if (node && ts.isStringLiteralLike(node) && isWebcModule(node.text)) modules.add(node.text);
  };
  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) add(node.moduleSpecifier);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) add(node.argument.literal);
    if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === 'require'))
    ) {
      add(node.arguments[0]);
    }
    ts.forEachChild(node, visit);
  };
  scripts.forEach((script) => visit(ts.createSourceFile(filename, script, ts.ScriptTarget.Latest, true)));
  return [...modules].sort();
};
