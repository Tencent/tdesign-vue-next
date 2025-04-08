import { computed } from 'vue';
import { isArray } from 'lodash-es';
import { useChildComponentSlots } from '../../hooks/slot';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from '../type';
import { renderVNodeTNode } from '../../descriptions/utils';

interface BreadcrumbItemWithIndex extends TdBreadcrumbItemProps {
  index: number;
}

export const useBreadcrumbOptions = (props: TdBreadcrumbProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const breadcrumbOptions = computed(() => {
    const breadcrumbItems: BreadcrumbItemWithIndex[] = [];
    let currentIndex = 0;

    // 处理 options
    if (props.options?.length) {
      props.options.forEach((option) => {
        breadcrumbItems.push({
          ...option,
          index: currentIndex++,
        });
      });
    }

    // 处理 slots
    const itemsSlots = getChildComponentSlots('TBreadcrumbItem');
    if (isArray(itemsSlots)) {
      itemsSlots.forEach((child) => {
        breadcrumbItems.push({
          ...child.props,
          content: renderVNodeTNode(child, 'content', 'default'),
          icon: renderVNodeTNode(child, 'icon'),
          index: currentIndex++,
        });
      });
    }

    return breadcrumbItems;
  });

  return {
    breadcrumbOptions,
  };
};
