import { defineComponent, reactive, provide, toRefs, computed } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import { TdBreadcrumbItemProps, TdBreadcrumbProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { useBreadcrumbItems, useEllipsis } from './hooks';
import { ChevronRightIcon as TdChevronRightIcon, EllipsisIcon as TdEllipsisIcon } from 'tdesign-icons-vue-next';
import { useGlobalIcon } from '../hooks/useGlobalIcon';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props: TdBreadcrumbProps) {
    const { theme, maxItemWidth } = toRefs(props);
    const COMPONENT_NAME = usePrefixClass('breadcrumb');
    const renderTNodeJSX = useTNodeJSX();
    const { getBreadcrumbItems } = useBreadcrumbItems(props);
    const { ChevronRightIcon, EllipsisIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
      EllipsisIcon: TdEllipsisIcon,
    });
    const separatorContent = renderTNodeJSX('separator');
    const separator = separatorContent || <ChevronRightIcon {...{ color: 'rgba(0,0,0,.3)' }} />;

    provide(
      'tBreadcrumb',
      reactive({
        separator,
        theme,
        maxItemWidth,
      }),
    );

    const { getDisplayItems, getEllipsisItems } = useEllipsis(
      props,
      () => getBreadcrumbItems.value,
      () => ellipsisContent.value,
    );

    const ellipsisContent = computed(() => {
      const ellipsisSlot = renderTNodeJSX('ellipsis', {
        params: {
          items: getEllipsisItems(),
          separator,
        },
      });
      return ellipsisSlot || <EllipsisIcon />;
    });

    return () => {
      const items = getDisplayItems.value;
      const content = items.map((item: TdBreadcrumbItemProps, index: number) => {
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
