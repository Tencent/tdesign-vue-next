import { isFunction } from 'lodash-es';
import { ChevronRightIcon as TdChevronRightIcon } from 'tdesign-icons-vue-next';
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUpdate, onMounted, ref } from '@td/adapter-vue';
import type { VNode } from '@td/adapter-vue';

// import Tooltip from '../tooltip/index';

import { isNodeOverflow } from '@td/adapter-utils';
import { useEmitEvent, useGlobalIcon, usePrefixClass, useTNodeJSX } from '@td/adapter-hooks';

import props from '@td/intel/components/breadcrumb/breadcrumb-item-props';

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
  maxItemWidth: '',
};

export default defineComponent({
  name: 'TBreadcrumbItem',
  inheritAttrs: false,
  props,
  setup(props, { slots, attrs, emit }) {
    const breadcrumbText = ref<HTMLElement>();
    const localTBreadcrumb = inject('tBreadcrumb', localTBreadcrumbOrigin);
    const themeClassName = ref(localTBreadcrumb?.theme);
    const isCutOff = ref(false);
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');
    const renderTNodeJSX = useTNodeJSX();
    const emitEvent = useEmitEvent();

    const { ChevronRightIcon } = useGlobalIcon({ ChevronRightIcon: TdChevronRightIcon });
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });

    onMounted(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value!);
    });

    onBeforeUpdate(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value!);
    });

    const separatorPropContent = localTBreadcrumb?.separator;
    const separatorSlot = localTBreadcrumb?.slots?.separator;
    const separatorContent = separatorPropContent || separatorSlot || (
      <TdChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />
    );
    // const separatorContent = separatorPropContent || separatorSlot || '>';
    const instance = getCurrentInstance();

    const beforeClick = (e: MouseEvent) => {
      if (props.disabled) {
        e.stopPropagation();
      } else {
        emitEvent('click', { e });
      }
    };

    const handleItemClick = (e: MouseEvent) => {
      beforeClick(e);
      if (!props.disabled) {
        if (props.target === '_blank') {
          props.href ? window.open(props.href) : window.open(props.to as string);
        } else {
          e.preventDefault();
          if (props.href) {
            window.location.href = props.href;
          }
          const router = props.router || instance?.$router; // instance 上有这个吗？
          if (props.to && router) {
            props.replace ? router.replace(props.to) : router.push(props.to);
          }
        }
      }
    };

    return () => {
      const itemClass = [COMPONENT_NAME.value, themeClassName.value];
      const textClass = [textFlowClass.value];

      if (props.disabled) {
        textClass.push(disableClass.value);
      }

      const textContent = (
        <span class={maxLengthClass.value} style={maxWithStyle.value}>
          {renderTNodeJSX('icon')}
          <span ref={breadcrumbText} class={`${maxLengthClass.value}-text`}>
            {renderTNodeJSX('default')}
          </span>
        </span>
      );
      let itemContent = <span class={textClass} onClick={beforeClick}>{textContent}</span>;

      if ((props.href || props.to) && !props.disabled) {
        textClass.push(linkClass.value);
        itemContent = (
          <a class={textClass} href={props.href} target={props.target} onClick={handleItemClick}>
            {textContent}
          </a>
        );
      }

      return (
        <div class={itemClass} {...attrs}>
          {/* {isCutOff.value ? <Tooltip content={() => slots?.default()}>{itemContent}</Tooltip> : itemContent} */}
          {/* {isCutOff.value ? 'Tooltip 组件' : itemContent} */}
          {isCutOff.value ? itemContent : itemContent}
          <span class={separatorClass.value}>
            {isFunction(separatorContent) ? separatorContent() : separatorContent}
          </span>
        </div>
      );
    };
  },
});
