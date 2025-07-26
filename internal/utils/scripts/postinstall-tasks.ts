import { parse } from 'yaml';
import { readFileSync, writeFileSync } from 'fs';
import { joinWorkspaceRoot } from '../src/paths';
import { run } from '../src/exec';

// 1. generate catalog.ts
const sourcePath = joinWorkspaceRoot('pnpm-workspace.yaml');
const destPath = joinWorkspaceRoot('internal/utils/src/deps.ts');
const yamlContent = readFileSync(sourcePath, 'utf-8');
const documents = parse(yamlContent);
writeFileSync(destPath, `export const deps = ${JSON.stringify(documents.catalogs, null, 2)}`);
run('npx prettier --write ./internal/utils/src/deps.ts', { cwd: joinWorkspaceRoot() });

// 2. rollup.config.ts
run('npx rollup -c rollup.config.ts', { cwd: joinWorkspaceRoot('internal/utils') });
