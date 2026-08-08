import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Progress, { type ProgressProps } from '@tdesign/components/progress';
import progressProps from '@tdesign/components/progress/props';

const BAR = '.t-progress__bar';
const CIRCLE = '.t-progress--circle';
const CIRCLE_INNER = '.t-progress__circle-inner';
const CIRCLE_OUTER = '.t-progress__circle-outer';
const INFO = '.t-progress__info';
const INNER = '.t-progress__inner';
const PLUMP = '.t-progress--plump';
const THIN = '.t-progress--thin';

const gradientCases: Array<[NonNullable<ProgressProps['color']>, string]> = [
  [['#0052d9', '#00a870'], 'linear-gradient( 90deg,#0052d9,#00a870 )'],
  [{ from: '#0052d9', to: '#00a870' }, 'linear-gradient(to right, #0052d9, #00a870)'],
  [{ direction: '45deg', '100%': '#00a870', '0%': '#0052d9' }, 'linear-gradient(45deg, #0052d9 0%,#00a870 100%)'],
];

class ResizeObserverMock {
  static instances: ResizeObserverMock[] = [];

  observe = vi.fn();

  unobserve = vi.fn();

  disconnect = vi.fn();

  constructor(private readonly callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }

  trigger() {
    this.callback([], this as unknown as ResizeObserver);
  }
}

const getStyle = (wrapper: { element: Element }) => (wrapper.element as HTMLElement).style;

const setClientWidth = (element: Element, value: number) => {
  Object.defineProperty(element, 'clientWidth', { configurable: true, value });
};

