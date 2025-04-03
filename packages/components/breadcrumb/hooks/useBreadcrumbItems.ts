import { computed, VNode, isVNode } from 'vue';
import { isArray, isObject, isString } from 'lodash-es';
import { useChildComponentSlots } from '../../hooks/slot';
import { TdBreadcrumbProps, TdBreadcrumbItemProps } from '../type';

export const useBreadcrumbItems = (props: TdBreadcrumbProps) => {
  const getChildComponentSlots = useChildComponentSlots();

  const getBreadcrumbItems = computed(() => {
    let dynamicIndex = 0;
    // options
    const breadcrumbItems: TdBreadcrumbItemProps[] =
      props.options?.map((option) => {
        const getFormatOption = (items: TdBreadcrumbItemProps) => {
          const res = {
            ...items,
            index: dynamicIndex,
          };
          dynamicIndex++;
          return res;
        };
        return getFormatOption(option);
      }) || [];

    // slots
    const getFormatContent = (items: VNode | any) => {
      let content = items.props?.content;
      let icon = items.props?.icon;
      if (items?.children) {
        if (isObject(items.children) && items.children?.default) {
          content = items.children.default?.();
          icon = items.children.icon?.();
        }
        if (isArray(content)) {
          for (const child of content) {
            if (isVNode(child) && isString(child?.children)) {
              content = child?.children;
            }
          }
        }
      }
      return { content, icon };
    };

    const itemsSlots = getChildComponentSlots('TBreadcrumbItem');
    if (isArray(itemsSlots)) {
      for (const child of itemsSlots) {
        const { content, icon } = getFormatContent(child);
        breadcrumbItems.push({
          ...child.props,
          content,
          icon,
        } as TdBreadcrumbItemProps);
        dynamicIndex++;
      }
    }
    return breadcrumbItems;
  });

  return {
    getBreadcrumbItems,
  };
};
