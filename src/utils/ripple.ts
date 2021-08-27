/**
 * 用法
 * v-ripple
 * 固定色值 v-ripple="动画条的背景色" eg: v-ripple="#808080"
 * 动态色值(推荐) v-ripple="true" data.ripple="rippleColor"
 */

import { DirectiveBinding } from 'vue';
import setStyle from './set-style';
import { prefix } from '../config';

let startTimeId = null as NodeJS.Timeout

const Ripple = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const period = 200;
    const defaultBg = 'rgba(0, 0, 0, 0.35)';
    let bg = typeof binding.value === 'boolean' ? defaultBg : binding.value;
    const rippleContainer = document.createElement('div');
    let hasCreateContainer = false;
    let count = 0;

    el.addEventListener('pointerdown', (e: PointerEvent) => {
      if (el.classList.contains(`${prefix}-is-active`) || el.classList.contains(`${prefix}-is-disabled`) || el.classList.contains(`${prefix}-is-checked`)) return;

      if (e.button !== 0) return; // 非鼠标左键点击；避免出现动画之后不消失的bug

      // 支持通过dataset传递背景色
      if (bg === defaultBg && el.dataset.ripple) {
        bg = el.dataset.ripple;
      }

      // 支持通过css variable传递背景色
      const cssVariable = getComputedStyle(el).getPropertyValue('--ripple-color');
      if (cssVariable) {
        bg = cssVariable;
      }

      const elBorder = parseInt((getComputedStyle(el).borderWidth).replace('px', ''), 10);
      const border = (elBorder > 0) ? elBorder : 0;
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      const style = getComputedStyle(el);

      if (!hasCreateContainer) {
        hasCreateContainer = true;
        setStyle(rippleContainer, {
          position: 'absolute',
          left: `${0 - border}px`,
          top: `${0 - border}px`,
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: style.borderRadius,
          pointerEvents: 'none',
          overflow: 'hidden',
        });
        el.appendChild(rippleContainer);
      }

      const ripple = document.createElement('div');

      setStyle(ripple, {
        marginTop: '0',
        marginLeft: '0',
        right: `${width}px`,
        width: `${width + 20}px`,
        height: '100%',
        transition: `right ${period}ms cubic-bezier(.38, 0, .24, 1), background ${period * 2}ms linear`,
        transform: 'skewX(-8deg)',
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: '0',
        backgroundColor: bg,
        opacity: '0.9',
      });

      // fix zIndex：避免遮盖内部元素
      const elMap = new WeakMap();
      for (let n = el.children.length, i = 0; i < n; ++i) {
        const child = el.children[i];
        if ((child as HTMLElement).style.zIndex === '' && child !== rippleContainer) {
          (child as HTMLElement).style.zIndex = '1';
          elMap.set(child, true);
        }
      }

      // fix position
      const initPosition = el.style.position ? el.style.position : getComputedStyle(el).position;
      if (initPosition === '' || initPosition === 'static') {
        // eslint-disable-next-line no-param-reassign
        el.style.position = 'relative';
      }

      rippleContainer.insertBefore(ripple, rippleContainer.firstChild);
      count += 1;

      clearTimeout(startTimeId);
      startTimeId = setTimeout(() => {
        ripple.style.right = '-2px';
      }, 0);

      const handleClearRipple = () => {
        ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';

        el.removeEventListener('pointerup', handleClearRipple, false);
        el.removeEventListener('pointerleave', handleClearRipple, false);

        setTimeout(() => {
          rippleContainer.removeChild(ripple);
          count -= 1;
          if (count > 0) return; // 避免因为移除了relative的定位，从而导致动画漂移
          // eslint-disable-next-line no-param-reassign
          el.style.position = initPosition !== 'static' ? initPosition : '';

          // reset zIndex
          for (let n = el.children.length, i = 0; i < n; ++i) {
            const child: Element = el.children[i];
            if (elMap.has(child)) {
              (child as HTMLElement).style.zIndex = '';
              elMap.delete(child);
            }
          }
          // 由于容器的尺寸可能会发生变更，因此在动画结束之后，手动移除
          el.removeChild(rippleContainer);
          hasCreateContainer = false;
        }, (period * 2) + 100);
      };
      el.addEventListener('pointerup', handleClearRipple, false);
      el.addEventListener('pointerleave', handleClearRipple, false); // 处理鼠标按下不松手直接离开点击block的情况..
    });
  },
};

export default Ripple;
