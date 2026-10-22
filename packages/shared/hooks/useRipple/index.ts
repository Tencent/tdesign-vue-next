import { onMounted, onUnmounted, Ref } from 'vue';
import { bindRipple } from '@tdesign/common-js/utils/ripple';
import { useKeepAnimation } from '../useKeepAnimation';
import { usePrefixClass } from '../useConfig';

/**
 * 为节点挂上斜八角按压波纹动画。
 * 波纹颜色优先使用参数 `rippleColor`。
 * 未传入时依次读取节点的 `data-ripple` 和 CSS 变量 `--ripple-color`。
 */
export function useRipple(el?: Ref<HTMLElement | undefined> | null, rippleColor?: Ref<string>) {
  const classPrefix = usePrefixClass();
  const { keepRipple } = useKeepAnimation();

  let dispose: (() => void) | undefined;

  onMounted(() => {
    const dom = el?.value;
    if (!dom) return;

    dispose = bindRipple(dom, () => ({
      classPrefix: classPrefix.value,
      enable: keepRipple.value,
      rippleColor: rippleColor?.value,
    }));
  });

  onUnmounted(() => {
    dispose?.();
  });
}
