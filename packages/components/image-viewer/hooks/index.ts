import { positiveSubtract, positiveAdd } from '@tdesign/common-js/input-number/number';
import { ref, watch } from 'vue';
import { ImageScale } from '../type';
import { throttle } from 'lodash-es';

interface InitTransform {
  translateX: number;
  translateY: number;
}

export function useDrag(initTransform: InitTransform) {
  const transform = ref(initTransform);

  const mouseDownHandler = (e: MouseEvent) => {
    // only move by left mouse click
    if (e.button !== 0) return;

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

export function useScale(imageScale: ImageScale) {
  const params = { max: 2, min: 0.5, step: 0.2, defaultScale: 1, ...imageScale };
  const { max, min, step, defaultScale } = params;
  const scale = ref(defaultScale);

  const onZoomIn = throttle(() => {
    const result = positiveAdd(scale.value, step);
    setScale(result);
  }, 50);

  const onZoomOut = throttle(() => {
    const result = positiveSubtract(scale.value, step);
    setScale(result);
  }, 50);

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
