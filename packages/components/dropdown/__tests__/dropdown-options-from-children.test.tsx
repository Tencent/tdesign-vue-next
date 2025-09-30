import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import DropdownMenu from '../dropdown-menu';
import DropdownItem from '../dropdown-item';
import { getOptionsFromChildren } from '../hooks/useDropdownOptions';

describe('useDropdownOptions from children', () => {
  it('extracts options from DropdownMenu default slot with nested children and boolean attributes', () => {
    const prefixIconSlot = () => h('i', { class: 'pi' }, 'I');

    const vnodeList = (DropdownMenu as any).setup
      ? // 构造 DropdownMenu 默认插槽返回的 VNode 数组
        [
          // boolean 空字符串属性应映射为 true
          h(DropdownItem as any, { content: 'A', value: 'a', disabled: '' }),
          h(DropdownItem as any, { content: 'B', value: 'b', active: '' }),
          h(DropdownItem as any, { content: 'C', value: 'c', divider: '' }),
          // 带 prefix-icon 子插槽
          h(
            DropdownItem as any,
            { content: 'D', value: 'd' },
            {
              // @ts-ignore
              'prefix-icon': prefixIconSlot,
            },
          ),
          // 嵌套子菜单
          h(
            DropdownItem as any,
            { content: 'Parent', value: 'p' },
            {
              default: () => [
                h(DropdownMenu as any, null, {
                  default: () => [h(DropdownItem as any, { content: 'Child', value: 'ch' })],
                }),
              ],
            },
          ),
        ]
      : [];

    const options = getOptionsFromChildren(vnodeList as any);
    expect(options.length).toBeGreaterThan(0);

    // 校验 boolean 属性映射与 children 解析
    const a = options.find((o) => o.value === 'a');
    const b = options.find((o) => o.value === 'b');
    const c = options.find((o) => o.value === 'c');
    const p = options.find((o) => o.value === 'p');

    expect(a?.disabled).toBe(true);
    expect(b?.active).toBe(true);
    expect(c?.divider).toBe(true);
    expect(typeof options.find((o) => o.value === 'd')?.prefixIcon).toBe('function');
    expect(p?.children && p.children.length).toBeGreaterThan(0);
  });

  it('supports functional content via TNode to h', () => {
    const contentFn = vi.fn((hh: typeof h) => hh('span', 'FUNC'));
    const vnodeList = [h(DropdownItem as any, { content: contentFn, value: 'fv' })];
    const options = getOptionsFromChildren(vnodeList as any);
    // 调用发生在 DropdownMenu 渲染阶段，此处验证函数类型被保留
    expect(typeof options[0].content).toBe('function');
    // 主动调用确认函数可用
    const rendered = (options[0].content as any)(h);
    expect(rendered.type).toBe('span');
  });
});
