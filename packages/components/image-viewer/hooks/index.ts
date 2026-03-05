import { positiveSubtract, positiveAdd } from '@tdesign/common-js/input-number/number';
import { ref, watch } from 'vue';
import { ImageScale } from '../type';

interface InitTransform {
  translateX: number;
  translateY: number;
}

interface DragOptions {
  maxTranslateX?: number;
  maxTranslateY?: number;
}

export function useDrag(
  initTransform: InitTransform,
  onDragStart?: () => void,
  onDragEnd?: (distance: number) => void,
  options?: DragOptions,
) {
  const transform = ref(initTransform);

  const mouseDownHandler = (e: MouseEvent) => {
    // only move by left mouse click
    if ('button' in e && e.button !== 0) return;

    const { pageX: startX, pageY: startY } = e;
    const { translateX, translateY } = transform.value;
    let totalDistance = 0;

    onDragStart?.();

    const mouseMoveHandler = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      const deltaX = pageX - startX;
      const deltaY = pageY - startY;

      // 计算移动距离
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      totalDistance = distance;

      let newTranslateX = translateX + deltaX;
      let newTranslateY = translateY + deltaY;

      // 应用边界限制
      if (options?.maxTranslateX !== undefined) {
        newTranslateX = Math.max(-options.maxTranslateX, Math.min(options.maxTranslateX, newTranslateX));
      }
      if (options?.maxTranslateY !== undefined) {
        newTranslateY = Math.max(-options.maxTranslateY, Math.min(options.maxTranslateY, newTranslateY));
      }

      transform.value = {
        translateX: newTranslateX,
        translateY: newTranslateY,
      };
    };

    const removeHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
      onDragEnd?.(totalDistance);
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
  /** 鼠标相对于容器中心的 X 偏移 */
  mouseOffsetX?: number;
  /** 鼠标相对于容器中心的 Y 偏移 */
  mouseOffsetY?: number;
  /** 当前的位移值 */
  currentTranslate?: { translateX: number; translateY: number };
}

export interface ZoomResult {
  /** 新的位移值（用于替换，而不是累加） */
  newTranslate?: { translateX: number; translateY: number };
}

export function useScale(imageScale: ImageScale) {
  const params = { max: 2, min: 0.5, step: 0.2, defaultScale: 1, scaleFromMousePosition: false, ...imageScale };
  const { max, min, step, defaultScale, scaleFromMousePosition } = params;
  const scale = ref(defaultScale);

  /**
   * 计算缩放后的位移补偿，保持鼠标指向的图片内容在屏幕上的位置不变
   *
   * 公式推导：设 Z = 缩放中心(鼠标位置)，T = 当前位移，λ'/λ = scaleRatio
   * newTranslate = scaleRatio * T + (1 - scaleRatio) * Z
   */
  const calculateTranslateOffset = (
    oldScale: number,
    newScale: number,
    options?: ZoomOptions,
  ): { translateX: number; translateY: number } | undefined => {
    if (!scaleFromMousePosition || options?.mouseOffsetX == null || options?.mouseOffsetY == null) {
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
