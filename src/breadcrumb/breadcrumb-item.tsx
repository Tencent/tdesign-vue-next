import { defineComponent, ComponentPublicInstance, VNode } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

import props from './breadcrumb-item-props';
import Tooltip from '../tooltip/index';
import { isNodeOverflow } from '../utils/dom';
import { emitEvent } from '../utils/event';
import { getPropsApiByEvent } from '../utils/helper';
import { usePrefixClass } from '../hooks/useConfig';

export const EVENT_NAME_WITH_KEBAB = ['click'];
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

export default defineComponent({
  name: 'TBreadcrumbItem',
  components: {
    Tooltip,
  },

  inject: ['tBreadcrumb'],

  props: {
    ...props,
  },

  emits: ['click'],
  setup() {
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');
    return {
      COMPONENT_NAME,
      separatorClass,
      disableClass,
      linkClass,
      maxLengthClass,
      textFlowClass,
    };
  },
  data() {
    return {
      localTBreadcrumb: localTBreadcrumbOrigin,
      themeClassName: '',
      $router: null,
      isCutOff: false,
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

  mounted() {
    this.isCutOff = isNodeOverflow(this.$refs.breadcrumbText as ComponentPublicInstance);
  },
  beforeUpdate() {
    this.isCutOff = isNodeOverflow(this.$refs.breadcrumbText as ComponentPublicInstance);
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
    const { separatorClass, disableClass, linkClass, maxLengthClass, textFlowClass } = this;
    const { localTBreadcrumb, maxWithStyle } = this;
    const { separator: separatorPropContent } = localTBreadcrumb;
    const separatorSlot = localTBreadcrumb.$slots.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <ChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />
    );
    const itemClass = [this.COMPONENT_NAME, this.themeClassName];
    const textClass = [textFlowClass];

    if (this.disabled) {
      textClass.push(disableClass);
    }
    const listeners: Record<string, any> = {};
    EVENT_NAME_WITH_KEBAB.forEach((eventName) => {
      listeners[getPropsApiByEvent(eventName)] = (...args: any[]) => {
        emitEvent(this, eventName, ...args);
      };
    });

    const textContent = (
      <span ref="breadcrumbText" {...{ class: maxLengthClass, style: maxWithStyle }}>
        {this.$slots.default()}
      </span>
    );
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
        {this.isCutOff ? <Tooltip content={() => this.$slots.default()}>{itemContent}</Tooltip> : itemContent}
        <span class={separatorClass}>
          {typeof separatorContent === 'function' ? separatorContent() : separatorContent}
        </span>
      </div>
    );
  },
});
