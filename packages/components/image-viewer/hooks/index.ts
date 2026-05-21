import {
  ROTATE_DEG,
  calcResetRotation,
  toggleMirror,
  MIRROR_DEFAULT,
  clampScale,
  zoomIn,
  zoomOut,
} from '@tdesign/common-js/image-viewer/transform';
import type { ZoomOptions, ZoomResult, TranslateOffset } from '@tdesign/common-js/image-viewer/transform';
import { ref } from 'vue';
import { throttle } from 'lodash-es';
import { ImageScale } from '../type';
import { DEFAULT_IMAGE_SCALE } from '@tdesign/common-js/image-viewer/transform';

// 从 common 包重新导出类型，保持向后兼容
export type { ZoomOptions, ZoomResult, TranslateOffset };

interface InitTransform {
  translateX: number;
  translateY: number;
}

/**
 * 从 MouseEvent 或 TouchEvent 中提取统一的坐标
 */
function getEventCoords(e: MouseEvent | TouchEvent): { pageX: number; pageY: number } | undefined {
  if ('touches' in e) {
    // touch 事件：仅处理单指拖拽
    const touch = e.touches[0] || e.changedTouches[0];
    return touch ? { pageX: touch.pageX, pageY: touch.pageY } : undefined;
  }
  return { pageX: (e as MouseEvent).pageX, pageY: (e as MouseEvent).pageY };
}

export function useDrag(initTransform: InitTransform) {
  const transform = ref(initTransform);

  const pointerDownHandler = (e: MouseEvent | TouchEvent) => {
    // 鼠标事件只处理左键
    if ('button' in e && e.button !== 0) return;

    const startCoords = getEventCoords(e);
    if (!startCoords) return;
    const { pageX: startX, pageY: startY } = startCoords;
    const { translateX, translateY } = transform.value;

    const moveHandler = (e: MouseEvent | TouchEvent) => {
      const coords = getEventCoords(e);
      if (!coords) return;
      transform.value = {
        translateX: translateX + coords.pageX - startX,
        translateY: translateY + coords.pageY - startY,
      };
    };

    const removeHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      document.removeEventListener('mouseleave', leaveHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', upHandler);
      document.removeEventListener('touchcancel', upHandler);
    };

    const upHandler = () => removeHandler();
    const leaveHandler = () => removeHandler();

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    document.addEventListener('mouseleave', leaveHandler);
    // touch 事件：passive: false 以支持在需要时 preventDefault
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', upHandler);
    document.addEventListener('touchcancel', upHandler);
  };

  const resetTransform = () => {
    transform.value = { ...initTransform };
  };

  // 保持向后兼容：mouseDownHandler 指向同一个 handler
  return { transform, mouseDownHandler: pointerDownHandler, pointerDownHandler, resetTransform };
}

export function useMirror() {
  const mirror = ref(MIRROR_DEFAULT);
  const onMirror = () => {
    mirror.value = toggleMirror(mirror.value);
  };
  const resetMirror = () => {
    mirror.value = MIRROR_DEFAULT;
  };

  return { mirror, onMirror, resetMirror };
}

export function useScale(imageScale: Partial<ImageScale> | undefined) {
  const { max, min, step, defaultScale: rawDefault } = { ...DEFAULT_IMAGE_SCALE, ...imageScale };
  const defaultScale = clampScale(rawDefault, min, max);
  const scale = ref(defaultScale);
  const lastZoomResult = ref<ZoomResult>({});
  let pinchDistance = 0;

  // --- 节流（50ms，leading-only）：防止高频滚轮/触摸过度触发 ---
  const doZoomIn = throttle(
    (options: ZoomOptions | undefined) => {
      const { newScale, zoomResult } = zoomIn(scale.value, step, min, max, options);
      scale.value = newScale;
      lastZoomResult.value = zoomResult;
    },
    50,
    { leading: true, trailing: false },
  );

  const doZoomOut = throttle(
    (options: ZoomOptions | undefined) => {
      const { newScale, zoomResult } = zoomOut(scale.value, step, min, max, options);
      scale.value = newScale;
      lastZoomResult.value = zoomResult;
    },
    50,
    { leading: true, trailing: false },
  );

  const onZoomIn = (options?: ZoomOptions): ZoomResult => {
    const prevScale = scale.value;
    doZoomIn(options);
    // 被节流丢弃或已达边界 → 返回空结果，避免调用方使用过期的位移数据
    if (scale.value === prevScale) return {};
    return lastZoomResult.value;
  };

  const onZoomOut = (options?: ZoomOptions): ZoomResult => {
    const prevScale = scale.value;
    doZoomOut(options);
    // 被节流丢弃或已达边界 → 返回空结果，避免调用方使用过期的位移数据
    if (scale.value === prevScale) return {};
    return lastZoomResult.value;
  };

  const resetScale = () => {
    scale.value = defaultScale;
  };

  // 双指触摸缩放（pinch-to-zoom），与 React 端保持一致
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const [touch1, touch2] = Array.from(e.touches);
    pinchDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length !== 2) return;
    e.preventDefault();
    const [touch1, touch2] = Array.from(e.touches);
    const currentDistance = Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
    if (currentDistance > pinchDistance) {
      onZoomIn();
    } else {
      onZoomOut();
    }
    pinchDistance = currentDistance;
  };

  const onTouchEnd = () => {
    pinchDistance = 0;
  };

  return { scale, onZoomIn, onZoomOut, resetScale, onTouchStart, onTouchMove, onTouchEnd };
}

export function useRotate() {
  const rotate = ref(0);

  const onRotate = () => {
    rotate.value += ROTATE_DEG;
  };
  const resetRotate = () => {
    const adjusted = calcResetRotation(rotate.value);
    if (adjusted !== 0) {
      rotate.value -= adjusted;
    }
  };

  return { rotate, onRotate, resetRotate };
}
