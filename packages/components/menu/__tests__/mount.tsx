import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { defineComponent, h, inject, nextTick, provide, ref, shallowRef } from 'vue';
import { vi } from 'vitest';

import PopupOverflowContent from '../components/popup-overflow-content';
import MenuItem from '../menu-item';
import Submenu from '../submenu';
import type { TdMenuItemProps, TdSubmenuProps } from '../type';
import type { TdMenuInterface, TdSubMenuInterface } from '../types';
import type { VMenu } from '../utils';

const mountedWrappers: VueWrapper[] = [];

const trackWrapper = <T extends VueWrapper>(wrapper: T): T => {
  mountedWrappers.push(wrapper);
  return wrapper;
};

export const cleanupMenuMounts = () => {
  mountedWrappers.splice(0).forEach((wrapper) => {
    if (!wrapper.vm.$.isUnmounted) wrapper.unmount();
  });
};

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

// eslint-disable-next-line vue/one-component-per-file -- Shared probe exposes HeadMenu context state to assertions.
export const HeadMenuContextProbe = defineComponent({
  name: 'HeadMenuContextProbe',
  setup() {
    const menu = inject<TdMenuInterface>('TdMenu');
    return () => (
      <div class="context-probe">
        <span data-testid="active">{String(menu.activeValue.value ?? '')}</span>
        <span data-testid="expanded">{menu.expandValues?.value.join(',')}</span>
        <span data-testid="mode">{menu.mode.value}</span>
        <button data-testid="select" onClick={() => menu.select('selected')} />
        <button data-testid="open-one" onClick={() => menu.open?.('one', 'add')} />
        <button data-testid="open-two" onClick={() => menu.open?.('two', 'add')} />
        <button data-testid="remove-one" onClick={() => menu.open?.('one', 'remove')} />
        <button data-testid="remove-missing" onClick={() => menu.open?.('missing', 'remove')} />
      </div>
    );
  },
});

type TestSlots = Record<string, () => ReturnType<typeof h> | ReturnType<typeof h>[] | string>;

export const mountMenuItem = (
  props: TdMenuItemProps = {},
  options: {
    menu?: TdMenuInterface;
    router?: object;
    slots?: TestSlots;
    submenu?: TdSubMenuInterface | null;
  } = {},
) => {
  const context = options.menu ? { menu: options.menu } : createMenuContext();
  const global = {
    mocks: options.router ? { $router: options.router } : {},
    provide: {
      TdMenu: context.menu,
      ...(options.submenu === null ? {} : { TdSubmenu: options.submenu }),
    },
  };
  const wrapper = trackWrapper(mount(MenuItem, { props, slots: options.slots, global }));
  return { ...context, wrapper };
};

type SubmenuTestProps = TdSubmenuProps & { expandType?: string };

export const mountSubmenu = (
  props: SubmenuTestProps = {},
  options: {
    menu?: TdMenuInterface;
    parentName?: 'TMenu' | 'THeadMenu';
    parentSubmenu?: TdSubMenuInterface;
    slots?: TestSlots;
  } = {},
) => {
  const createdContext = createMenuContext();
  const context = { ...createdContext, menu: options.menu ?? createdContext.menu };
  const currentProps = shallowRef<SubmenuTestProps>({ ...props });
  // eslint-disable-next-line vue/one-component-per-file -- Host supplies the parent name and injection for mountSubmenu.
  const Host = defineComponent({
    name: options.parentName ?? 'TMenu',
    setup() {
      provide('TdMenu', context.menu);
      if (options.parentSubmenu) provide('TdSubmenu', options.parentSubmenu);
      return () => h(Submenu, currentProps.value, options.slots);
    },
  });
  const wrapper = trackWrapper(mount(Host));
  return {
    ...context,
    async setProps(nextProps: Partial<SubmenuTestProps>) {
      currentProps.value = { ...currentProps.value, ...nextProps };
      await nextTick();
    },
    submenu: wrapper.findComponent(Submenu),
    wrapper,
  };
};

export const mountPopupOverflowContent = (foldIndex: number, slots: TestSlots = {}) =>
  trackWrapper(mount(PopupOverflowContent, { props: { foldIndex }, slots }));