const flushResize = async () => {
  await nextTick();
  await nextTick();
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Progress', () => {
  describe('props', () => {
    it(':color[string]', () => {
      const wrapper = mount(Progress, {
        props: { color: 'rgb(255, 0, 0)', percentage: 30 },
      });

      expect(getStyle(wrapper.get(INNER)).background).toBe('rgb(255, 0, 0)');

      const circleWrapper = mount(Progress, {
        props: { color: '#0052d9', percentage: 30, theme: 'circle' },
      });
      expect(getStyle(circleWrapper.get(CIRCLE_INNER)).stroke).toBe('#0052d9');
    });

    it(':color[array/object]', () => {
      const backgroundSetter = vi.spyOn(CSSStyleDeclaration.prototype, 'background', 'set');

      gradientCases.forEach(([color, expectedBackground]) => {
        const wrapper = mount(Progress, { props: { color } });
        expect(backgroundSetter).toHaveBeenLastCalledWith(expectedBackground);
        wrapper.unmount();
      });

      const circleWrapper = mount(Progress, {
        props: {
          color: { from: '#0052d9', to: '#00a870' },
          percentage: 30,
          theme: 'circle',
        },
      });
      expect(getStyle(circleWrapper.get(CIRCLE_INNER)).stroke).toBe('');
    });

    it(':label[string/boolean]', async () => {
      const wrapper = mount(Progress, { props: { percentage: 30 } });
      expect(wrapper.get(INFO).text()).toBe('30%');

      await wrapper.setProps({ label: 'Uploading' });
      expect(wrapper.get(INFO).text()).toBe('Uploading');

      await wrapper.setProps({ label: false });
      expect(wrapper.get(INFO).text()).toBe('');
    });

    it(':label[slot/function]', () => {
      const label = vi.fn((createElement: typeof h) =>
        createElement('span', { class: 'function-label' }, 'Function label'),
      );
      const functionWrapper = mount(Progress, { props: { label } });

      expect(functionWrapper.get('.function-label').text()).toBe('Function label');
      expect(label).toHaveBeenCalledWith(expect.any(Function), {});

      const slotWrapper = mount(Progress, {
        slots: { label: () => <span class="slot-label">Slot label</span> },
      });
      expect(slotWrapper.get('.slot-label').text()).toBe('Slot label');

      const precedenceWrapper = mount(Progress, {
        props: { label: 'Prop label' },
        slots: { label: () => <span class="slot-label">Slot label</span> },
      });
      expect(precedenceWrapper.get(INFO).text()).toBe('Prop label');
      expect(precedenceWrapper.find('.slot-label').exists()).toBe(false);

      const booleanWrapper = mount(Progress, {
        props: { label: true },
        slots: { label: () => <span class="slot-label">Slot label</span> },
      });
      expect(booleanWrapper.get('.slot-label').text()).toBe('Slot label');
    });

    it(':percentage[number]', async () => {
      const wrapper = mount(Progress);

      expect(wrapper.classes()).toContain('t-progress');
      expect(wrapper.get(THIN).classes()).toContain('t-progress--status--default');
      expect(getStyle(wrapper.get(INNER)).width).toBe('0%');
      expect(wrapper.get(INFO).text()).toBe('0%');

      await wrapper.setProps({ percentage: 67 });
      expect(getStyle(wrapper.get(INNER)).width).toBe('67%');
      expect(wrapper.get(INFO).text()).toBe('67%');

      await wrapper.setProps({ percentage: 100 });
      expect(wrapper.get(THIN).classes()).toContain('t-progress--status--success');
      expect(wrapper.get(INFO).text()).toBe('100%');
      expect(wrapper.find('.t-progress__icon').exists()).toBe(false);
    });

    it(':size[string/number]', async () => {
      const lineWrapper = mount(Progress, { props: { size: 'small' } });
      expect(lineWrapper.get(THIN).classes()).toContain('t-size-s');

      await lineWrapper.setProps({ size: 'medium' });
      expect(lineWrapper.get(THIN).classes()).not.toContain('t-size-s');

      for (const [size, diameter, fontSize, strokeWidth] of [
        ['small', 72, 14, 4],
        ['medium', 112, 20, 6],
        ['large', 160, 36, 6],
      ] as const) {
        const wrapper = mount(Progress, {
          props: { percentage: 1, size, theme: 'circle' },
        });
        const style = getStyle(wrapper.get(CIRCLE));

        expect(style.width).toBe(`${diameter}px`);
        expect(style.height).toBe(`${diameter}px`);
        expect(style.fontSize).toBe(`${fontSize}px`);
        expect(wrapper.get(CIRCLE_OUTER).attributes('stroke-width')).toBe(`${strokeWidth}`);
      }

      for (const [size, fontSize] of [
        [50, `${50 * (14 / 72)}px`],
        [120, `${120 * (20 / 112)}px`],
        [200, '45px'],
      ] as const) {
        const wrapper = mount(Progress, { props: { size, theme: 'circle' } });
        const style = getStyle(wrapper.get(CIRCLE));

        expect(style.width).toBe(`${size}px`);
        expect(style.fontSize).toBe(fontSize);
      }

      for (const size of ['', 0, -20, 'not-a-number'] as const) {
        const wrapper = mount(Progress, { props: { size, theme: 'circle' } });
        expect(getStyle(wrapper.get(CIRCLE)).width).toBe('112px');
      }
    });

    it(':status[success/error/warning/active]', () => {
      const validateStatus = progressProps.status.validator as (value?: string) => boolean;
      expect(validateStatus()).toBe(true);
      expect(validateStatus('')).toBe(true);
      expect(validateStatus('success')).toBe(true);
      expect(validateStatus('error')).toBe(true);
      expect(validateStatus('warning')).toBe(true);
      expect(validateStatus('active')).toBe(true);
      expect(validateStatus('paused')).toBe(false);

      for (const [status, iconClass] of [
        ['success', 't-icon-check-circle-filled'],
        ['warning', 't-icon-error-circle-filled'],
        ['error', 't-icon-close-circle-filled'],
      ] as const) {
        const wrapper = mount(Progress, { props: { percentage: 35, status } });

        expect(wrapper.get(THIN).classes()).toContain(`t-progress--status--${status}`);
        expect(wrapper.get('.t-progress__icon').classes()).toContain(iconClass);
        expect(wrapper.get(INFO).text()).toBe('');
      }

      for (const [status, iconClass] of [
        ['success', 't-icon-check'],
        ['warning', 't-icon-error'],
        ['error', 't-icon-close'],
      ] as const) {
        const wrapper = mount(Progress, { props: { status, theme: 'circle' } });
        expect(wrapper.get('.t-progress__icon').classes()).toContain(iconClass);
      }

      const activeWrapper = mount(Progress, {
        props: { percentage: 100, status: 'active' },
      });
      expect(activeWrapper.get(THIN).classes()).toContain('t-progress--status--active');
      expect(activeWrapper.find('.t-progress__icon').exists()).toBe(false);
      expect(activeWrapper.get(INFO).text()).toBe('100%');
    });

    it(':strokeWidth[string/number]', async () => {
      const lineWrapper = mount(Progress, { props: { strokeWidth: 8 } });
      expect(getStyle(lineWrapper.get(BAR)).height).toBe('8px');
      expect(getStyle(lineWrapper.get(BAR)).borderRadius).toBe('8px');

      await lineWrapper.setProps({ strokeWidth: '0.5rem' });
      expect(getStyle(lineWrapper.get(BAR)).height).toBe('0.5rem');
      expect(getStyle(lineWrapper.get(BAR)).borderRadius).toBe('0.5rem');

      const circleWrapper = mount(Progress, {
        props: { percentage: 25, size: 120, strokeWidth: 10, theme: 'circle' },
      });
      const inner = circleWrapper.get(CIRCLE_INNER);
      const radius = (120 - 10) / 2;
      const perimeter = Math.PI * 2 * radius;

      expect(inner.attributes('r')).toBe('55');
      expect(inner.attributes('stroke-width')).toBe('10');
      expect(inner.attributes('stroke-dasharray')).toBe(`${perimeter * 0.25}  ${perimeter * 0.75}`);
      expect(inner.attributes('transform')).toBe('matrix(0,-1,1,0,0,120)');
    });

    it(':theme[line/circle]', async () => {
      const validateTheme = progressProps.theme.validator as (value?: string) => boolean;
      expect(validateTheme()).toBe(true);
      expect(validateTheme('')).toBe(true);
      expect(validateTheme('line')).toBe(true);
      expect(validateTheme('plump')).toBe(true);
      expect(validateTheme('circle')).toBe(true);
      expect(validateTheme('dashboard')).toBe(false);

      const wrapper = mount(Progress);
      expect(wrapper.find(THIN).exists()).toBe(true);
      expect(wrapper.find(PLUMP).exists()).toBe(false);
      expect(wrapper.find(CIRCLE).exists()).toBe(false);

      await wrapper.setProps({ theme: 'circle' });
      const circle = wrapper.get(CIRCLE);
      const svg = wrapper.get('svg');
      const outer = wrapper.get(CIRCLE_OUTER);

      expect(getStyle(circle)).toMatchObject({
        width: '112px',
        height: '112px',
        fontSize: '20px',
      });
      expect(svg.attributes()).toMatchObject({ width: '112', height: '112', viewBox: '0 0 112 112' });
      expect(outer.attributes()).toMatchObject({ cx: '56', cy: '56', r: '53', 'stroke-width': '6' });
      expect(wrapper.find(CIRCLE_INNER).exists()).toBe(false);

      await wrapper.setProps({ percentage: 1 });
      expect(wrapper.find(CIRCLE_INNER).exists()).toBe(true);
    });

    it(':theme[plump]', async () => {
      ResizeObserverMock.instances = [];
      vi.stubGlobal('ResizeObserver', ResizeObserverMock);

      const wrapper = mount(Progress, {
        props: { label: 'Uploading', percentage: 10, theme: 'plump' },
      });
      await nextTick();

      const observer = ResizeObserverMock.instances[0];
      const bar = wrapper.get(PLUMP);
      const inner = wrapper.get(INNER);
      expect(bar.classes()).toContain('t-progress--over-ten');
      expect(inner.get(INFO).text()).toBe('Uploading');
      expect(observer.observe).toHaveBeenCalledWith(inner.element);

      const info = wrapper.get(INFO);
      setClientWidth(inner.element, 50);
      setClientWidth(info.element, 45);
      observer.trigger();
      await flushResize();

      expect(bar.classes()).toContain('t-progress--under-ten');
      expect(inner.find(INFO).exists()).toBe(false);
      expect(bar.get(`:scope > ${INFO}`).text()).toBe('Uploading');

      setClientWidth(inner.element, 100);
      observer.trigger();
      await flushResize();
      expect(bar.classes()).toContain('t-progress--over-ten');
      expect(inner.get(INFO).text()).toBe('Uploading');

      await wrapper.setProps({ label: false, size: 'small', status: 'error' });
      observer.trigger();
      await flushResize();
      expect(bar.classes()).toEqual(
        expect.arrayContaining(['t-progress--status--error', 't-progress--over-ten', 't-size-s']),
      );
      expect(wrapper.find('.t-progress__icon').exists()).toBe(false);
      expect(inner.get(INFO).text()).toBe('');

      wrapper.unmount();
      expect(observer.unobserve).toHaveBeenCalledWith(inner.element);
      expect(observer.disconnect).toHaveBeenCalledOnce();

      observer.trigger();
      await flushResize();
    });

    it(':trackColor[string]', () => {
      const wrapper = mount(Progress, {
        props: { trackColor: 'rgb(0, 0, 255)' },
      });
      expect(getStyle(wrapper.get(BAR)).backgroundColor).toBe('rgb(0, 0, 255)');

      const circleWrapper = mount(Progress, {
        props: { percentage: 30, theme: 'circle', trackColor: '#e7e7e7' },
      });
      expect(getStyle(circleWrapper.get(CIRCLE_OUTER)).stroke).toBe('#e7e7e7');
    });
  });
});
