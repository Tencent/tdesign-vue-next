/**
 * EyeDropper API 支持检测
 * @returns {boolean}
 */
export function isEyeDropperSupported() {
  return typeof window !== 'undefined' && 'EyeDropper' in window;
}

/**
 * 打开吸色器并获取颜色
 * @returns {Promise<string>} 返回 hex 格式颜色值（如 "#123456"）
 */
export async function pickColor() {
  if (!isEyeDropperSupported()) {
    throw new Error('EyeDropper API is not supported in this browser');
  }

  const eyeDropper = new window.EyeDropper();
  const result = await eyeDropper.open();
  return result.sRGBHex;
}
