import { isArray } from 'lodash-es';

import { useChildComponentSlots } from '@tdesign/shared-hooks';

export const useListItems = () => {
  const getChildComponentSlots = useChildComponentSlots();
  // Track if we're currently in the render phase
  let isInRenderPhase = false;

  // Return a getter function that only accesses slots during render phase
  // This prevents the Vue warning about calling slots outside of render function
  const getListItems = () => {
    // During setup phase (before render), return empty array to avoid slot access
    // The virtual scroll will re-evaluate when data changes during render
    if (!isInRenderPhase) {
      return [];
    }

    const computedListItems = [];
    // 处理 slots
    const listItemSlots = getChildComponentSlots('ListItem');

    if (isArray(listItemSlots)) {
      for (const child of listItemSlots) {
        computedListItems.push({
          ...child.props,
          slots: child.children,
        } as any);
      }
    }
    return computedListItems;
  };

  // Function to mark that we're entering render phase
  const setRenderPhase = (value: boolean) => {
    isInRenderPhase = value;
  };

  return {
    getListItems,
    setRenderPhase,
  };
};
