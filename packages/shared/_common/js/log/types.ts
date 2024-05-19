export type LogFunction = (
  componentName: string,
  message: string,
) => void;

export interface Log {
  warn: LogFunction;
  warnOnce: LogFunction;
  error: LogFunction;
  errorOnce: LogFunction;
  info: LogFunction;
}
