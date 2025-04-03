import { computed, toRefs } from 'vue';
import { TdBreadcrumbItemProps, TdBreadcrumbProps } from '../type';
import log from '@tdesign/common-js/log/index';

function valueIsZeroOrUndefined(val: number | string) {
  return val === 0 || val === undefined;
}

export const useEllipsis = (
  props: TdBreadcrumbProps,
  getBreadcrumbItems: () => TdBreadcrumbItemProps[],
  ellipsisContent: () => string | any,
) => {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = toRefs(props);

  const shouldShowEllipsis = computed(() => {
    const items = getBreadcrumbItems();
    const currentMaxItems = maxItems.value ?? 0;
    const totalItems = items.length;
    const itemsCollapseSum = computed(() => {
      return itemsBeforeCollapse.value + itemsAfterCollapse.value;
    });

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
    if (currentMaxItems <= 0 || totalItems <= currentMaxItems || itemsCollapseSum.value >= totalItems) {
      return false;
    }

    return true;
  });

  // 显示的项目合集，包含省略符号
  const getDisplayItems = computed(() => {
    const items = getBreadcrumbItems();
    const totalItems = items.length;

    if (!shouldShowEllipsis.value) {
      return items;
    }

    const beforeItems = items.slice(0, itemsBeforeCollapse.value);
    const afterItems = items.slice(totalItems - itemsAfterCollapse.value, totalItems);

    const ellipsisItem = {
      content: ellipsisContent(),
      disabled: true,
      isEllipsisItem: true,
    };

    return [...beforeItems, ellipsisItem, ...afterItems];
  });

  // 被折叠的项目
  // TODO: isLast是否需要呢？
  const getEllipsisItems = () => {
    const items = getBreadcrumbItems();
    const sliceItems = items.slice(itemsBeforeCollapse.value, items.length - itemsAfterCollapse.value);
    return sliceItems.map((item, index) => {
      return {
        ...item,
        isLast: index === sliceItems.length - 1,
      };
    });
  };

  return {
    getDisplayItems,
    getEllipsisItems,
  };
};
