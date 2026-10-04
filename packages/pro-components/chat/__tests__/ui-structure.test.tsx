/**
 * L4 - UI 层结构指纹
 *
 * 说明：这是唯一会「因为 DOM 变化而失败」的一层，也是刻意保留的验收闸门。
 * 指纹只包含标签 + class + 少量语义属性（style / id / 图标内部 / webc 桥接属性都被剔除），
 * 因此：
 * - 迁移到纯 Vue 后，只要公开的 class 结构与层级不变，快照无需更新；
 * - 一旦 class 结构发生变化，快照会失败并强制人工确认是否属于 breaking change。
 */
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import ChatList from '../chat-list';
import ChatItem from '../chat-item';
import ChatSender from '../chat-sender';
import ChatActionbar from '../chat-actionbar';
import ChatReasoning from '../chat-reasoning';
import { chatItemMetaList, mountChat, structureOf } from '../test/helpers';

describe('chat :ui', () => {
  it('ChatList 容器层结构指纹', () => {
    const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
    // 消息项由底层实现承载（当前为 webc 自定义元素 + shadow DOM），容器层指纹与实现解耦
    expect(structureOf(wrapper.element, { ignoreCustomElements: true })).toMatchSnapshot('chat-list');
  });

  it('ChatList reverse 容器层结构指纹', () => {
    const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, reverse: true } });
    expect(structureOf(wrapper.element, { ignoreCustomElements: true })).toMatchSnapshot('chat-list-reverse');
  });

  it('ChatItem 结构指纹（含头像 / 昵称 / 时间）', () => {
    const wrapper = mountChat(ChatItem, {
      props: {
        role: 'user',
        variant: 'base',
        name: '张三',
        datetime: '2024-01-01 10:00:00',
        avatar: 'https://example.com/a.png',
        content: '你好 TDesign',
      },
    });
    expect(structureOf(wrapper.element)).toMatchSnapshot('chat-item');
  });

  it('ChatSender 结构指纹', () => {
    const wrapper = mountChat(ChatSender, { props: { value: '你好' } });
    expect(structureOf(wrapper.element)).toMatchSnapshot('chat-sender');
  });

  it('ChatActionbar 结构指纹', () => {
    const wrapper = mountChat(ChatActionbar, { props: { actionBar: ['replay', 'copy', 'good', 'bad'] } });
    expect(structureOf(wrapper.element)).toMatchSnapshot('chat-actionbar');
  });

  it('ChatReasoning 结构指纹', () => {
    const wrapper = mountChat(ChatReasoning, { props: { layout: 'border' } });
    expect(structureOf(wrapper.element)).toMatchSnapshot('chat-reasoning');
  });

  it('完整对话场景组合结构指纹', () => {
    const ChatScene = defineComponent({
      setup() {
        return () => (
          <div class="chat-scene">
            <ChatList
              data={chatItemMetaList}
              v-slots={{ actionbar: () => <ChatActionbar actionBar={['copy', 'good']} /> }}
            />
            <ChatSender value="" />
          </div>
        );
      },
    });
    const wrapper = mountChat(ChatScene);
    expect(structureOf(wrapper.element, { ignoreCustomElements: true })).toMatchSnapshot('chat-scene');
  });

  it('公开布局 class 在组合场景中齐全', () => {
    const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
    const html = wrapper.html();
    ['t-chat', 't-chat__list'].forEach((token) => {
      expect(html, `缺少 class: ${token}`).toContain(token);
    });
  });
});
