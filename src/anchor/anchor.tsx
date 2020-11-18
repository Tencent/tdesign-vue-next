import Vue, { VueConstructor } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import CLASSNAMES from '../utils/classnames';
import Icon from '../icon';
import { ANCHOR_SHARP_REGEXP, ANCHOR_CONTAINER, getOffsetTop } from './utils';
import { on, off, getScroll, scrollTo } from '../utils/dom';

const name = `${prefix}-anchor`;
const SIZE_LIST = ['large', 'middle', 'small'];

interface Anchor extends Vue {
  scrollContainer: ANCHOR_CONTAINER;
  handleScrollLock: boolean; // 执行scrollTo设置的flag, 用来禁止执行handleScroll
}
export default (Vue as VueConstructor<Anchor>).extend({
  name,
  components: {
    [Icon.name]: Icon,
    RenderComponent,
  },

  props: {
    affix: {
      type: Boolean,
      default: false,
    },
    bounds: {
      type: Number,
      default: 5,
    },
    targetOffset: {
      type: Number,
      default: 0,
    },
    container: {
      type: [String, Function],
      default: () => () => window,
    },
    size: {
      type: String,
      default: 'middle',
      validator(v) {
        return SIZE_LIST.indexOf(v) !== -1;
      },
    },
  },
  provide(): any {
    return {
      tAnchor: this,
    };
  },
  data() {
    return {
      links: [] as string[],
      active: '',
      activeLineStyle: false as (boolean | { top: string; height: string}),
    };
  },
  watch: {
    container() {
      this.getScrollContainer();
    },
  },
  methods: {
    /**
     * 获取滚动容器
     * 1. 如果是string则通过id获取
     * 2. 如果是method则获取方法返回值
     */
    getScrollContainer() {
      if (this.scrollContainer) {
        off(this.scrollContainer, 'scroll', this.handleScroll);
      }
      const { container } = this;
      if (typeof container === 'string') {
        this.scrollContainer = document.getElementById(container);
      } else {
        this.scrollContainer = container();
      }
      on(this.scrollContainer, 'scroll', this.handleScroll);
      this.handleScroll();
    },
    /**
     * 获取锚点对应的target元素
     *
     * @param {string} link
     * @returns
     */
    getAnchorTarget(link: string) {
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
     * @returns
     */
    registerLink(link: string) {
      const { links } = this;
      if (!ANCHOR_SHARP_REGEXP.test(link)) {
        return;
      }
      if (links.indexOf(link) !== -1) {
        return;
      }
      links.push(link);
    },
    /**
     * 注销锚点
     *
     * @param {string} link
     */
    unregisterLink(link: string) {
      this.links = this.links.filter(each => each !== link);
    },
    /**
     * 设置当前激活状态锚点
     *
     * @param {string} link
     * @returns
     */
    async setCurrentActiveLink(link: string) {
      const { active } = this;
      if (active === link) {
        return;
      }
      this.active = link;
      this.$emit('change', link, active);
      await Vue.nextTick();
      this.updateActiveLine();
    },
    /**
     * 计算active-line所在的位置
     * 当前active-item的top + height, 以及ANCHOR_ITEM_PADDING修正
     *
     * @returns
     */
    updateActiveLine() {
      const ele = this.$el.querySelector(`.${CLASSNAMES.STATUS.active} a`) as HTMLAnchorElement;
      if (!ele) {
        this.activeLineStyle = false;
        return;
      }
      const { offsetTop: top, offsetHeight: height } = ele;
      this.activeLineStyle = {
        top: `${top}px`,
        height: `${height}px`,
      };
    },
    /**
     * 监听AnchorLink点击事件
     *
     * @param {*} args
     */
    handleLinkClick(e: MouseEvent, link: { href: string; title: string }) {
      this.$emit('click', e, link);
    },
    /**
     * 滚动到指定锚点
     *
     * @param {string} link
     */
    async handleScrollTo(link: string) {
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
    handleScroll() {
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
  },

  async mounted() {
    const { active } = this;
    this.getScrollContainer();
    if (active) {
      await Vue.nextTick();
      this.handleScrollTo(active);
    }
  },

  destroyed() {
    if (!this.scrollContainer) return;
    off(this.scrollContainer, 'scroll', this.handleScroll);
  },

  render() {
    const { $scopedSlots: { default: children }, size, affix, activeLineStyle } = this;
    const className = [name, CLASSNAMES.SIZE[size], {
      [`${prefix}--affix`]: affix,
    }];
    return <div class={className}>
      <div class={`${name}_line`}>
        {
          activeLineStyle && <div class="point" style={activeLineStyle} ></div>
        }
      </div>
      {children && children(null)}
    </div>;
  },
});
