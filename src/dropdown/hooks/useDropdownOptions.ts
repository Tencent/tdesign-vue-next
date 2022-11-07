import { computed, ComputedRef, VNode, getCurrentInstance, Slots } from 'vue';
import { DropdownOption, TdDropdownProps } from '../type';
import { useChildComponentSlots } from '../../hooks/slot';

export const getOptionsFromChildren = (menuGroup: any): DropdownOption[] => {
  if (!menuGroup) return [];

  // 处理内部嵌套场景
  if (menuGroup[0]?.type?.name === 'TDropdownMenu') {
    const groupChildren = menuGroup[0]?.children?.default?.();
    if (Array.isArray(groupChildren)) {
      return getOptionsFromChildren(groupChildren);
    }
  }

  // 处理v-if的场景
  if (Array.isArray(menuGroup[0]?.children)) return getOptionsFromChildren(menuGroup[0]?.children);

  if (Array.isArray(menuGroup)) {
    return menuGroup
      .map((item) => {
        const groupChildren = item.children?.default?.();

        // 当前节点的渲染内容
        const contentCtx = groupChildren?.filter?.(
          (v: VNode) => !['TDropdownMenu', 'TDropdownItem'].includes((v.type as { name: string })?.name),
        );
        // 嵌套菜单的节点
        const childrenCtx = groupChildren?.filter?.(
          (v: VNode) =>
            typeof v.children !== 'string' &&
            ['TDropdownMenu', 'TDropdownItem'].includes((v.type as { name: string })?.name),
        );

        return {
          ...item.props,
          content: contentCtx || groupChildren,
          children: childrenCtx?.length > 0 ? getOptionsFromChildren(childrenCtx) : null,
        };
      })
      .filter((v) => !!v.content);
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
