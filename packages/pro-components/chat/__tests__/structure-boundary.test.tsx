/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue';
import { describe, expect, it } from 'vitest';
import { mountChat, structureOf } from '../test/helpers';

// 同一组件契约换成普通 DOM 时，容器快照仍然一致；未指定的节点继续被检查。
describe('UI 组件边界', () => {
  const renderContainer = (tag: string, containerClass = 't-chat__list') => {
    const Message = defineComponent({ setup: () => () => h(tag, { class: 't-chat-message' }, '消息正文') });
    const Host = defineComponent({
      setup: () => () => h('div', { class: containerClass }, [h(Message), h('span', '列表尾部')]),
    });
    const wrapper = mountChat(Host);
    return structureOf(wrapper.element, { omitRoots: [wrapper.findComponent(Message).element] });
  };

  it('webc 改为普通 Vue 元素时容器指纹不变', () => {
    expect(renderContainer('t-chat-item')).toBe(renderContainer('article'));
  });

  it('容器 class 变化仍被保留', () => {
    expect(renderContainer('article', 't-chat__list-broken')).not.toBe(renderContainer('article'));
  });

  it('没有指定组件边界时保留自定义元素和插槽内容', () => {
    const root = document.createElement('div');
    root.innerHTML = '<business-content><span>插槽内容</span></business-content>';
    expect(structureOf(root)).toContain('<business-content>');
    expect(structureOf(root)).toContain('插槽内容');
  });
});
