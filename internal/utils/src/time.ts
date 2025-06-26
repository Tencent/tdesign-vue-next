/**
 * 延迟指定时间后解析的 Promise
 * @param ms 等待的毫秒数
 * @returns 一个在指定时间后解析的 Promise
 */
export const sleep = (ms = 16): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
