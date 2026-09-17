import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  // The full component suite may have loaded TabNav before this file. Clear the
  // worker-local module cache so these deterministic dependency mocks are used.
  vi.resetModules();
  return {
    calcMaxOffset: vi.fn(),
    calcPrevOrNextOffset: vi.fn(),
    calcValidOffset: vi.fn(),
    calculateOffset: vi.fn(),
    resizeHandler: undefined as undefined | (() => void),
    setNavsWrap: vi.fn(),
    useDragSort: vi.fn(),
    useResize: vi.fn(),
  };
});

vi.mock('@tdesign/common-js/tabs/base', () => ({
  calcMaxOffset: mocks.calcMaxOffset,
  calcPrevOrNextOffset: mocks.calcPrevOrNextOffset,
  calcValidOffset: mocks.calcValidOffset,
  calculateOffset: mocks.calculateOffset,
}));

vi.mock('@tdesign/shared-hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tdesign/shared-hooks')>();
  return {
    ...actual,
    useDragSort: mocks.useDragSort,
    useResize: mocks.useResize,
  };
});

import TTabNav from '../tab-nav';
import type TTabPanel from '../tab-panel';

const createPanels = () =>
  [
    { value: 'first', label: 'First' },
    { value: 'second', label: 'Second' },
    { value: 'third', label: 'Third' },
  ] as unknown as Array<InstanceType<typeof TTabPanel>>;

const mountNav = (overrides: Record<string, unknown> = {}) => {
  const onAdd = vi.fn();
  const onChange = vi.fn();
  const onRemove = vi.fn();
  const wrapper = mount(TTabNav, {
    props: {
      onAdd,
      onChange,
      onRemove,
      panels: createPanels(),
      value: 'first',
      ...overrides,
    },
  });

  return { onAdd, onChange, onRemove, wrapper };
};

const settleMountedEffects = async () => {
  await nextTick();
  vi.runOnlyPendingTimers();
  await nextTick();
};

