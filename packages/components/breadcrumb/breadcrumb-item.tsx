import { defineComponent, VNode, inject, ref, computed, getCurrentInstance, onMounted, onBeforeUpdate } from 'vue';
import props from './breadcrumb-item-props';
import Tooltip from '../tooltip/index';
import { isTextEllipsis } from '@tdesign/shared-utils';
import { useContent, useTNodeJSX, usePrefixClass } from '@tdesign/hooks';

interface LocalTBreadcrumb {
  separator: VNode | string;
  theme: string;
  maxItemWidth: string;
}

const localTBreadcrumbOrigin: LocalTBreadcrumb = {
  separator: '',
  theme: 'light',
  maxItemWidth: undefined,
};

export default defineComponent({
  name: 'TBreadcrumbItem',
  inheritAttrs: false,
  props: {
    ...props,
    isEllipsisItem: Boolean,
  },
  setup(props, { attrs }) {
    const renderContent = useContent();
    const renderTNodeJSX = useTNodeJSX();

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
    const maxWithStyle = computed(() => {
      const maxItemWidth = localTBreadcrumb?.maxItemWidth;
      const maxWith: string = props.maxWidth || maxItemWidth || '120';
      return { maxWidth: `${maxWith}px` };
    });
    const { proxy } = getCurrentInstance();

    onMounted(() => {
      if (breadcrumbText.value) {
        isCutOff.value = isTextEllipsis(breadcrumbText.value);
      }
    });
    onBeforeUpdate(() => {
      if (breadcrumbText.value) {
        isCutOff.value = isTextEllipsis(breadcrumbText.value);
      }
    });

    const handleClick = () => {
      const router = props.router || proxy.$router;

      if (props.to && router) {
        props.replace ? router.replace(props.to) : router.push(props.to);
      } else {
        window.location.href = props.href;
      }
    };

    const bindEvent = (e: MouseEvent) => {
      if (!props.disabled) {
        e.preventDefault();
        if (props.target === '_blank') {
          props.href ? window.open(props.href) : window.open(props.to as string);
        } else {
          handleClick();
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
          if (props.disabled) {
            e.stopPropagation();
            return;
          }
        },
      };

      const content = renderContent('default', 'content');
      const textContent = (
        <span {...{ class: maxLengthClass.value, style: maxWithStyle.value }}>
          {renderTNodeJSX('icon')}
          <span ref={breadcrumbText} class={`${maxLengthClass.value}-text`}>
            {content}
          </span>
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
      if (props?.isEllipsisItem) {
        itemContent = <div style="display: flex">{content}</div>;
      }
      return (
        <div class={itemClass} {...attrs} onClick={!props.disabled && props.onClick}>
          {isCutOff.value ? <Tooltip content={() => content}>{itemContent}</Tooltip> : itemContent}
          <span
            class={separatorClass.value}
            style={{
              textOverflow: isCutOff.value ? 'ellipsis' : 'clip',
            }}
          >
            {localTBreadcrumb.separator}
          </span>
        </div>
      );
    };
  },
});
