import { computed, ComputedRef, toRefs } from 'vue';
import { TdBreadcrumbItemProps, TdBreadcrumbProps } from '../type';
import log from '@tdesign/common-js/log/index';

function valueIsZeroOrUndefined(val: number | string) {
  return val === 0 || val === undefined;
}

export const useEllipsis = (
  props: TdBreadcrumbProps,
  getBreadcrumbItems: ComputedRef<TdBreadcrumbItemProps[]>,
  ellipsisContent: ComputedRef<string | any>,
) => {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = toRefs(props);

  // 是否需要显示省略号
  const shouldShowEllipsis = computed(() => {
    const items = getBreadcrumbItems.value;
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

  // 显示的项目合集，包含省略号
  const getDisplayItems = computed(() => {
    const items = getBreadcrumbItems.value;
    const showEllipsis = shouldShowEllipsis.value;

    if (!showEllipsis) {
      return items;
    }

    const totalItems = items.length;
    const beforeItems = items.slice(0, itemsBeforeCollapse.value);
    const afterItems = items.slice(totalItems - itemsAfterCollapse.value, totalItems);

    return [
      ...beforeItems,
      {
        content: ellipsisContent.value,
        disabled: true,
        isEllipsisItem: true,
      },
      ...afterItems,
    ];
  });

  // 被省略的项目
  const getEllipsisItems = computed(() => {
    const items = getBreadcrumbItems.value;
    if (!shouldShowEllipsis.value) {
      return [];
    }
    const sliceItems = items.slice(itemsBeforeCollapse.value, items.length - itemsAfterCollapse.value);
    return sliceItems.map((item, index) => ({
      ...item,
      isLast: index === sliceItems.length - 1,
    }));
  });

  return {
    getDisplayItems,
    getEllipsisItems,
  };
};
