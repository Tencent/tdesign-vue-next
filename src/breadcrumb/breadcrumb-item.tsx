import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import IconChevronRight from '../icon/chevron-right';
import props from './breadcrumb-item-props';

const name = `${prefix}-breadcrumbItem`;
const separatorClass = `${prefix}-breadcrumb__separator`;
const disableClass = `${prefix}-disabled`;
const linkClass = `${prefix}-link`;
const maxLengthClass = `${prefix}-breadcrumb__inner`;
const textFlowClass = `${prefix}-breadcrumb--text-oveflow`;
const gestureClass = `${prefix}-gestureClass`;
interface LocalTBreadcrumb {
  separator: (() => void) | string;
  theme: string;
  $slots: {
    separator: VNode | string;
  };
  maxItemWidth: string;
}
const localTBreadcrumbOrigin: LocalTBreadcrumb = {
  separator: '',
  theme: 'light',
  $slots: { separator: '' },
  maxItemWidth: undefined,
};

const isEventProps = (propName: string): boolean => {
  const pre = /on[A-Z].+/;
  return pre.test(propName);
};

export default defineComponent({
  name,

  inject: ['tBreadcrumb'],

  props: {
    ...props,
  },

  data() {
    return {
      localTBreadcrumb: localTBreadcrumbOrigin,
      themeClassName: '',
      $router: null,
    };
  },

  computed: {
    maxWithStyle() {
      const { localTBreadcrumb } = this;
      const { maxItemWidth } = localTBreadcrumb;
      const maxWith: string = this.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    },
  },

  watch: {
    tBreadcrumb: {
      immediate: true,
      handler(v): void {
        this.localTBreadcrumb = v;
      },
    },
  },

  created() {
    const tBreadcrumb = this.localTBreadcrumb;
    this.themeClassName = tBreadcrumb.theme;
  },

  methods: {
    bindEvent(e: MouseEvent) {
      if (!this.href || !this.disabled) {
        e.preventDefault();
        const { to } = this;
        const router = this.router || this.$router;
        if (to && router) {
          this.replace ? router.replace(to) : router.push(to);
        }
      }
    },
  },

  render() {
    const { localTBreadcrumb, maxWithStyle } = this;
    const { separator: separatorPropContent } = localTBreadcrumb;
    const separatorSlot = localTBreadcrumb.$slots.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <IconChevronRight {...{ color: 'rgba(0,0,0,.3)' }} />
    );
    const itemClass = [`${prefix}-breadcrumb__item`, this.themeClassName];
    const textClass = [textFlowClass];

    if (this.disabled) {
      textClass.push(disableClass);
    }
    const listeners: Record<string, any> = {};
    Object.keys(this.$attrs).forEach((attr) => {
      const value = this.$attrs[attr];
      if (isEventProps(attr) && typeof value === 'function') {
        listeners[attr] = value;
      }
    });

    if (listeners.onClick) {
      textClass.push(gestureClass);
    }

    const textContent = <span {...{ class: maxLengthClass, style: maxWithStyle }}>{this.$slots.default()}</span>;
    let itemContent = <span {...{ class: textClass, ...listeners }}>{textContent}</span>;

    if ((this.href || this.to) && !this.disabled) {
      textClass.push(linkClass);
      itemContent = (
        <a class={textClass} href={this.href} target={this.target} {...listeners} onClick={this.bindEvent}>
          {textContent}
        </a>
      );
    }

    return (
      <div class={itemClass} {...this.$attrs}>
        {itemContent}
        <span class={separatorClass}>
          {typeof separatorContent === 'function' ? separatorContent() : separatorContent}
        </span>
      </div>
    );
  },
});
