import { defineComponent, VNode, inject, ref, computed, watchEffect, onMounted, onBeforeUpdate, Fragment } from 'vue';
import { ChevronRightIcon } from 'tdesign-icons-vue-next';

import props from './breadcrumb-item-props';
import Tooltip from '../tooltip/index';
import { isNodeOverflow } from '../utils/dom';
import { useEmitEvent } from '../hooks/event';
import { getPropsApiByEvent } from '../utils/helper';
import { usePrefixClass } from '../hooks/useConfig';

export const EVENT_NAME_WITH_KEBAB = ['click'];
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
  components: {
    Tooltip,
  },
  props,
  emits: ['click'],
  setup(props, { slots, attrs }) {
    const breadcrumbText = ref<HTMLElement | null>(null);
    const tBreadcrumb = inject('tBreadcrumb');
    const localTBreadcrumb = ref(localTBreadcrumbOrigin);
    const themeClassName = ref(localTBreadcrumb?.value?.theme);
    const curRouter = ref(null);
    const isCutOff = ref(false);
    const COMPONENT_NAME = usePrefixClass('breadcrumb__item');
    const separatorClass = usePrefixClass('breadcrumb__separator');
    const disableClass = usePrefixClass('is-disabled');
    const linkClass = usePrefixClass('link');
    const maxLengthClass = usePrefixClass('breadcrumb__inner');
    const textFlowClass = usePrefixClass('breadcrumb--text-overflow');
    const emitEvent = useEmitEvent();
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.value?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });

    watchEffect(() => {
      localTBreadcrumb.value = tBreadcrumb as any;
    });

    onMounted(() => {
      isCutOff.value = isNodeOverflow(breadcrumbText.value);
    });
    onBeforeUpdate(() => {
      isCutOff.value = true;
    });

    const separatorPropContent = localTBreadcrumb.value?.separator;
    const separatorSlot = localTBreadcrumb.value?.slots?.separator;
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

    const renderContent = () => {
      const itemClass = [COMPONENT_NAME.value, themeClassName];
      const textClass = [textFlowClass.value];

      if (props.disabled) {
        textClass.push(disableClass.value);
      }
      const listeners: Record<string, any> = {};
      EVENT_NAME_WITH_KEBAB.forEach((eventName) => {
        listeners[getPropsApiByEvent(eventName)] = (...args: any[]) => {
          emitEvent(eventName, ...args);
        };
      });

      const textContent = (
        <span ref="breadcrumbText" {...{ class: maxLengthClass.value, style: maxWithStyle.value }}>
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

    return {
      breadcrumbText,
      renderContent,
    };
  },

  render() {
    const { renderContent } = this;

    return <Fragment>{renderContent()}</Fragment>;
  },
});
