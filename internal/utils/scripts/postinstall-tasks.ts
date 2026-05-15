import { parse } from 'yaml';
import { readFileSync, writeFileSync } from 'fs';
import { joinWorkspaceRoot } from '../src/paths';
import { run } from '../src/exec';

// 1. generate catalog.ts
const CATALOG_PATH = './internal/utils/src/catalogs.ts';
const sourcePath = joinWorkspaceRoot('pnpm-workspace.yaml');
const destPath = joinWorkspaceRoot(CATALOG_PATH);
const yamlContent = readFileSync(sourcePath, 'utf-8');
const documents = parse(yamlContent);
writeFileSync(destPath, `export const catalogs = ${JSON.stringify(documents.catalogs, null, 2)}`);
run(`pnpm exec prettier --write ${CATALOG_PATH}`, { cwd: joinWorkspaceRoot() });

// 2. rollup.config.ts
run('pnpm exec rollup -c rollup.config.ts', { cwd: joinWorkspaceRoot('internal/utils') });
