import { defineComponent, nextTick } from 'vue';
import type { VNodeChild } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';

import Tooltip from '@tdesign/components/tooltip';
import type { TooltipProps } from '@tdesign/components/tooltip';
import popupProps from '@tdesign/components/popup/props';
import type { PopupVisibleChangeContext } from '@tdesign/components/popup';

type TestSlots = Record<string, () => VNodeChild>;

const mountedWrappers = new Set<VueWrapper>();
export const popupUpdate = vi.fn();

const PopupStub = defineComponent({
  name: 'TPopup',
  inheritAttrs: false,
  props: popupProps,
  setup(_, { expose, slots }) {
    expose({ update: popupUpdate });
    return () => (
      <section class="popup-stub">
        <div class="popup-trigger">{slots.default?.()}</div>
        {slots.content && <div class="popup-content">{slots.content()}</div>}
      </section>
    );
  },
});

const trackWrapper = <T extends VueWrapper>(wrapper: T) => {
  mountedWrappers.add(wrapper);
  return wrapper;
};

export const renderTooltipWithPopupStub = (props: Partial<TooltipProps> = {}, slots: TestSlots = {}) =>
  trackWrapper(
    mount(Tooltip, {
      props,
      slots,
      global: {
        stubs: {
          TPopup: PopupStub,
        },
      },
    }),
  );

export const renderTooltip = (props: Partial<TooltipProps> = {}, slots: TestSlots = {}) =>
  trackWrapper(
    mount(Tooltip, {
      attachTo: document.body,
      props,
      slots,
    }),
  );

export const getPopupStub = (wrapper: VueWrapper) => wrapper.findComponent(PopupStub);

export const getVisibleChange = (wrapper: VueWrapper) =>
  getPopupStub(wrapper).props('onVisibleChange') as (visible: boolean, context?: PopupVisibleChangeContext) => void;

export const waitForPopupRender = async () => {
  await nextTick();
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await nextTick();
};

export const cleanup = () => {
  mountedWrappers.forEach((wrapper) => wrapper.unmount());
  mountedWrappers.clear();
  popupUpdate.mockReset();
  document.body.innerHTML = '';
};
