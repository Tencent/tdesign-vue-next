import { computed, ComputedRef, VNode, getCurrentInstance, Slots, Component } from 'vue';
import { isArray, isString, camelCase } from 'lodash-es';

import { useChildComponentSlots } from '@tdesign/shared-hooks';
import type { DropdownOption, TdDropdownProps } from '../type';

export const getOptionsFromChildren = (menuNode: VNode | VNode[]): DropdownOption[] => {
  if (!menuNode) return [];
  // 处理内部嵌套场景
  if (isArray(menuNode) && (menuNode[0]?.type as Component)?.name === 'TDropdownMenu') {
    // TODO: RawSlots
    // @ts-ignore
    const groupChildren = menuNode[0]?.children?.default?.();
    if (isArray(groupChildren)) {
      return getOptionsFromChildren(groupChildren);
    }
  }

  if (isArray(menuNode)) {
    menuNode = menuNode.reduce((acc, item) => {
      acc = acc.concat(isArray(item.children) ? item.children : item);
      return acc;
    }, []);
    return menuNode
      .map((item) => {
        const slotContent = (item.children as any)?.content?.();
        const slotPrefixIcon = (item.children as any)?.prefixIcon?.() || (item.children as any)?.['prefix-icon']?.();
        const groupChildren = (item.children as any)?.default?.();

        // 当前节点的渲染内容
        const contentCtx = groupChildren?.filter?.(
          (v: VNode) => !['TDropdownMenu', 'TDropdownItem'].includes((v.type as { name: string })?.name),
        );
        // 嵌套菜单的节点
        const childrenCtx = groupChildren?.filter?.(
          (v: VNode) =>
            !isString(v.children) && ['TDropdownMenu', 'TDropdownItem'].includes((v.type as { name: string })?.name),
        );

        // 将item.props的属性名都转成驼峰，再进行传递
        const itemProps = Object.keys(item.props || {}).reduce((props: typeof item.props, propName) => {
          // 处理 TDropdownItem 的 boolean attribute
          if (
            item.props[propName] === '' &&
            (item.type as Component)?.name === 'TDropdownItem' &&
            ['active', 'divider', 'disabled'].includes(propName)
          ) {
            props[camelCase(propName)] = true;
          } else {
            props[camelCase(propName)] = item.props[propName];
          }
          return props;
        }, {});

        return {
          content: slotContent || contentCtx || groupChildren,
          ...itemProps,
          ...(slotPrefixIcon ? { prefixIcon: () => slotPrefixIcon } : {}),
          children: childrenCtx?.length > 0 ? getOptionsFromChildren(childrenCtx) : null,
        };
      })
      .filter((v) => !!v.content);
  }

  // 处理v-if的场景
  if (isArray(menuNode) && isArray(menuNode[0]?.children)) return getOptionsFromChildren(menuNode[0]?.children);

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
