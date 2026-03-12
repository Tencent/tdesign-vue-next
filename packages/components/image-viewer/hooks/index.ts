import { positiveSubtract, positiveAdd } from '@tdesign/common-js/input-number/number';
import { ref, watch } from 'vue';
import { ImageScale } from '../type';

interface InitTransform {
  translateX: number;
  translateY: number;
}

export function useDrag(initTransform: InitTransform) {
  const transform = ref(initTransform);

  const mouseDownHandler = (e: MouseEvent) => {
    // only move by left mouse click
    if ('button' in e && e.button !== 0) return;

    const { pageX: startX, pageY: startY } = e;
    const { translateX, translateY } = transform.value;

    const mouseMoveHandler = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      transform.value = {
        translateX: translateX + pageX - startX,
        translateY: translateY + pageY - startY,
      };
    };

    const removeHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
    };

    const mouseUpHandler = () => removeHandler();
    const mouseLeaveHandler = () => removeHandler();

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);
  };

  const resetTransform = () => {
    transform.value = { ...initTransform };
  };

  return { transform, mouseDownHandler, resetTransform };
}

export function useMirror() {
  const mirror = ref(1);
  const onMirror = () => {
    mirror.value *= -1;
  };
  const resetMirror = () => {
    mirror.value = 1;
  };

  return { mirror, onMirror, resetMirror };
}

export interface ZoomOptions {
  /** 缩放中心点 X 坐标 */
  mouseOffsetX?: number;
  /** 缩放中心点 Y 坐标 */
  mouseOffsetY?: number;
  /** 当前位移 */
  currentTranslate?: { translateX: number; translateY: number };
}

export interface ZoomResult {
  /** 缩放后的新位移 */
  newTranslate?: { translateX: number; translateY: number };
}

export function useScale(imageScale: ImageScale) {
  const params = { max: 2, min: 0.5, step: 0.2, defaultScale: 1, ...imageScale };
  const { max, min, step, defaultScale } = params;
  const scale = ref(defaultScale);

  /**
   * 计算缩放后的位移补偿
   * 公式：newTranslate = scaleRatio * T + (1 - scaleRatio) * Z
   * 其中 Z 为缩放中心，T 为当前位移，scaleRatio = newScale / oldScale
   */
  const calculateTranslateOffset = (
    oldScale: number,
    newScale: number,
    options?: ZoomOptions,
  ): { translateX: number; translateY: number } | undefined => {
    // 缺少鼠标位置信息时，不计算位移补偿
    if (options?.mouseOffsetX == null || options?.mouseOffsetY == null) {
      return undefined;
    }

    const scaleRatio = newScale / oldScale;
    const { translateX = 0, translateY = 0 } = options?.currentTranslate ?? {};
    const { mouseOffsetX, mouseOffsetY } = options;

    return {
      translateX: scaleRatio * translateX + (1 - scaleRatio) * mouseOffsetX,
      translateY: scaleRatio * translateY + (1 - scaleRatio) * mouseOffsetY,
    };
  };

  const onZoomIn = (options?: ZoomOptions): ZoomResult => {
    const oldScale = scale.value;
    const result = positiveAdd(oldScale, step);
    const newScale = Math.min(result, max);
    setScale(newScale);

    return {
      newTranslate: calculateTranslateOffset(oldScale, newScale, options),
    };
  };

  const onZoomOut = (options?: ZoomOptions): ZoomResult => {
    const oldScale = scale.value;
    const result = positiveSubtract(oldScale, step);
    const newScale = Math.max(result, min);
    setScale(newScale);

    return {
      newTranslate: calculateTranslateOffset(oldScale, newScale, options),
    };
  };

  const resetScale = () => {
    scale.value = defaultScale;
  };

  const setScale = (newScale: number) => {
    scale.value = Math.max(min, Math.min(max, newScale));
  };

  watch(
    () => imageScale,
    () => resetScale(),
  );

  return { scale, onZoomIn, onZoomOut, resetScale };
}

export function useRotate() {
  const rotate = ref(0);
  const ROTATE_DEG = 90;

  const onRotate = () => {
    rotate.value += ROTATE_DEG;
  };
  const resetRotate = () => {
    rotate.value = 0;
  };

  return { rotate, onRotate, resetRotate };
}
