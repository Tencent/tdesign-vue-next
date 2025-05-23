import { defineComponent, reactive, provide, toRefs } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import type { TdBreadcrumbItemProps, TdBreadcrumbProps } from './type';
import { useTNodeJSX } from '@tdesign/hooks';
import { usePrefixClass } from '@tdesign/hooks';
import { useBreadcrumbOptions, useEllipsis } from './hooks';
import { ChevronRightIcon as TdChevronRightIcon, EllipsisIcon as TdEllipsisIcon } from 'tdesign-icons-vue-next';
import { useGlobalIcon } from '@tdesign/hooks';

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props: TdBreadcrumbProps) {
    const { theme, maxItemWidth } = toRefs(props);
    const COMPONENT_NAME = usePrefixClass('breadcrumb');
    const renderTNodeJSX = useTNodeJSX();
    const { ChevronRightIcon, EllipsisIcon } = useGlobalIcon({
      ChevronRightIcon: TdChevronRightIcon,
      EllipsisIcon: TdEllipsisIcon,
    });
    const separatorContent = renderTNodeJSX('separator');
    const separator = separatorContent || <ChevronRightIcon />;

    provide(
      'tBreadcrumb',
      reactive({
        separator,
        theme,
        maxItemWidth,
      }),
    );

    return () => {
      const { breadcrumbOptions } = useBreadcrumbOptions(props);
      // 省略号，支持自定义

      const ellipsisItems = breadcrumbOptions.value.slice(
        props.itemsBeforeCollapse,
        breadcrumbOptions.value.length - props.itemsAfterCollapse,
      );
      const ellipsisSlot = renderTNodeJSX('ellipsis', {
        params: {
          items: ellipsisItems,
          separator,
        },
      });

      const ellipsisContent = ellipsisSlot || <EllipsisIcon />;

      const { getDisplayItems } = useEllipsis(props, breadcrumbOptions, ellipsisContent);
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
