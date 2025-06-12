import { computed, isVNode, Slots } from 'vue';
import { isArray, isString } from 'lodash-es';
import { useChildComponentSlots } from '@tdesign/hooks';
import type { TdBreadcrumbProps, TdBreadcrumbItemProps } from '../type';

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

        breadcrumbItems.push({
          ...child.props,
          content: getSlotOrProp('default', 'content'),
          icon: () => getSlotOrProp('icon', 'icon'),
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
