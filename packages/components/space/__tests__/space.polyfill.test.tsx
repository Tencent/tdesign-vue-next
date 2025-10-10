// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Space, Button } from '@tdesign/components';

describe('Space polyfill & validators & separator(string)', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy?.mockRestore();
  });

  describe('forceFlexGapPolyfill=true renders CSS variables', () => {
    it('single size -> sets both column/row gap equal', () => {
      const wrapper = mount(() => (
        <Space forceFlexGapPolyfill size="small">
          <Button>1</Button>
          <Button>2</Button>
        </Space>
      ));
      const el = wrapper.find('.t-space').element as HTMLElement;
      // polyfill class
      expect(el.classList.contains('t-space--polyfill')).toBeTruthy();
      // CSS variables
      expect(el.style.getPropertyValue('--td-space-column-gap')).toBe('8px');
      expect(el.style.getPropertyValue('--td-space-row-gap')).toBe('8px');
      // 不应存在原生 gap
      expect(el.style.gap).toBe('');
    });

    it('array size two values -> sets distinct column/row gaps', () => {
      const wrapper = mount(() => (
        <Space forceFlexGapPolyfill size={['20px', '80px']}>
          <Button>1</Button>
          <Button>2</Button>
        </Space>
      ));
      const el = wrapper.find('.t-space').element as HTMLElement;
      expect(el.style.getPropertyValue('--td-space-column-gap')).toBe('20px');
      expect(el.style.getPropertyValue('--td-space-row-gap')).toBe('80px');
    });

    it('array mixed number and enum -> number->px, enum->mapped', () => {
      const wrapper = mount(() => (
        <Space forceFlexGapPolyfill size={[10, 'large']}>
          <Button>1</Button>
          <Button>2</Button>
        </Space>
      ));
      const el = wrapper.find('.t-space').element as HTMLElement;
      expect(el.style.getPropertyValue('--td-space-column-gap')).toBe('10px');
      expect(el.style.getPropertyValue('--td-space-row-gap')).toBe('24px');
    });
  });

  describe('validators coverage (props.ts)', () => {
    it('align invalid value triggers validator false branch', () => {
      mount(() => (
        <Space align={'invalid' as any}>
          <Button>1</Button>
        </Space>
      ));
      // Vue 会打印 prop 验证失败的 warning
      expect(warnSpy).toHaveBeenCalled();
    });

    it('direction invalid value triggers validator false branch', () => {
      mount(() => (
        <Space direction={'diag' as any}>
          <Button>1</Button>
        </Space>
      ));
      expect(warnSpy).toHaveBeenCalled();
    });

    it('align empty string triggers !val branch (returns true)', () => {
      const wrapper = mount(() => (
        <Space align={'' as any}>
          <Button>1</Button>
        </Space>
      ));
      // 不应有 align 修饰类
      expect(
        wrapper
          .find('.t-space')
          .classes()
          .some((c) => c.startsWith('t-space-align-')),
      ).toBeFalsy();
    });

    it('direction empty string triggers !val branch (returns true)', () => {
      const wrapper = mount(() => (
        <Space direction={'' as any}>
          <Button>1</Button>
        </Space>
      ));
      // 不应有方向修饰类
      const cls = wrapper.find('.t-space').classes();
      expect(cls.includes('t-space-vertical') || cls.includes('t-space-horizontal')).toBeFalsy();
    });
  });

  describe('separator as string', () => {
    it('renders string separators between items', () => {
      const wrapper = mount(() => (
        <Space separator="|">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </Space>
      ));
      const seps = wrapper.findAll('.t-space-item-separator');
      expect(seps.length).toBe(2);
      expect(seps[0].text()).toBe('|');
      expect(seps[1].text()).toBe('|');
    });
  });
});
