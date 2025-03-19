import { execaCommand, SyncOptions } from 'execa';
import { getWorkspaceRoot } from './paths';

const run = async (command: string, options: SyncOptions = {}) => {
  const workspaceDir = await getWorkspaceRoot();
  const { stdout, stderr } = await execaCommand(command, {
    cwd: workspaceDir,
    stdio: 'inherit',
    ...options,
  });

  return { stdout, stderr };
};

export { run };
