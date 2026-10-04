import ts from 'typescript';
import { parse } from 'vue/compiler-sfc';

export const isWebcModule = (name: string): boolean =>
  /^(?:tdesign-web-components|@tdesign\/web-components(?:-chat)?|omi-vueify)(?:\/|$)/.test(name);

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
