/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper
 * PR合并后 该文件可以删除
 * */

declare global {
  interface Window {
    EyeDropper?: new () => {
      open(options?: EyeDropperOpenOptions): Promise<EyeDropperOpenResult | undefined>;
    };
  }
}

export interface EyeDropperOpenResult {
  sRGBHex: string;
}

export interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

export const getEyeDropper = () => {
  if (typeof window === 'undefined') return undefined;

  const EyeDropperClass = window.EyeDropper;
  if (EyeDropperClass === undefined) {
    // 浏览器不支持 EyeDropper 兼容性:https://developer.mozilla.org/zh-CN/docs/Web/API/EyeDropper#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7
    return undefined;
  }

  const eyeDropper = new EyeDropperClass();
  const originOpen = eyeDropper.open.bind(eyeDropper);
  eyeDropper.open = async (options?: EyeDropperOpenOptions) => {
    try {
      return await originOpen(options);
    } catch (e) {
      // 用户取消操作
      if (e instanceof DOMException && e.name === 'AbortError') {
        return undefined;
      }
      throw e;
    }
  };
  return eyeDropper;
};