describe('TabNav', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.calcMaxOffset.mockReset().mockReturnValue(120);
    mocks.calcPrevOrNextOffset.mockReset().mockImplementation((_refs, _offset, action) => (action === 'prev' ? 0 : 80));
    mocks.calcValidOffset
      .mockReset()
      .mockImplementation((offset, maxOffset) => Math.max(0, Math.min(offset, maxOffset)));
    mocks.calculateOffset.mockReset().mockReturnValue(0);
    mocks.setNavsWrap.mockReset();
    mocks.useDragSort.mockReset().mockReturnValue({ setNavsWrap: mocks.setNavsWrap });
    mocks.resizeHandler = undefined;
    mocks.useResize.mockReset().mockImplementation((handler: () => void) => {
      mocks.resizeHandler = handler;
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':panels[array] (slot/function/string/fallback labels)', () => {
      const panels = [
        { value: 'slot', children: { label: () => h('b', { class: 'slot-label' }, 'Slot') } },
        { value: 'function', label: (createElement: typeof h) => createElement('i', 'Function') },
        { value: 'string', label: 'String' },
        { value: 'fallback' },
      ] as unknown as Array<InstanceType<typeof TTabPanel>>;
      const { wrapper } = mountNav({ panels, value: 'slot' });
      const items = wrapper.findAll('.t-tabs__nav-item');

      expect(items).toHaveLength(4);
      expect(wrapper.find('.slot-label').text()).toBe('Slot');
      expect(items[1].find('i').text()).toBe('Function');
      expect(items[2].text()).toBe('String');
      expect(items[3].text()).toBe('选项卡4');
    });

    it(':theme[string]', () => {
      const normal = mountNav().wrapper;
      const card = mountNav({ theme: 'card' }).wrapper;

      expect(normal.find('.t-tabs__bar').exists()).toBe(true);
      expect(card.find('.t-tabs__bar').exists()).toBe(false);
      expect(card.find('.t-tabs__nav-container').classes()).toContain('t-tabs__nav--card');
    });

    it(':panels[default]', () => {
      const wrapper = mount(TTabNav, {
        props: { onChange: vi.fn(), onRemove: vi.fn() },
      });

      expect(wrapper.findAll('.t-tabs__nav-item')).toHaveLength(0);
    });

    it(':disabled[boolean]', async () => {
      const panels = [
        { value: 'first', label: 'First' },
        { value: 'second', label: 'Second', disabled: true },
      ] as unknown as Array<InstanceType<typeof TTabPanel>>;
      const panelDisabled = mountNav({ panels }).wrapper;
      const globallyDisabled = mountNav({ disabled: true, panels }).wrapper;

      expect(panelDisabled.findAll('.t-tabs__nav-item')[0].classes()).not.toContain('t-is-disabled');
      expect(panelDisabled.findAll('.t-tabs__nav-item')[1].classes()).toContain('t-is-disabled');
      expect(
        globallyDisabled.findAll('.t-tabs__nav-item').every((item) => item.classes().includes('t-is-disabled')),
      ).toBe(true);
    });

    it(':dragSort[boolean]', () => {
      const panels = [
        { value: 'first', label: 'First' },
        { value: 'second', label: 'Second', draggable: false },
      ] as unknown as Array<InstanceType<typeof TTabPanel>>;
      const enabled = mountNav({ dragSort: true, panels }).wrapper;
      const disabled = mountNav({ dragSort: false, panels }).wrapper;

      expect(enabled.findAll('.t-tabs__nav-item')[0].attributes('draggable')).toBe('true');
      expect(enabled.findAll('.t-tabs__nav-item')[1].attributes('draggable')).toBe('false');
      expect(disabled.findAll('.t-tabs__nav-item')[0].attributes('draggable')).toBe('false');
    });

    it(':action[array] + :placement[string]', async () => {
      const wrapper = mountNav({ action: [h('button', { class: 'nav-action' }, 'Action')] }).wrapper;

      expect(wrapper.find('.nav-action').text()).toBe('Action');
      await wrapper.setProps({ placement: 'left' });
      expect(wrapper.find('.nav-action').exists()).toBe(false);
      await wrapper.setProps({ placement: 'bottom' });
      expect(wrapper.find('.nav-action').text()).toBe('Action');
    });

    it(':placement[string] + :size[string] + :addable[boolean]', () => {
      const wrapper = mountNav({ addable: true, placement: 'right', size: 'large' }).wrapper;

      expect(wrapper.attributes('style')).toContain('min-height: 48px');
      expect(wrapper.find('.t-tabs__nav-container').classes()).toContain('t-is-right');
      expect(wrapper.find('.t-tabs__nav-container').classes()).toContain('t-is-addable');
      expect(wrapper.find('.t-tabs__nav-wrap').classes()).toContain('t-is-vertical');
      expect(wrapper.find('.t-tabs__add-btn').classes()).toContain('t-size-l');
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style') || '').not.toContain('transform');
    });

    it(':panels[array] (reactive scroll clamp)', async () => {
      const { wrapper } = mountNav();
      await settleMountedEffects();
      const wheelEvent = new WheelEvent('wheel', { cancelable: true, deltaY: 80 });
      wrapper.find('.t-tabs__nav-scroll').element.dispatchEvent(wheelEvent);
      await nextTick();
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-80px');

      mocks.calcMaxOffset.mockReturnValue(50);
      await wrapper.setProps({ panels: createPanels().slice(0, 2) });
      await nextTick();
      await nextTick();
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-50px');
    });

    it(':scrollPosition[string]', async () => {
      const { wrapper } = mountNav();
      await settleMountedEffects();
      mocks.calculateOffset.mockReturnValue(42);

      await wrapper.setProps({ scrollPosition: 'center' });
      vi.runOnlyPendingTimers();
      await nextTick();

      expect(mocks.calculateOffset).toHaveBeenLastCalledWith(expect.any(Object), 0, 'center');
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-42px');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const panels = [
        { value: 'first', label: 'First' },
        { value: 'second', label: 'Second', disabled: true },
        { value: 'third', label: 'Third' },
      ] as unknown as Array<InstanceType<typeof TTabPanel>>;
      const { onChange, wrapper } = mountNav({ panels });
      const items = wrapper.findAll('.t-tabs__nav-item');

      await items[0].trigger('click');
      await items[1].trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      await items[2].trigger('click');
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith('third');
    });

    it('remove', async () => {
      const onPanelRemove = vi.fn();
      const panels = [{ value: 'first', label: 'First', removable: true, onRemove: onPanelRemove }] as unknown as Array<
        InstanceType<typeof TTabPanel>
      >;
      const { onRemove, wrapper } = mountNav({ panels });

      await wrapper.find('.remove-btn').trigger('click');

      expect(onRemove).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 'first', index: 0 });
      expect(onPanelRemove).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 'first' });
    });

    it('add', async () => {
      const withCallback = mountNav({ addable: true });
      await withCallback.wrapper.find('.t-tabs__add-btn').trigger('click');
      expect(withCallback.onAdd).toHaveBeenCalledWith({ e: expect.any(MouseEvent) });

      const withoutCallback = mountNav({ addable: true, onAdd: undefined }).wrapper;
      await expect(withoutCallback.find('.t-tabs__add-btn').trigger('click')).resolves.toBeUndefined();
    });

    it('arrow click', async () => {
      const { wrapper } = mountNav();
      await settleMountedEffects();

      await wrapper.find('.t-tabs__btn--right').trigger('click');
      expect(mocks.calcPrevOrNextOffset).toHaveBeenLastCalledWith(expect.any(Object), 0, 'next');
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-80px');

      await wrapper.find('.t-tabs__btn--left').trigger('click');
      expect(mocks.calcPrevOrNextOffset).toHaveBeenLastCalledWith(expect.any(Object), 80, 'prev');
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(0px');
    });

    it('wheel', async () => {
      const { wrapper } = mountNav();
      await settleMountedEffects();
      const scrollContainer = wrapper.find('.t-tabs__nav-scroll').element;

      const verticalEvent = new WheelEvent('wheel', { cancelable: true, deltaX: 5, deltaY: 30 });
      scrollContainer.dispatchEvent(verticalEvent);
      await nextTick();
      expect(verticalEvent.defaultPrevented).toBe(true);
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-30px');

      const horizontalEvent = new WheelEvent('wheel', { cancelable: true, deltaX: 40, deltaY: 2 });
      scrollContainer.dispatchEvent(horizontalEvent);
      await nextTick();
      expect(horizontalEvent.defaultPrevented).toBe(true);
      expect(wrapper.find('.t-tabs__nav-wrap').attributes('style')).toContain('translate3d(-70px');
    });

    it('wheel (no overflow)', async () => {
      mocks.calcMaxOffset.mockReturnValue(0);
      const { wrapper } = mountNav();
      await settleMountedEffects();
      mocks.calcValidOffset.mockClear();

      const event = new WheelEvent('wheel', { cancelable: true, deltaY: 30 });
      wrapper.find('.t-tabs__nav-scroll').element.dispatchEvent(event);
      await nextTick();

      expect(event.defaultPrevented).toBe(false);
      expect(mocks.calcValidOffset).not.toHaveBeenCalled();
    });
  });

  describe('lifecycle', () => {
    it('mount', async () => {
      const { wrapper } = mountNav();

      await settleMountedEffects();

      expect(mocks.setNavsWrap).toHaveBeenCalledWith(wrapper.find('.t-tabs__nav-wrap').element);
      expect(mocks.calcMaxOffset).toHaveBeenCalled();
      expect(mocks.calculateOffset).toHaveBeenCalledWith(expect.any(Object), 0, 'auto');
      expect(wrapper.find('.t-tabs__btn--right').exists()).toBe(true);
      expect(wrapper.find('.t-tabs__nav-scroll').classes()).toContain('t-is-scrollable');
    });

    it('resize', async () => {
      mountNav();
      await settleMountedEffects();
      mocks.calcMaxOffset.mockClear();

      mocks.resizeHandler?.();
      vi.runOnlyPendingTimers();
      await nextTick();

      expect(mocks.calcMaxOffset).toHaveBeenCalledOnce();
    });

    it('unmount', () => {
      const { wrapper } = mountNav();

      expect(() => wrapper.unmount()).not.toThrow();
    });
  });
});
