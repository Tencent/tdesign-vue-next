import { computed, h, toRefs } from 'vue';
import { TdBreadcrumbItemProps, TdBreadcrumbProps } from '../type';
import log from '@tdesign/common-js/log/index';

function valueIsZeroOrUndefined(val: number | string) {
  return val === 0 || val === undefined;
}

export const useEllipsis = (
  props: TdBreadcrumbProps,
  slots: {
    ellipsis?: () => any;
    separator?: () => any;
  },
  getBreadcrumbItems: () => TdBreadcrumbItemProps[],
  separator: TdBreadcrumbProps['separator'],
) => {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse } = toRefs(props);

  const getEllipsisContent = () => {
    if (slots.ellipsis) {
      return slots.ellipsis();
    }
    const ellipsisValue = props.ellipsis;
    if (typeof ellipsisValue === 'function') {
      return ellipsisValue(h, {
        items: getBreadcrumbItems(),
        separator: slots.separator ? slots.separator() : separator,
      });
    }
    return ellipsisValue || '...';
  };

  const shouldShowEllipsis = computed(() => {
    const items = getBreadcrumbItems();
    const currentMaxItems = maxItems.value ?? 0;
    const totalItems = items.length;

    // 如果最大显示数量小于等于0，或总项数小于等于最大显示数量，或前/后显示数量之和大于等于总项数，则不需要显示省略号
    if (
      currentMaxItems <= 0 ||
      totalItems <= currentMaxItems ||
      itemsBeforeCollapse.value + itemsAfterCollapse.value >= totalItems
    ) {
      return false;
    }

    if (
      currentMaxItems > 0 &&
      (valueIsZeroOrUndefined(itemsBeforeCollapse.value) || valueIsZeroOrUndefined(itemsAfterCollapse.value))
    ) {
      log.error(
        'Breadcrumb',
        '当 maxItems > 0 时，需要设置 itemsBeforeCollapse 和 itemsAfterCollapse 属性来控制省略号前后的显示项数。',
      );
      return false;
    }

    return true;
  });

  const getDisplayItems = computed(() => {
    const items = getBreadcrumbItems();

    const totalItems = items.length;

    if (!shouldShowEllipsis.value) {
      return items;
    }

    const beforeItems = items.slice(0, itemsBeforeCollapse.value);
    const afterItems = items.slice(totalItems - itemsAfterCollapse.value, totalItems);

    const ellipsisItem = {
      content: getEllipsisContent(),
      disabled: true,
    };

    return [...beforeItems, ellipsisItem, ...afterItems];
  });

  return {
    getDisplayItems,
  };
};
