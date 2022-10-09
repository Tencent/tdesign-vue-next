import { computed, ComputedRef, VNode, getCurrentInstance, Slots } from 'vue';
import { DropdownOption, TdDropdownProps } from '../type';
import { useChildComponentSlots } from '../../hooks/slot';

export const getOptionsFromChildren = (menuGroup: any): DropdownOption[] => {
  if (!menuGroup) return [];

  // 处理内部嵌套场景
  if (menuGroup[0].type?.name === 'TDropdownMenu') {
    const groupChildren = menuGroup[0]?.children?.default?.();
    if (Array.isArray(groupChildren)) {
      return getOptionsFromChildren(groupChildren);
    }
  }

  if (Array.isArray(menuGroup)) {
    return menuGroup.map((item) => {
      const groupChildren = item.children?.default?.();

      const contentIdx = groupChildren.findIndex((v: VNode) => typeof v.children === 'string');
      const childrenContent = groupChildren.filter((v: VNode) => typeof v.children !== 'string');
      return {
        ...item.props,
        content: groupChildren[contentIdx],
        children: childrenContent.length > 0 ? getOptionsFromChildren(childrenContent) : null,
      };
    });
  }

  return [];
};

export default function useDropdownOptions(props: TdDropdownProps): ComputedRef<DropdownOption[]> {
  const getChildComponentSlots = useChildComponentSlots();
  const instance = getCurrentInstance();

  const menuSlot =
    (getChildComponentSlots('DropdownMenu')?.[0]?.children as Slots)?.default?.() || instance.slots?.dropdown?.();

  const dropdownOptions = computed(() => {
    if (props.options && props.options.length > 0) return props.options;

    return getOptionsFromChildren(menuSlot);
  });
  return dropdownOptions;
}
