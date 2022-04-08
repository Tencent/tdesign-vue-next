import { defineComponent, nextTick, ComponentPublicInstance } from 'vue';
import { ANCHOR_SHARP_REGEXP, ANCHOR_CONTAINER, getOffsetTop } from './utils';
import { on, off, getScroll, scrollTo, getScrollContainer } from '../utils/dom';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { SlotReturnValue } from '../common';
import Affix from '../affix';
import { emitEvent } from '../utils/event';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export interface Anchor extends ComponentPublicInstance {
  scrollContainer: ANCHOR_CONTAINER;
  // 执行scrollTo设置的flag, 用来禁止执行handleScroll
  handleScrollLock: boolean;
}

export default defineComponent({
  name: 'TAnchor',

  provide(): any {
    return {
      tAnchor: this,
    };
  },

  props: { ...props },

  emits: ['change', 'click'],

  setup() {
    const COMPONENT_NAME = usePrefixClass('anchor');
    const ANCHOR_LINE_CLASSNAME = usePrefixClass('anchor__line');
    const ANCHOR_LINE_CURSOR_CLASSNAME = usePrefixClass('anchor__line-cursor');

    const { STATUS, SIZE } = useCommonClassName();
    return {
      COMPONENT_NAME,
      ANCHOR_LINE_CLASSNAME,
      ANCHOR_LINE_CURSOR_CLASSNAME,
      STATUS,
      SIZE,
    };
  },
  data() {
    return {
      links: [] as string[],
      active: '',
      scrollContainer: null as ANCHOR_CONTAINER,
      activeLineStyle: {} as { top: string; height: string; opacity: number },
    };
  },

  watch: {
    attach() {
      // 清空上一个container的事件监听
      if (this.scrollContainer) {
        off(this.scrollContainer, 'scroll', this.handleScroll);
      }
      this.getScrollContainer();
    },
  },

  async mounted() {
    const { active } = this;
    this.getScrollContainer();
    if (active) {
      await nextTick();
      this.handleScrollTo(active);
    }
  },

  unmounted() {
    if (!this.scrollContainer) return;
    off(this.scrollContainer, 'scroll', this.handleScroll);
  },

  methods: {
    /**
     * 获取滚动容器
     * 1. 如果是string则通过id获取
     * 2. 如果是method则获取方法返回值
     */
    getScrollContainer(): void {
      const { container } = this;
      this.scrollContainer = getScrollContainer(container) as HTMLElement;
      on(this.scrollContainer, 'scroll', this.handleScroll);
      this.handleScroll();
    },
    /**
     * 获取锚点对应的target元素
     *
     * @param {string} link
     */
    getAnchorTarget(link: string): HTMLElement {
      const matcher = link.match(ANCHOR_SHARP_REGEXP);
      if (!matcher) {
        return;
      }
      const anchor = document.getElementById(matcher[1]);
      if (!anchor) {
        return;
      }
      return anchor;
    },
    /**
     * 注册锚点
     *
     * @param {string} link
     */
    registerLink(link: string): void {
      const { links } = this;
      if (!ANCHOR_SHARP_REGEXP.test(link) || links.indexOf(link) !== -1) {
        return;
      }
      links.push(link);
    },
    /**
     * 注销锚点
     *
     * @param {string} link
     */
    unregisterLink(link: string): void {
      this.links = this.links.filter((each) => each !== link);
    },
    /**
     * 设置当前激活状态锚点
     *
     * @param {string} link
     */
    async setCurrentActiveLink(link: string): Promise<void> {
      const { active } = this;
      if (active === link) {
        return;
      }
      this.active = link;
      this.emitChange(link, active);
      await nextTick();
      this.updateActiveLine();
    },
    /**
     * 计算active-line所在的位置
     * 当前active-item的top + height, 以及ANCHOR_ITEM_PADDING修正
     */
    updateActiveLine(): void {
      const ele = this.$el.querySelector(`.${this.STATUS.active}>a`) as HTMLAnchorElement;
      if (!ele) {
        this.activeLineStyle = null;
        return;
      }
      const { offsetTop: top, offsetHeight: height } = ele;
      this.activeLineStyle = {
        top: `${top}px`,
        height: `${height}px`,
        opacity: 1,
      };
    },
    /**
     * 触发onchange事件或者props
     *
     * @param {string} currentLink
     * @param {string} prevLink
     */
    emitChange(currentLink: string, prevLink: string) {
      emitEvent(this, 'change', currentLink, prevLink);
    },
    /**
     * 监听AnchorLink点击事件
     * @param {{ href: string; title: string }} link
     */
    handleLinkClick(link: { href: string; title: string }): void {
      emitEvent(this, 'click', link);
    },
    /**
     * 滚动到指定锚点
     *
     * @param {string} link
     */
    async handleScrollTo(link: string): Promise<void> {
      const anchor = this.getAnchorTarget(link);
      this.setCurrentActiveLink(link);
      if (!anchor) return;
      this.handleScrollLock = true;
      const { scrollContainer, targetOffset } = this;
      const scrollTop = getScroll(scrollContainer);
      const offsetTop = getOffsetTop(anchor, scrollContainer);
      const top = scrollTop + offsetTop - targetOffset;
      await scrollTo(top, {
        container: scrollContainer,
      });
      this.handleScrollLock = false;
    },
    /**
     * 监听滚动事件
     */
    handleScroll(): void {
      if (this.handleScrollLock) return;
      const { links, bounds, targetOffset } = this;
      const filters: { top: number; link: string }[] = [];
      let active = '';
      // 找出所有当前top小于预设值
      links.forEach((link) => {
        const anchor = this.getAnchorTarget(link);
        if (!anchor) {
          return;
        }
        const top = getOffsetTop(anchor, this.scrollContainer);
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
      this.setCurrentActiveLink(active);
    },
    renderCursor() {
      const titleContent: SlotReturnValue = renderTNodeJSX(this, 'cursor');
      return titleContent || <div class={this.ANCHOR_LINE_CURSOR_CLASSNAME}></div>;
    },
  },

  render() {
    const {
      $slots: { default: children },
      size,
      affixProps,
      activeLineStyle,
      $attrs,
    } = this;
    const className = [this.COMPONENT_NAME, this.SIZE[size]];

    const content = (
      <div class={className} {...$attrs}>
        <div class={this.ANCHOR_LINE_CLASSNAME}>
          <div class={`${this.ANCHOR_LINE_CURSOR_CLASSNAME}-wrapper`} style={activeLineStyle}>
            {this.renderCursor()}
          </div>
        </div>
        {children && children(null)}
      </div>
    );

    if (affixProps) {
      return <Affix {...affixProps}>{content}</Affix>;
    }

    return content;
  },
});
