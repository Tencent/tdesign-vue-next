import Vue, { VueConstructor } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { ANCHOR_SHARP_REGEXP } from './utils';
const name = `${prefix}-anchor-item`;
interface Anchor extends Vue {
  tAnchor: {
    active: string;
    handleScrollTo(target: string): void;
    registerLink(href: string): void;
    unregisterLink(href: string): void;
    handleLinkClick(link: { href: string; title: string }, e: MouseEvent): void;
  };
}

export default (Vue as VueConstructor<Anchor>).extend({
  name,

  props: {
    href: {
      type: String,
      required: true,
      validator(v) {
        return ANCHOR_SHARP_REGEXP.test(v);
      },
    },
    title: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
  },

  inject: {
    tAnchor: { default: undefined },
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
  destroyed() {
    this.unregister();
  },
  methods: {
    register(): void {
      this.tAnchor.registerLink(this.href);
    },
    unregister(): void {
      const { href } = this;
      if (!href) return;
      this.tAnchor.unregisterLink(href);
    },
    handleClick(e: MouseEvent): void {
      const { href, title, tAnchor } = this;
      tAnchor.handleScrollTo(href);
      tAnchor.handleLinkClick({
        href,
        title,
      }, e);
    },
  },
  render() {
    const { href, title, target, $scopedSlots, tAnchor } = this;
    const titleAttr = typeof title === 'string' ? title : null;
    const { default: children, title: titleSlot } = $scopedSlots;
    const active = tAnchor.active === href;
    const wrapperClass = {
      [name]: true,
      [CLASSNAMES.STATUS.active]: active,
    };
    const titleClass = {
      [`${name}_link`]: true,
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
