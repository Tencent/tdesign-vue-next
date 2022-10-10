import { ref, onMounted, onUnmounted, Ref } from 'vue';
import useKeepAnimation from './useKeepAnimation';
import { usePrefixClass } from './useConfig';
import setStyle from '../utils/set-style';

const period = 200;
const noneRippleBg = 'rgba(0, 0, 0, 0)';
const defaultRippleColor = 'rgba(0, 0, 0, 0.35)';

// 设置动画颜色 get the ripple animation color
const getRippleColor = (el: HTMLElement, fixedRippleColor?: string) => {
  // get fixed color from params
  if (fixedRippleColor) {
    return fixedRippleColor;
  }
  // get dynamic color from the dataset
  if (el?.dataset?.ripple) {
    const rippleColor = el.dataset.ripple;
    return rippleColor;
  }
  // use css variable
  const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
  if (cssVariable) {
    return cssVariable;
  }
  return defaultRippleColor;
};

/**
 * 斜八角动画hooks 支持三种方式使用
 * 1. fixedRippleColor 固定色值 useRipple(ref,fixedRippleColor);
 * 2. dynamicColor 动态色值 data.ripple="rippleColor" useRipple(ref)
 * 3. CSS variables（recommended） 配合节点对应CSS设置 --ripple-color useRipple(ref)
 * @param ref 需要使用斜八角动画的DOM
 * @param fixedRippleColor 斜八角的动画颜色
 */
export default function useRipple(el: Ref<HTMLElement>, fixedRippleColor?: Ref<string>) {
  const rippleContainer = ref(null);
  const classPrefix = usePrefixClass();

  // 全局配置ripple
  const { keepRipple } = useKeepAnimation();

  // 为节点添加斜八角动画 add ripple to the DOM and set up the animation
  const handleAddRipple = (e: MouseEvent) => {
    const dom = el.value;
    const rippleColor = getRippleColor(dom, fixedRippleColor?.value);
    if (e.button !== 0 || !el || !keepRipple) return;

    if (
      dom.classList.contains(`${classPrefix.value}-is-active`) ||
      dom.classList.contains(`${classPrefix.value}-is-disabled`) ||
      dom.classList.contains(`${classPrefix.value}-is-checked`) ||
      dom.classList.contains(`${classPrefix.value}-is-loading`)
    )
      return;

    const elStyle = getComputedStyle(dom);

    const elBorder = parseInt(elStyle.borderWidth, 10);
    const border = elBorder > 0 ? elBorder : 0;
    const width = dom.offsetWidth;
    const height = dom.offsetHeight;

    if (rippleContainer.value.parentNode === null) {
      setStyle(rippleContainer.value, {
        position: 'absolute',
        left: `${0 - border}px`,
        top: `${0 - border}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: elStyle.borderRadius,
        pointerEvents: 'none',
        overflow: 'hidden',
      });
      dom.appendChild(rippleContainer.value);
    }
    // 新增一个ripple
    const ripple = document.createElement('div');

    setStyle(ripple, {
      marginTop: '0',
      marginLeft: '0',
      right: `${width}px`,
      width: `${width + 20}px`,
      height: '100%',
      transition: `transform ${period}ms cubic-bezier(.38, 0, .24, 1), background ${period * 2}ms linear`,
      transform: 'skewX(-8deg)',
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: 0,
      backgroundColor: rippleColor,
      opacity: '0.9',
    });

    // fix zIndex：避免遮盖内部元素
    const elMap = new WeakMap();
    for (let n = dom.children.length, i = 0; i < n; ++i) {
      const child = dom.children[i];
      if ((child as HTMLElement).style.zIndex === '' && child !== rippleContainer.value) {
        (child as HTMLElement).style.zIndex = '1';
        elMap.set(child, true);
      }
    }

    // fix position
    const initPosition = dom.style.position ? dom.style.position : getComputedStyle(dom).position;
    if (initPosition === '' || initPosition === 'static') {
      // eslint-disable-next-line no-param-reassign
      dom.style.position = 'relative';
    }
    rippleContainer.value.insertBefore(ripple, rippleContainer.value.firstChild);

    setTimeout(() => {
      ripple.style.transform = `translateX(${width}px)`;
    }, 0);
    // 清除动画节点 clear ripple container
    const handleClearRipple = () => {
      ripple.style.backgroundColor = noneRippleBg;

      if (!el.value) return;

      el.value.removeEventListener('pointerup', handleClearRipple, false);
      el.value.removeEventListener('pointerleave', handleClearRipple, false);

      setTimeout(() => {
        ripple.remove();
        if (rippleContainer.value.children.length === 0) rippleContainer.value.remove();
      }, period * 2 + 100);
    };
    el.value.addEventListener('pointerup', handleClearRipple, false);
    el.value.addEventListener('pointerleave', handleClearRipple, false);
  };

  onMounted(() => {
    const dom = el?.value;
    if (!dom) return;

    rippleContainer.value = document.createElement('div');

    dom.addEventListener('pointerdown', handleAddRipple, false);
  });

  onUnmounted(() => {
    el?.value?.removeEventListener('pointerdown', handleAddRipple, false);
  });
}
