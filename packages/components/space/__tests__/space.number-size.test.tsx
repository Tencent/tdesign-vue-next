// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { Space, Button } from '@tdesign/components';

describe('Space number size coverage', () => {
  it('size as number type renders px value', () => {
    const wrapper = mount(() => (
      <Space size={20}>
        <Button>1</Button>
        <Button>2</Button>
      </Space>
    ));
    
    const el = wrapper.find('.t-space').element as HTMLElement;
    // 应该生成 gap: "20px"
    expect(el.style.gap).toBe('20px');
  });

  it('size as number type with polyfill renders CSS variables', () => {
    const wrapper = mount(() => (
      <Space size={30} forceFlexGapPolyfill>
        <Button>1</Button>
        <Button>2</Button>
      </Space>
    ));
    
    const el = wrapper.find('.t-space').element as HTMLElement;
    // polyfill 模式下应该使用 CSS 变量
    expect(el.style.getPropertyValue('--td-space-column-gap')).toBe('30px');
    expect(el.style.getPropertyValue('--td-space-row-gap')).toBe('30px');
    expect(el.style.gap).toBe(''); // 不应该有原生 gap
  });
});