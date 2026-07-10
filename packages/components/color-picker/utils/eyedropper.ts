/**
 * 浏览器原生 EyeDropper API 封装
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper
 *
 * TODO: 待 tdesign-common 配套 PR（吸色工具函数）合并且 submodule 更新后，
 * 删除本文件并改为从 '@tdesign/common-js/color-picker/index' 导入。
 */

export interface OpenEyeDropperOptions {
  /** 用于中断取色过程（如组件卸载时） */
  signal?: AbortSignal;
}

interface NativeEyeDropper {
  open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}

/**
 * 检测当前环境是否支持 EyeDropper API。
 * 使用 globalThis 以兼容 SSR / Web Worker 等无 window 环境。
 */
export function isEyeDropperSupported(): boolean {
  return typeof (globalThis as { EyeDropper?: unknown }).EyeDropper === 'function';
}

/**
 * 调起系统吸色器。
 * @returns 用户选中的颜色（小写 `#rrggbb`，与 `<input type="color">` 的 value 语义一致）；
 * 环境不支持、用户取消（Esc / AbortSignal）或取色失败时返回 `null`，调用方无需 try/catch。
 */
export async function openEyeDropper(options?: OpenEyeDropperOptions): Promise<string | null> {
  if (!isEyeDropperSupported()) return null;
  const EyeDropperCtor = (globalThis as unknown as { EyeDropper: new () => NativeEyeDropper }).EyeDropper;
  try {
    const { sRGBHex } = await new EyeDropperCtor().open(options?.signal ? { signal: options.signal } : undefined);
    // 规范未强制 sRGBHex 的大小写，统一转小写便于比较与存储
    return sRGBHex.toLowerCase();
  } catch {
    // AbortError（用户取消/中断）与并发取色冲突等场景统一按“未取到色”处理
    return null;
  }
}
