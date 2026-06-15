import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { useKeepAnimation } from '../useKeepAnimation';
import { usePrefixClass } from '../useConfig';
import setStyle from '@tdesign/common-js/utils/setStyle';

const period = 200;
// 元素自身 background 等属性的过渡时长（与 less 变量 @anim-duration-base 对齐）
// 用于在元素切换为 loading / disabled 时，让 ripple 背景过渡与元素自身同步收尾，避免视觉割裂
const elementTransitionPeriod = 200;
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
  // use css variable, check if element is valid before calling getComputedStyle
  if (el instanceof Element) {
    const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
    if (cssVariable) {
      return cssVariable;
    }
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
export function useRipple(el: Ref<HTMLElement>, fixedRippleColor?: Ref<string>) {
  const rippleContainer = ref(null);
  const classPrefix = usePrefixClass();

  // 全局配置ripple
  const { keepRipple } = useKeepAnimation();

  // 为节点添加斜八角动画 add ripple to the DOM and set up the animation
  const handleAddRipple = (e: MouseEvent) => {
    const dom = el.value;
    // Early return if element is not valid or not attached to DOM
    if (!dom || !(dom instanceof Element)) return;

    const rippleColor = getRippleColor(dom, fixedRippleColor?.value);
    if (e.button !== 0 || !el || !keepRipple) return;

    if (
      dom.classList.contains(`${classPrefix.value}-is-active`) ||
      dom.classList.contains(`${classPrefix.value}-is-disabled`) ||
      dom.classList.contains(`${classPrefix.value}-is-checked`) ||
      dom.classList.contains(`${classPrefix.value}-is-loading`)
    )
      return;

    // Check again if element is still valid before calling getComputedStyle
    if (!(dom instanceof Element)) return;
    const elStyle = getComputedStyle(dom);

    const elBorder = parseInt(elStyle.borderWidth, 10);
    const border = elBorder > 0 ? elBorder : 0;
    const width = dom.offsetWidth;

    if (rippleContainer.value.parentNode === null) {
      setStyle(rippleContainer.value, {
        position: 'absolute',
        left: `${0 - border}px`,
        top: `${0 - border}px`,
        // 使用百分比尺寸，避免点击后元素尺寸（如 loading 状态新增 icon）发生变化时，
        // 容器无法跟随元素撑开，导致右侧露出元素自身的过渡背景从而出现"左右割裂"
        width: `calc(100% + ${border * 2}px)`,
        height: `calc(100% + ${border * 2}px)`,
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
    let initPosition = dom.style.position;
    if (!initPosition && dom instanceof Element) {
      initPosition = getComputedStyle(dom).position;
    }
    if (initPosition === '' || initPosition === 'static') {
      // eslint-disable-next-line no-param-reassign
      dom.style.position = 'relative';
    }
    rippleContainer.value.insertBefore(ripple, rippleContainer.value.firstChild);

    setTimeout(() => {
      ripple.style.transform = `translateX(${width}px)`;
    }, 0);
    // 标记 ripple 是否已经清理过，避免多次重复触发
    let cleared = false;
    // 监听元素 class 变化的 observer，在 handleClearRipple 中会被断开
    let classChangeObserver: MutationObserver | null = null;
    // 清除动画节点 clear ripple container
    const handleClearRipple = () => {
      if (cleared) return;
      cleared = true;
      ripple.style.backgroundColor = noneRippleBg;

      if (classChangeObserver) {
        classChangeObserver.disconnect();
        classChangeObserver = null;
      }

      if (el.value) {
        el.value.removeEventListener('pointerup', handleClearRipple, false);
        el.value.removeEventListener('pointerleave', handleClearRipple, false);
      }

      setTimeout(() => {
        ripple.remove();
        if (rippleContainer.value.children.length === 0) rippleContainer.value.remove();
      }, period * 2 + 100);
    };

    // 监听元素 class 变化：当元素在 ripple 动画期间被切换为 loading / disabled / active / checked
    // 状态时（例如 click 回调中将按钮置为 loading），由于元素自身 background 的过渡时长
    // (@anim-duration-base) 远短于 ripple 的 background 过渡时长 (period * 2)，会出现元素已经
    // 变成新背景色、而 ripple 还在缓慢淡出的视觉割裂。
    // 此处一旦检测到状态切换，立即将 ripple 的 background 过渡缩短到与元素自身一致，并触发清理，
    // 让两者同步结束褪色。
    if (typeof MutationObserver !== 'undefined') {
      classChangeObserver = new MutationObserver(() => {
        if (!dom || !(dom instanceof Element)) return;
        const cls = dom.classList;
        if (
          cls.contains(`${classPrefix.value}-is-loading`) ||
          cls.contains(`${classPrefix.value}-is-disabled`) ||
          cls.contains(`${classPrefix.value}-is-active`) ||
          cls.contains(`${classPrefix.value}-is-checked`)
        ) {
          // 将 background 过渡时长同步为元素自身的过渡时长，保留 transform 的原节奏
          ripple.style.transition = `transform ${period}ms cubic-bezier(.38, 0, .24, 1), background ${elementTransitionPeriod}ms linear`;
          handleClearRipple();
        }
      });
      classChangeObserver.observe(dom, { attributes: true, attributeFilter: ['class'] });
    }

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
