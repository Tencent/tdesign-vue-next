import { ref, watch } from '@td/adapter-vue';
import type { ImageScale } from '@td/intel/image-viewer/type';
import { positiveAdd, positiveSubtract } from '@td/common/js/input-number/number';

interface InitTransform {
  translateX: number;
  translateY: number;
}

export function useDrag(initTransform: InitTransform) {
  const transform = ref(initTransform);

  const mouseDownHandler = (e: MouseEvent) => {
    const { pageX: startX, pageY: startY } = e;
    const { translateX, translateY } = transform.value;
    const mouseMoveHandler = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      transform.value = {
        translateX: translateX + pageX - startX,
        translateY: translateY + pageY - startY,
      };
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
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

export function useScale(imageScale: ImageScale = { max: 2, min: 0.5, step: 0.5 }) {
  const { max, min, step, defaultScale } = imageScale;
  const scale = ref(defaultScale ?? 1);
  const onZoomIn = () => {
    const result = positiveAdd(scale.value, step);
    setScale(result);
  };
  const onZoomOut = () => {
    const result = positiveSubtract(scale.value, step);
    setScale(result);
  };
  const resetScale = () => {
    scale.value = defaultScale ?? 1;
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
