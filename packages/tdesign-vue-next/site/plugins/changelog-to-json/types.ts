import { LOG_TYPES } from '.';

export type LogType = typeof LOG_TYPES[number];

type LogMetadata = {
  version: string;
  date: string;
};

export type LogItem = {
  component: string;
  description: string;
};

export type Logs = {
  [K in LogType]?: LogItem[];
};

export type VersionLog = LogMetadata & {
  log: Logs;
};

export type ComponentLog = LogMetadata & {
  [K in LogType]?: string[];
};

export type ComponentLogMap = Record<string, ComponentLog[]>;
