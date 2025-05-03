import { defineComponent, reactive, provide, toRefs, computed, isVNode, Slots, ref } from 'vue';
import props from './props';
import BreadcrumbItem from './breadcrumb-item';
import type { TdBreadcrumbItemProps, TdBreadcrumbProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import { ChevronRightIcon as TdChevronRightIcon, EllipsisIcon as TdEllipsisIcon } from 'tdesign-icons-vue-next';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { isArray, isString } from 'lodash-es';
import { useChildComponentSlots } from '../hooks/slot';
import log from '@tdesign/common-js/log/index';

interface BreadcrumbItemWithIndex extends TdBreadcrumbItemProps {
  index?: number;
  isEllipsisItem?: boolean;
}

function valueIsZeroOrUndefined(val: number | string) {
  return val === 0 || val === undefined;
}

export default defineComponent({
  name: 'TBreadcrumb',
  props,
  setup(props: TdBreadcrumbProps) {
    const { theme, maxItemWidth, maxItems, itemsBeforeCollapse, itemsAfterCollapse } = toRefs(props);
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

    // 是否需要显示省略号
    const shouldShowEllipsis = computed(() => {
      const breadcrumbOptions = getOptions();
      const items = breadcrumbOptions.value;
      const currentMaxItems = maxItems.value ?? 0;
      const totalItems = items.length;
      const itemsCollapseSum = itemsBeforeCollapse.value + itemsAfterCollapse.value;

      // 配置有误的情况，不显示省略并告警
      if (
        currentMaxItems > 0 &&
        (valueIsZeroOrUndefined(itemsBeforeCollapse.value) || valueIsZeroOrUndefined(itemsAfterCollapse.value))
      ) {
        log.error('Breadcrumb', '需要设置 itemsBeforeCollapse 和 itemsAfterCollapse 属性来控制省略号前后的显示项数。');
        return false;
      }

      // 不需要显示省略号的情况：
      // 1. 最大显示数量 <= 0
      // 2. 项目总数 <= 最大显示数量
      // 3. 省略号前后显示数量（itemsBeforeCollapse、itemsAfterCollapse）之和 >= 项目总数
      if (currentMaxItems <= 0 || totalItems <= currentMaxItems || itemsCollapseSum >= totalItems) {
        return false;
      }

      return true;
    });

    const getOptions = () => {
      const breadcrumbOptions = ref<BreadcrumbItemWithIndex[]>([]);
      let currentIndex = 0;

      // 处理 options
      if (props.options?.length) {
        props.options.forEach((option) => {
          breadcrumbOptions.value.push({
            ...option,
            index: currentIndex++,
          });
        });
      }

      // 处理 slots
      const getChildComponentSlots = useChildComponentSlots();
      const itemsSlots = getChildComponentSlots('TBreadcrumbItem');
      if (isArray(itemsSlots)) {
        itemsSlots.forEach((child) => {
          const getSlotOrProp = (slotName: string, propName: string) => {
            if (child?.children) {
              const children = child.children as Slots;
              const slotContent = children[slotName]?.();
              if (slotContent) {
                if (slotName === 'default' && isArray(slotContent)) {
                  // 处理数组类型的 slot 内容
                  const textContent = slotContent
                    .filter((item) => isVNode(item) && isString(item?.children))
                    .map((item) => (item as any)?.children)
                    .join('');
                  return textContent || slotContent;
                }
                return slotContent;
              }
            }
            // 如果没有 slot 内容，则使用 props
            return child.props?.[propName];
          };

          breadcrumbOptions.value.push({
            ...child.props,
            content: getSlotOrProp('default', 'content'),
            icon: getSlotOrProp('icon', 'icon'),
            index: currentIndex++,
          });
        });
      }

      return breadcrumbOptions;
    };

    // 省略号，支持自定义
    const ellipsisContent = computed(() => {
      const breadcrumbOptions = getOptions();
      const items = breadcrumbOptions.value;
      const ellipsisItems = items.slice(props.itemsBeforeCollapse, items.length - props.itemsAfterCollapse);
      const ellipsisSlot = renderTNodeJSX('ellipsis', {
        params: {
          items: ellipsisItems,
          separator,
        },
      });
      return ellipsisSlot || <EllipsisIcon />;
    });

    return () => {
      // 显示的项目合集，包含省略号
      const breadcrumbOptions = getOptions();
      const breadcrumbItems = breadcrumbOptions.value;
      const showEllipsis = shouldShowEllipsis.value;
      let items = breadcrumbItems;

      if (showEllipsis) {
        const totalItems = breadcrumbItems.length;
        const beforeItems = breadcrumbItems.slice(0, itemsBeforeCollapse.value);
        const afterItems = breadcrumbItems.slice(totalItems - itemsAfterCollapse.value, totalItems);

        items = [
          ...beforeItems,
          {
            content: ellipsisContent.value,
            disabled: true,
            isEllipsisItem: true,
          },
          ...afterItems,
        ];
      }

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
