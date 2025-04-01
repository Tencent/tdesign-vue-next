import { defineComponent, reactive, provide, toRefs, computed } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { useEllipsis } from './hooks/useEllipsis';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props: TdBreadcrumbProps, { slots }) {
    const { separator, theme, maxItemWidth } = toRefs(props);
    const COMPONENT_NAME = usePrefixClass('breadcrumb');
    provide(
      'tBreadcrumb',
      reactive({
        separator,
        theme,
        slots: { separator: slots.separator },
        maxItemWidth,
      }),
    );
    const renderTNodeJSX = useTNodeJSX();

    const getBreadcrumbItems = computed(() => {
      if (props.options && props.options.length) {
        return props.options;
      }
      const defaultSlot = renderTNodeJSX('default');
      if (!defaultSlot) return [];
      return defaultSlot;
    });

    const { getDisplayItems } = useEllipsis(props, slots, () => getBreadcrumbItems.value, separator.value);

    return () => {
      const items = getDisplayItems.value;
      const content = items.map((item, index) => {
        if (typeof item === 'object' && 'content' in item) {
          return (
            <BreadcrumbItem key={index} {...item}>
              {item.content}
            </BreadcrumbItem>
          );
        }
        return item;
      });

      return <div class={COMPONENT_NAME.value}>{content}</div>;
    };
  },
});
