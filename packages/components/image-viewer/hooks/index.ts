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
  /** 鼠标是否在图片上 */
  isOnImage?: boolean;
}

export interface ZoomResult {
  /** 新的位移值（用于替换，而不是累加） */
  newTranslate?: { translateX: number; translateY: number };
  /** 是否应该重置位移到原点（当缩放比例回到默认值时） */
  shouldResetTranslate?: boolean;
}

export function useScale(imageScale: ImageScale) {
  const params = { max: 2, min: 0.5, step: 0.2, defaultScale: 1, scaleFromMousePosition: false, ...imageScale };
  const { max, min, step, defaultScale, scaleFromMousePosition } = params;
  const scale = ref(defaultScale);

  /**
   * 计算缩放后的位移补偿
   *
   * CSS transform 执行顺序是：先 scale，再 translate
   * 所以当缩放后，需要调整 translate 来保持缩放中心不变
   *
   * 目标：保持固定的缩放中心点在屏幕上的位置不变
   *
   * 设：
   * - 缩放中心相对于容器中心的偏移：Z（即鼠标当前相对于容器中心的偏移）
   * - 容器中心：C
   * - 当前 translate：T
   * - 当前缩放：λ
   * - 新缩放：λ'
   *
   * 缩放中心的屏幕位置：
   *   zoomCenterScreen = C + Z
   *
   * 当前图片中心位置：
   *   P = C + T
   *
   * 缩放中心在图片坐标系中的位置：
   *   pointInImage = (zoomCenterScreen - P) / λ
   *               = (C + Z - (C + T)) / λ
   *               = (Z - T) / λ
   *
   * 变换后的图片中心位置：
   *   P' = C + newTranslate
   *
   * 变换后缩放中心在屏幕上的位置：
   *   zoomCenterScreen' = P' + λ' * pointInImage
   *                    = C + newTranslate + λ' * (Z - T) / λ
   *
   * 保持不变的条件：zoomCenterScreen' = zoomCenterScreen
   *   C + newTranslate + λ'/λ * (Z - T) = C + Z
   *   newTranslate = Z - λ'/λ * (Z - T)
   *   newTranslate = λ'/λ * T + (1 - λ'/λ) * Z
   *
   * 位移补偿：
   *   translateOffset = newTranslate - T
   *   translateOffset = (λ'/λ - 1) * T + (1 - λ'/λ) * Z
   *   translateOffset = scaleRatio * T + (1 - scaleRatio) * Z
   *   其中 scaleRatio = λ'/λ
   *
   * 特殊情况：
   * - 如果鼠标在图片上（isOnImage = true），则返回 undefined，保持以图片中心为基准的缩放
   * - 每次缩放都使用当前鼠标位置作为缩放中心，确保固定鼠标位置时缩放行为一致
   */
  const calculateTranslateOffset = (
    oldScale: number,
    newScale: number,
    options?: ZoomOptions,
  ): { translateX: number; translateY: number } | undefined => {
    // 鼠标在图片上时，使用原来的缩放方式（以图片中心为基准）
    if (options?.isOnImage) {
      return undefined;
    }

    // 鼠标在图片外，根据鼠标位置计算位移补偿
    if (!scaleFromMousePosition || !options?.mouseOffsetX || !options?.mouseOffsetY) {
      return undefined;
    }

    // 每次缩放都使用当前鼠标位置作为缩放中心
    // 这样可以确保：当鼠标位置固定时，每次缩放的基准点都是相同的
    const zoomCenterX = options.mouseOffsetX;
    const zoomCenterY = options.mouseOffsetY;

    const scaleRatio = newScale / oldScale;
    const currentTranslateX = options?.currentTranslate?.translateX ?? 0;
    const currentTranslateY = options?.currentTranslate?.translateY ?? 0;

    // 计算新的 translate 值，而不是 offset，避免累积误差
    // 公式: newTranslate = zoomCenter - scaleRatio * (zoomCenter - currentTranslate)
    const newTranslateX = zoomCenterX - scaleRatio * (zoomCenterX - currentTranslateX);
    const newTranslateY = zoomCenterY - scaleRatio * (zoomCenterY - currentTranslateY);

    return {
      translateX: newTranslateX,
      translateY: newTranslateY,
    };
  };

  const onZoomIn = (options?: ZoomOptions): ZoomResult => {
    const oldScale = scale.value;
    const result = positiveAdd(oldScale, step);
    const newScale = Math.min(result, max);
    setScale(newScale);

    // 如果缩放比例回到了默认值，需要重置位移
    const shouldResetTranslate = Math.abs(newScale - defaultScale) < 0.0001;

    return {
      newTranslate: calculateTranslateOffset(oldScale, newScale, options),
      shouldResetTranslate,
    };
  };

  const onZoomOut = (options?: ZoomOptions): ZoomResult => {
    const oldScale = scale.value;
    const result = positiveSubtract(oldScale, step);
    const newScale = Math.max(result, min);
    setScale(newScale);

    // 如果缩放比例回到了默认值，需要重置位移
    const shouldResetTranslate = Math.abs(newScale - defaultScale) < 0.0001;

    return {
      newTranslate: calculateTranslateOffset(oldScale, newScale, options),
      shouldResetTranslate,
    };
  };

  const resetScale = () => {
    scale.value = defaultScale;
  };

  const setScale = (newScale: number) => {
    let value = newScale;
    if (newScale < min) {
      value = min;
    }
    if (newScale > max) {
      value = max;
    }
    scale.value = value;
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
