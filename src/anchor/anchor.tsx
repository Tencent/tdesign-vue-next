import {
  defineComponent,
  nextTick,
  ComponentPublicInstance,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watchEffect,
  provide,
} from 'vue';
import { ANCHOR_SHARP_REGEXP, ANCHOR_CONTAINER, getOffsetTop } from './utils';
import { isServer, on, off, getScroll, scrollTo, getScrollContainer as utilsGetScrollContainer } from '../utils/dom';
import props from './props';
import { useTNodeJSX } from '../hooks/tnode';
import { SlotReturnValue } from '../common';
import Affix from '../affix';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { AnchorInjectionKey } from './constants';

export interface Anchor extends ComponentPublicInstance {
  scrollContainer: ANCHOR_CONTAINER;
  // 执行scrollTo设置的flag, 用来禁止执行handleScroll
  handleScrollLock: boolean;
}

export default defineComponent({
  name: 'TAnchor',
  props,
  setup(props, { slots, attrs }) {
    const anchorRef = ref<HTMLElement | null>(null);
    const links = ref<string[]>([]);
    const active = ref('');
    const scrollContainer = ref<ANCHOR_CONTAINER>(null);
    const handleScrollLock = ref<boolean>(false);
    const activeLineStyle = reactive({});
    const COMPONENT_NAME = usePrefixClass('anchor');
    const ANCHOR_LINE_CLASSNAME = usePrefixClass('anchor__line');
    const ANCHOR_LINE_CURSOR_CLASSNAME = usePrefixClass('anchor__line-cursor');
    const { STATUS, SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();
    /**
     * 获取滚动容器
     * 1. 如果是string则通过id获取
     * 2. 如果是method则获取方法返回值
     */
    const getScrollContainer = () => {
      if (isServer) {
        return;
      }
      const { container } = props;
      scrollContainer.value = utilsGetScrollContainer(container) as HTMLElement;
      on(scrollContainer.value, 'scroll', handleScroll);
      handleScroll();
    };
    /**
     * 监听滚动事件
     */
    const handleScroll = () => {
      if (handleScrollLock.value) return;
      const { bounds, targetOffset } = props;
      const filters: { top: number; link: string }[] = [];
      let active = '';
      // 找出所有当前top小于预设值
      links.value.forEach((link) => {
        const anchor = getAnchorTarget(link);
        if (!anchor) {
          return;
        }
        const top = getOffsetTop(anchor, scrollContainer.value);
        if (top < bounds + targetOffset) {
          filters.push({
            link,
            top,
          });
        }
      });
      // 找出小于预设值集合中top最大的
      if (filters.length) {
        const latest = filters.reduce((prev, cur) => (prev.top > cur.top ? prev : cur));
        active = latest.link;
      }
      setCurrentActiveLink(active);
    };
    /**
     * 获取锚点对应的target元素
     *
     * @param {string} link
     */
    const getAnchorTarget = (link: string): HTMLElement => {
      const matcher = link.match(ANCHOR_SHARP_REGEXP);
      if (!matcher) {
        return;
      }
      const anchor = document.getElementById(matcher[1]);
      if (!anchor) {
        return;
      }
      return anchor;
    };
    /**
     * 注册锚点
     *
     * @param {string} link
     */
    const registerLink = (link: string) => {
      if (!ANCHOR_SHARP_REGEXP.test(link) || links.value.indexOf(link) !== -1) {
        return;
      }
      links.value.push(link);
    };
    /**
     * 注销锚点
     *
     * @param {string} link
     */
    const unregisterLink = (link: string) => {
      links.value = links.value.filter((each) => each !== link);
    };
    /**
     * 设置当前激活状态锚点
     *
     * @param {string} link
     */
    const setCurrentActiveLink = async (link: string): Promise<void> => {
      if (active.value === link) {
        return;
      }
      active.value = link;
      props.onChange?.(link, active.value);
      await nextTick();
      updateActiveLine();
    };
    /**
     * 计算active-line所在的位置
     * 当前active-item的top + height, 以及ANCHOR_ITEM_PADDING修正
     */
    const updateActiveLine = () => {
      const ele = anchorRef.value?.querySelector(`.${STATUS.value.active}>a`) as HTMLAnchorElement;
      if (!ele) {
        Object.assign(activeLineStyle, {});
        return;
      }
      const { offsetTop: top, offsetHeight: height } = ele;
      Object.assign(activeLineStyle, {
        top: `${top}px`,
        height: `${height}px`,
        opacity: 1,
      });
    };
    /**
     * 监听AnchorLink点击事件
     * @param {{ href: string; title: string }} link
     */
    const handleLinkClick = (link: { href: string; title: string; e: MouseEvent }) => {
      props.onClick?.(link);
    };
    /**
     * 滚动到指定锚点
     *
     * @param {string} link
     */
    const handleScrollTo = async (link: string): Promise<void> => {
      const anchor = getAnchorTarget(link);
      setCurrentActiveLink(link);
      if (!anchor) return;
      handleScrollLock.value = true;
      const { targetOffset } = props;
      const scrollTop = getScroll(scrollContainer.value);
      const offsetTop = getOffsetTop(anchor, scrollContainer.value);
      const top = scrollTop + offsetTop - targetOffset;
      await scrollTo(top, {
        container: scrollContainer.value,
      });
      handleScrollLock.value = false;
    };
    const renderCursor = () => {
      const titleContent: SlotReturnValue = renderTNodeJSX('cursor');
      return titleContent || <div class={ANCHOR_LINE_CURSOR_CLASSNAME.value}></div>;
    };
    onMounted(async () => {
      getScrollContainer();
      if (active.value) {
        await nextTick();
        handleScrollTo(active.value);
      }
    });
    onUnmounted(() => {
      if (!scrollContainer.value) return;
      off(scrollContainer.value, 'scroll', handleScroll);
    });
    watchEffect(() => {
      // 清空上一个container的事件监听
      if (scrollContainer.value) {
        off(scrollContainer.value, 'scroll', handleScroll);
      }
      getScrollContainer();
    });
    provide(
      AnchorInjectionKey,
      reactive({
        registerLink,
        unregisterLink,
        handleScrollTo,
        handleLinkClick,
        active,
      }),
    );
    return () => {
      const { size, affixProps } = props;
      const className = [COMPONENT_NAME.value, SIZE.value[size]];

      const content = (
        <div ref={anchorRef} class={className} {...attrs}>
          <div class={ANCHOR_LINE_CLASSNAME.value}>
            <div class={`${ANCHOR_LINE_CURSOR_CLASSNAME.value}-wrapper`} style={activeLineStyle}>
              {renderCursor()}
            </div>
          </div>
          {slots.default && slots.default(null)}
        </div>
      );

      if (affixProps) {
        return <Affix {...affixProps}>{content}</Affix>;
      }

      return content;
    };
  },
});
