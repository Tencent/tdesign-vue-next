import { execaCommand, SyncOptions } from 'execa';
import { getWorkSpaceRoot } from './paths-v2';

const run = async (command: string, options: SyncOptions = {}) => {
  const workspaceDir = await getWorkSpaceRoot();
  const { stdout, stderr } = await execaCommand(command, {
    cwd: workspaceDir,
    stdio: 'inherit',
    ...options,
  });

  return { stdout, stderr };
};

export { run };
