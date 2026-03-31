import type { ImageScale } from '../type';

/** ImageScale 的默认值，所有使用处应引用此常量，避免多处声明不一致 */
export const DEFAULT_IMAGE_SCALE: ImageScale = {
  max: 2,
  min: 0.5,
  step: 0.5,
  defaultScale: 1,
};
