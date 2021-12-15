import { defineComponent, h, VNodeChild } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { ANCHOR_SHARP_REGEXP } from './utils';
import props from './anchor-item-props';
import { COMPONENT_NAME } from './constant';

const CLASSNAME_PREFIX = `${COMPONENT_NAME}__item`;

export default defineComponent({
  name: 'TAnchorItem',
  inject: {
    tAnchor: { default: undefined },
  },
  props: {
    ...props,
    href: {
      type: String,
      required: true,
      validator(v: string): boolean {
        return ANCHOR_SHARP_REGEXP.test(v);
      },
    },
  },
  watch: {
    href: {
      immediate: true,
      handler() {
        this.unregister();
        this.register();
      },
    },
  },
  mounted() {
    this.register();
  },
  unmounted() {
    this.unregister();
  },
  methods: {
    register(): void {
      this.tAnchor.registerLink(this.href as string);
    },
    unregister(): void {
      const { href } = this;
      if (!href) return;
      this.tAnchor.unregisterLink(href);
    },
    handleClick(e: MouseEvent): void {
      const { href, tAnchor, title } = this;
      tAnchor.handleScrollTo(href);
      tAnchor.handleLinkClick(
        {
          href,
          title: typeof title === 'string' ? title : undefined,
        },
        e,
      );
    },
    renderTitle() {
      const { title, $slots } = this;
      const { title: titleSlot } = $slots;
      let titleVal: VNodeChild;
      if (typeof title === 'string') {
        titleVal = title;
      } else if (typeof title === 'function') {
        titleVal = title(h);
      } else if (titleSlot) {
        titleVal = titleSlot(null);
      }
      return titleVal;
    },
  },
  render() {
    const { href, target, $slots, tAnchor } = this;
    const { default: children, title: titleSlot } = $slots;
    const title = this.renderTitle();
    const titleAttr = typeof title === 'string' ? title : null;
    const active = tAnchor.active === href;
    const wrapperClass = {
      [CLASSNAME_PREFIX]: true,
      [CLASSNAMES.STATUS.active]: active,
    };
    const titleClass = {
      [`${CLASSNAME_PREFIX}-link`]: true,
    };
    return (
      <div class={wrapperClass}>
        <a href={href} title={titleAttr} class={titleClass} target={target} onClick={this.handleClick}>
          {titleSlot ? titleSlot(null) : title}
        </a>
        {children && children(null)}
      </div>
    );
  },
});
