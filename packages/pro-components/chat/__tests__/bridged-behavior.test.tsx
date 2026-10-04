import { describe, expect, it, vi } from 'vitest';
import ChatLoading from '../chat-loading';
import Chatbot from '../chatbot';
import ChatMessage from '../chat-message';
import ChatMarkdown from '../chat-markdown';
import Attachments from '../attachments';
import { chatText, findInChat, flush, mountChat, textContent } from '../test/helpers';

// 观察对外结果，不访问 custom element、Omi 实例或 chatEngine 私有状态。
describe('桥接组件公开行为', () => {
  it('ChatLoading 默认动画保持当前运行时 moving 行为', async () => {
    const wrapper = mountChat(ChatLoading);
    await flush();
    expect(findInChat(wrapper.element, '.t-chat-loading__moving').length).toBeGreaterThan(0);
  });

  it('ChatMessage 显示消息正文并支持 content 插槽覆盖', async () => {
    const wrapper = mountChat(ChatMessage, {
      props: { role: 'user', content: [textContent('用户消息正文')] },
    });
    await flush();
    expect(chatText(wrapper.element)).toContain('用户消息正文');
    const slotted = mountChat(ChatMessage, {
      props: { role: 'user', content: [textContent('原始正文')] },
      slots: { content: '<span>自定义消息正文</span>' },
    });
    await flush();
    expect(chatText(slotted.element)).toContain('自定义消息正文');
  });

  it('ChatLoading 文案渲染并响应更新', async () => {
    const wrapper = mountChat(ChatLoading, { props: { text: '正在生成回答' } });
    await flush();
    expect(chatText(wrapper.element)).toContain('正在生成回答');
    await wrapper.setProps({ text: '正在加载下一段' });
    await flush();
    expect(chatText(wrapper.element)).toContain('正在加载下一段');
    expect(chatText(wrapper.element)).not.toContain('正在生成回答');
  });

  it.each(['moving', 'gradient'])('ChatLoading animation=%s 控制公开动画状态', async (animation) => {
    const wrapper = mountChat(ChatLoading, { props: { animation } });
    await flush();
    expect(findInChat(wrapper.element, `.t-chat-loading__${animation}`).length).toBeGreaterThan(0);
  });

  it('ChatMarkdown 保留 Markdown 格式并响应内容更新', async () => {
    const wrapper = mountChat(ChatMarkdown, { props: { content: '**加粗内容**' } });
    await vi.waitFor(() => {
      expect(findInChat(wrapper.element, 'strong').map((node) => node.textContent)).toContain('加粗内容');
    });
    await wrapper.setProps({ content: '[帮助链接](https://example.com/help)' });
    await vi.waitFor(() => {
      expect(findInChat(wrapper.element, 'a[href="https://example.com/help"]').length).toBeGreaterThan(0);
      expect(chatText(wrapper.element)).not.toContain('加粗内容');
    });
  });

  it('Attachments 渲染文件名并传回删除事件', async () => {
    const onRemove = vi.fn();
    const item = { key: 'report', name: '迁移报告.pdf', size: 1024 };
    const wrapper = mountChat(Attachments, { props: { items: [item], removable: true, onRemove } });
    await flush();
    expect(chatText(wrapper.element)).toContain('迁移报告.pdf');
    const remove = findInChat(wrapper.element, '.t-filecard-remove')[0];
    expect(remove).toBeDefined();
    remove.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
    await flush();
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove.mock.calls[0][0].detail).toMatchObject(item);
    await wrapper.setProps({ items: [] });
    await flush();
    expect(chatText(wrapper.element)).not.toContain('迁移报告.pdf');
  });

  it('Chatbot setMessages 替换、追加、前插及 clearMessages 改变消息内容', async () => {
    const wrapper = mountChat(Chatbot, { props: { defaultMessages: [] } });
    await flush();
    const api = wrapper.vm as any;
    const message = (id: string, text: string) => ({ id, role: 'user', content: [textContent(text)] });
    api.setMessages([message('1', '第一条消息')]);
    await flush();
    expect(chatText(wrapper.element)).toContain('第一条消息');
    api.setMessages([message('2', '追加消息')], 'append');
    await flush();
    expect(chatText(wrapper.element)).toContain('第一条消息');
    expect(chatText(wrapper.element)).toContain('追加消息');
    api.setMessages([message('3', '前插消息')], 'prepend');
    await flush();
    const text = chatText(wrapper.element);
    expect(text.indexOf('前插消息')).toBeGreaterThanOrEqual(0);
    expect(text.indexOf('前插消息')).toBeLessThan(text.indexOf('第一条消息'));
    expect(text.indexOf('第一条消息')).toBeLessThan(text.indexOf('追加消息'));
    api.setMessages([message('4', '替换后的消息')]);
    await flush();
    expect(chatText(wrapper.element)).toContain('替换后的消息');
    expect(chatText(wrapper.element)).not.toContain('第一条消息');
    api.clearMessages();
    await flush();
    expect(chatText(wrapper.element)).not.toContain('替换后的消息');
  });
});
