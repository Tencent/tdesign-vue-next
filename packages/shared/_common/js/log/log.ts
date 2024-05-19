/* eslint-disable no-console */
import { Log } from './types';

const logSet = new Set();

const log: Log = {
  warn(componentName, message): void {
    console.warn(`TDesign ${componentName} Warn: ${message}`);
  },
  warnOnce(componentName, message): void {
    const msgContent = `TDesign ${componentName} Warn: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.warn(msgContent);
  },
  error(componentName, message): void {
    console.error(`TDesign ${componentName} Error: ${message}`);
  },
  errorOnce(componentName, message): void {
    const msgContent = `TDesign ${componentName} Error: ${message}`;
    if (logSet.has(msgContent)) return;
    logSet.add(msgContent);
    console.error(msgContent);
  },
  info(componentName, message): void {
    console.info(`TDesign ${componentName} Info: ${message}`);
  },
};

export default log;
