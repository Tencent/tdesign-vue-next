import { defineComponent, ref, onMounted, onUpdated } from 'vue';
import { usePrefixClass } from '@tdesign/shared-hooks';

/**
 * 辅助组件：在"更多"弹窗中渲染封装组件的完整内容克隆，
 * 并通过 DOM 操作隐藏前 N 个菜单项（仅显示溢出部分）。
 */
export default defineComponent({
  name: 'PopupOverflowContent',
  props: {
    foldIndex: { type: Number, required: true },
  },
  setup(props, ctx) {
    const classPrefix = usePrefixClass();
    const wrapperRef = ref<HTMLElement>();

    const hideBeforeFoldIndex = () => {
      if (!wrapperRef.value) return;
      const menuItemClass = `${classPrefix.value}-menu__item`;
      const submenuClass = `${classPrefix.value}-submenu`;
      const items: HTMLElement[] = [];

      const collect = (parent: HTMLElement, depth: number) => {
        if (depth > 3) return;
        Array.from(parent.children).forEach((el) => {
          if (!(el instanceof HTMLElement)) return;
          if (el.classList.contains(menuItemClass) || el.classList.contains(submenuClass)) {
            items.push(el);
          } else {
            collect(el, depth + 1);
          }
        });
      };

      collect(wrapperRef.value, 0);
      items.forEach((el, index) => {
        el.style.display = index < props.foldIndex ? 'none' : '';
      });
    };

    onMounted(hideBeforeFoldIndex);
    onUpdated(hideBeforeFoldIndex);

    return () => <div ref={wrapperRef}>{ctx.slots.default?.()}</div>;
  },
});
