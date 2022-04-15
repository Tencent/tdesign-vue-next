import { defineComponent, VNode, inject, ref, computed, watchEffect, onMounted, onBeforeUpdate } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

import props from './breadcrumb-item-props';
import Tooltip from '../tooltip/index';
import { isNodeOverflow } from '../utils/dom';
import { usePrefixClass } from '../hooks/useConfig';

interface LocalTBreadcrumb {
  separator: (() => void) | string;
  theme: string;
  slots: {
    separator: VNode | string;
  };
  maxItemWidth: string;
}

const localTBreadcrumbOrigin: LocalTBreadcrumb = {
  separator: '',
  theme: 'light',
  slots: { separator: '' },
  maxItemWidth: undefined,
};

export default defineComponent({
  name: 'TBreadcrumbItem',
  props,
  setup(props, { slots, attrs }) {
    const breadcrumbText = ref<HTMLElement | null>(null);
    const localTBreadcrumb = inject('tBreadcrumb', localTBreadcrumbOrigin);
    const themeClassName = ref(localTBreadcrumb?.theme);
    const curRouter = ref(null);
    const isCutOff = ref(false);
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });

    onMounted(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value);
    });
    onBeforeUpdate(() => {
      isCutOff.value = true;
    });

    const separatorPropContent = localTBreadcrumb?.separator;
    const separatorSlot = localTBreadcrumb?.slots?.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <ChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />
    );
    const bindEvent = (e: MouseEvent) => {
      if (!props.href || !props.disabled) {
        e.preventDefault();
        const router = props.router || curRouter.value;
        if (props.to && router) {
          props.replace ? router.replace(props.to) : router.push(props.to);
        }
      }
    };

    return () => {
      const itemClass = [COMPONENT_NAME.value, themeClassName.value];
      const textClass = [textFlowClass.value];

      if (props.disabled) {
        textClass.push(disableClass.value);
      }

      const listeners = {
        onClick: (e: MouseEvent) => {
          props.onClick?.({ e });
        },
      };
      const textContent = (
        <span ref={breadcrumbText} {...{ class: maxLengthClass.value, style: maxWithStyle.value }}>
          {slots.default()}
        </span>
      );
      let itemContent = <span {...{ class: textClass, ...listeners }}>{textContent}</span>;

      if ((props.href || props.to) && !props.disabled) {
        textClass.push(linkClass.value);
        itemContent = (
          <a class={textClass} href={props.href} target={props.target} {...listeners} onClick={bindEvent}>
            {textContent}
          </a>
        );
      }
      return (
        <div class={itemClass} {...attrs}>
          {isCutOff.value ? <Tooltip content={() => slots?.default()}>{itemContent}</Tooltip> : itemContent}
          <span class={separatorClass.value}>
            {typeof separatorContent === 'function' ? separatorContent() : separatorContent}
          </span>
        </div>
      );
    };
  },
});
