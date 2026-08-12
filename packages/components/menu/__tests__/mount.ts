import { ref } from 'vue';
import { vi } from 'vitest';

import type { TdMenuInterface } from '../types';
import type { VMenu } from '../utils';

export const createMenuContext = (overrides: Partial<TdMenuInterface> = {}) => {
  const add = vi.fn();
  const remove = vi.fn();
  const menu: TdMenuInterface = {
    activeValue: ref(),
    activeValues: ref([]),
    collapsed: ref(false),
    expandValues: ref([]),
    isHead: false,
    mode: ref('normal'),
    open: vi.fn(),
    select: vi.fn(),
    theme: ref('light'),
    vMenu: { add, remove } as unknown as VMenu,
    ...overrides,
  };
  return { add, menu, remove };
};
