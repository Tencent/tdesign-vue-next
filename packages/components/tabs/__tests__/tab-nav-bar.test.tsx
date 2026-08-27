import { mount } from '@vue/test-utils';
import { h, nextTick, type VNode } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  // Keep the mocked resize observer independent of modules loaded by other
  // component tests in the full suite.
  vi.resetModules();
  return {
    resizeHandler: undefined as undefined | (() => void),
    useResizeObserver: vi.fn(),
  };
});

vi.mock('@tdesign/shared-hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tdesign/shared-hooks')>();
  return {
    ...actual,
    useResizeObserver: mocks.useResizeObserver,
  };
});

import TTabNavBar from '../tab-nav-bar';

const createNav = (value: string, width: number, height: number, withElement = true): VNode => {
  const nav = h('div', { value });
  if (withElement) {
    const element = document.createElement('div');
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    nav.el = element;
  }
  return nav;
};

const settleStyle = async () => {
  await nextTick();
  await nextTick();
};

describe('TabNavBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.resizeHandler = undefined;
    mocks.useResizeObserver.mockReset().mockImplementation((_ref, handler: () => void) => {
      mocks.resizeHandler = handler;
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':navs[array] + :value[string] (horizontal)', async () => {
      const navs = [createNav('first', 40, 10), createNav('second', 60, 20), createNav('third', 30, 30)];
      const wrapper = mount(TTabNavBar, { props: { navs, value: 'second' } });

      await settleStyle();

      expect(wrapper.classes()).toEqual(['t-tabs__bar', 't-is-top']);
      expect(wrapper.attributes('style')).toContain('left: 40px');
      expect(wrapper.attributes('style')).toContain('width: 60px');
    });

    it(':placement[vertical]', async () => {
      const navs = [createNav('first', 40, 10), createNav('second', 60, 20), createNav('third', 30, 30)];
      const wrapper = mount(TTabNavBar, {
        props: { navs, placement: 'right', value: 'third' },
      });

      await settleStyle();

      expect(wrapper.classes()).toContain('t-is-right');
      expect(wrapper.attributes('style')).toContain('top: 30px');
      expect(wrapper.attributes('style')).toContain('height: 30px');
    });

    it(':navs[array] (missing preceding element)', async () => {
      const navs = [createNav('first', 40, 10, false), createNav('second', 60, 20)];
      const wrapper = mount(TTabNavBar, { props: { navs, value: 'second' } });

      await settleStyle();

      expect(wrapper.attributes('style')).toContain('left: 0px');
      expect(wrapper.attributes('style')).toContain('width: 60px');
    });

    it(':navs[array] (missing active element)', async () => {
      const navs = [createNav('first', 40, 10), createNav('second', 60, 20, false)];
      const wrapper = mount(TTabNavBar, { props: { navs, value: 'second' } });

      await settleStyle();

      expect(wrapper.attributes('style')).toContain('left: 40px');
      expect(wrapper.attributes('style')).toContain('width: 0px');
    });

    it(':value[string] (missing)', async () => {
      const wrapper = mount(TTabNavBar, {
        props: { navs: [createNav('first', 40, 10)], value: 'missing' },
      });

      await settleStyle();

      expect(wrapper.attributes('style')).toBeUndefined();
    });

    it(':value[string] + :placement[string] + :navs[array] (reactive)', async () => {
      const navs = [createNav('first', 40, 10), createNav('second', 60, 20), createNav('third', 30, 30)];
      const wrapper = mount(TTabNavBar, { props: { navs, value: 'first' } });
      await settleStyle();

      await wrapper.setProps({ value: 'third' });
      await settleStyle();
      expect(wrapper.attributes('style')).toContain('left: 100px');
      expect(wrapper.attributes('style')).toContain('width: 30px');

      await wrapper.setProps({ placement: 'left' });
      await settleStyle();
      expect(wrapper.attributes('style')).toContain('top: 30px');
      expect(wrapper.attributes('style')).toContain('height: 30px');

      const replacement = [createNav('third', 75, 45)];
      await wrapper.setProps({ navs: replacement });
      await settleStyle();
      expect(wrapper.attributes('style')).toContain('top: 0px');
      expect(wrapper.attributes('style')).toContain('height: 45px');
    });

    it('resize', async () => {
      const navs = [createNav('first', 40, 10)];
      const wrapper = mount(TTabNavBar, { props: { navs, value: 'first' } });
      await settleStyle();
      expect(wrapper.attributes('style')).toContain('width: 40px');

      (navs[0].el as HTMLElement).style.width = '90px';
      mocks.resizeHandler?.();
      vi.advanceTimersByTime(34);
      await nextTick();
      expect(wrapper.attributes('style')).toContain('width: 40px');

      vi.advanceTimersByTime(1);
      await nextTick();
      expect(wrapper.attributes('style')).toContain('width: 90px');
      expect(mocks.useResizeObserver).toHaveBeenCalledOnce();
    });
  });
});
