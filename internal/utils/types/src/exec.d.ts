import { SyncOptions } from 'execa';
declare const run: (command: string, options?: SyncOptions) => Promise<{
    stdout: string;
    stderr: string;
}>;
export { run };
