import { ref } from 'vue';
import type { Ref } from 'vue';
import { calcSize } from '@tdesign/common-js/utils/responsive';
import { useListener } from '../../hooks/useListener';
import { isServer } from '../../utils/dom';
import { GutterObject } from '../type';
/**
 * rowSizeHook
 * @returns
 */
export function useRowSize() {
  const size = ref(calcSize(isServer ? 0 : window.innerWidth));
  const updateSize = () => {
    size.value = calcSize(isServer ? 0 : window.innerWidth);
  };

  useListener('resize', updateSize);

  return size as unknown as Ref<keyof GutterObject>;
}
