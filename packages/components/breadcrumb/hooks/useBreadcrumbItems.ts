import { computed, isVNode, Slots } from 'vue';
import { isArray, isString } from 'lodash-es';
import { useChildComponentSlots } from '../../hooks/slot';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from '../type';

interface BreadcrumbItemWithIndex extends TdBreadcrumbItemProps {
  index: number;
}

export const useBreadcrumbItems = (props: TdBreadcrumbProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const getBreadcrumbItems = computed(() => {
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
        let content = child.props?.content;
        let icon = child.props?.icon;

        if (child?.children) {
          const children = child.children as Slots;
          if (children.default) {
            const defaultContent = children.default();
            if (defaultContent) {
              content = defaultContent;
            }
          }
          if (children.icon) {
            const iconContent = children.icon?.();
            if (iconContent) {
              icon = iconContent;
            }
          }
          if (isArray(content)) {
            const firstChild = content[0];
            if (isVNode(firstChild) && isString(firstChild?.children)) {
              content = firstChild.children;
            }
          }
        }
        breadcrumbItems.push({
          ...child.props,
          content,
          icon,
          index: currentIndex++,
        });
      });
    }

    return breadcrumbItems;
  });

  return {
    getBreadcrumbItems,
  };
};
