import { joinWorkspaceRoot } from '../src/paths';
import { run } from '../src/exec';

// rollup.config.ts
run('npx rollup -c rollup.config.ts', { cwd: joinWorkspaceRoot('internal/utils') });
