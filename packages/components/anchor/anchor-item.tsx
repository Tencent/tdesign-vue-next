import { defineComponent, h, VNodeChild, onMounted, onUnmounted, inject, watch } from 'vue';
import { ANCHOR_SHARP_REGEXP } from './utils';
import props from './anchor-item-props';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { AnchorInjectionKey } from './consts';
import { isFunction } from 'lodash-es';
import { isString } from 'lodash-es';

const localProps = {
  ...props,
  href: {
    type: String,
    required: true,
    validator(v: string): boolean {
      return ANCHOR_SHARP_REGEXP.test(v);
    },
  },
};

export default defineComponent({
  name: 'TAnchorItem',
  inject: {
    tAnchor: { default: undefined },
  },
  props: localProps,
  setup(props, { slots }) {
    const anchor = inject(AnchorInjectionKey, undefined);
    const CLASSNAME_PREFIX = usePrefixClass('anchor__item');
    const { STATUS } = useCommonClassName();
    const register = () => {
      anchor.registerLink(props.href as string);
    };
    const unregister = () => {
      const { href } = props;
      if (!href) return;
      anchor.unregisterLink(href);
    };
    const handleClick = (e: MouseEvent) => {
      const { href, title } = props;
      if (!props.customScroll) anchor.handleScrollTo(href);
      anchor.handleLinkClick({ href, title: isString(title) ? title : undefined, e });
    };
    const renderTitle = () => {
      const { title } = props;
      const { title: titleSlot } = slots;
      let titleVal: VNodeChild;
      if (isString(title)) {
        titleVal = title;
      } else if (isFunction(title)) {
        titleVal = title(h);
      } else if (titleSlot) {
        titleVal = titleSlot(null);
      }
      return titleVal;
    };
    watch(
      () => props.href,
      () => {
        unregister();
        register();
      },
      { immediate: true },
    );
    onMounted(() => {
      register();
    });
    onUnmounted(() => {
      unregister();
    });
    return () => {
      const { href, target } = props;
      const { default: children, title: titleSlot } = slots;
      const title = renderTitle();
      const titleAttr = isString(title) ? title : null;
      const active = anchor.active === href;
      const wrapperClass = {
        [CLASSNAME_PREFIX.value]: true,
        [STATUS.value.active]: active,
      };
      const titleClass = {
        [`${CLASSNAME_PREFIX.value}-link`]: true,
      };
      return (
        <div class={wrapperClass}>
          <a href={href} title={titleAttr} class={titleClass} target={target} onClick={handleClick}>
            {titleSlot ? titleSlot(null) : title}
          </a>
          {children && children(null)}
        </div>
      );
    };
  },
});
