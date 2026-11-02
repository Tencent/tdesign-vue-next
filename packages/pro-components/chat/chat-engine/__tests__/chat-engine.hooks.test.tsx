/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import {
  useAgentState,
  useChat,
  useAgentToolcall,
  useAgentActivity,
  agentToolcallRegistry,
  activityRegistry,
  type ChatMessagesData,
} from '../../index';
import { flush, mountChat } from '../../test/helpers';

describe('Chat public hooks', () => {
  describe('hooks', () => {
    it('useAgentState exposes and updates the current state', async () => {
      let api: ReturnType<typeof useAgentState>;
      const Host = defineComponent({
        setup() {
          api = useAgentState({ initialState: { a: 1 } });
          return () => h('div');
        },
      });
      mountChat(Host);
      await flush();
      expect(api.stateMap.value).toEqual({ a: 1 });
      api.setStateMap({ b: 2 });
      expect(api.getCurrentState()).toEqual({ b: 2 });
      expect(api.getStateByKey('b')).toBe(2);
    });

    it('useChat 同步初始消息、引擎更新与清空后的状态', async () => {
      let api: ReturnType<typeof useChat>;
      const initial: ChatMessagesData[] = [{ id: '1', role: 'user', content: [{ type: 'text', data: 'hi' }] }];
      const Host = defineComponent({
        setup() {
          api = useChat({
            defaultMessages: initial,
            chatServiceConfig: { endpoint: '/chat' },
          });
          return () => h('div');
        },
      });
      mountChat(Host);
      await flush();
      expect(api.messages.value).toEqual(initial);
      expect(api.status.value).toBe('idle');

      const updated: ChatMessagesData[] = [
        { id: '2', role: 'assistant', status: 'complete', content: [{ type: 'text', data: '回答' }] },
      ];
      api.chatEngine.value.setMessages(updated, 'replace');
      await flush();
      expect(api.messages.value).toEqual(updated);
      expect(api.status.value).toBe('complete');

      api.chatEngine.value.clearMessages();
      await flush();
      expect(api.messages.value).toEqual([]);
      expect(api.status.value).toBe('idle');
    });

    it('useChat 多实例消息隔离；卸载一个实例不影响其他实例', async () => {
      const instances: ReturnType<typeof useChat>[] = [];
      const Host = defineComponent({
        setup() {
          instances.push(useChat({ defaultMessages: [], chatServiceConfig: { endpoint: '/chat' } }));
          return () => h('div');
        },
      });
      const wrapper = mountChat(Host);
      mountChat(Host);
      await flush();
      const first = instances[0];
      const second = instances[1];
      const update: ChatMessagesData[] = [
        { id: 'answer', role: 'assistant', status: 'complete', content: [{ type: 'text', data: '回答' }] },
      ];
      first.chatEngine.value.setMessages(update, 'replace');
      await flush();
      expect(first.messages.value).toEqual(update);
      expect(second.messages.value).toEqual([]);
      expect(second.status.value).toBe('idle');
      const other: ChatMessagesData[] = [
        { id: 'other', role: 'assistant', status: 'pending', content: [{ type: 'text', data: '另一个回答' }] },
      ];
      second.chatEngine.value.setMessages(other, 'replace');
      await flush();
      expect(first.messages.value).toEqual(update);
      expect(first.status.value).toBe('complete');
      expect(second.messages.value).toEqual(other);
      expect(second.status.value).toBe('pending');

      wrapper.unmount();
      expect(first.chatEngine.value).toBeNull();
      second.chatEngine.value.clearMessages();
      await flush();
      expect(second.messages.value).toEqual([]);
      expect(second.status.value).toBe('idle');
    });
  });

  describe('registration hook lifecycle', () => {
    it('useAgentToolcall cleans up its own registration without affecting another instance', () => {
      const Tool = defineComponent({ setup: () => () => h('div') });
      const mountTool = (name: string) =>
        mountChat(
          defineComponent({
            setup() {
              useAgentToolcall({ name, component: Tool } as any);
              return () => h('div');
            },
          }),
        );
      const first = mountTool('first-test-tool');
      mountTool('second-test-tool');
      expect(agentToolcallRegistry.has('first-test-tool')).toBe(true);
      expect(agentToolcallRegistry.has('second-test-tool')).toBe(true);
      first.unmount();
      expect(agentToolcallRegistry.has('first-test-tool')).toBe(false);
      expect(agentToolcallRegistry.has('second-test-tool')).toBe(true);
    });

    it('useAgentActivity cleans up its own registration without affecting another instance', () => {
      const Activity = defineComponent({ setup: () => () => h('div') });
      const mountActivity = (activityType: string) =>
        mountChat(
          defineComponent({
            setup() {
              useAgentActivity({ activityType, component: Activity } as any);
              return () => h('div');
            },
          }),
        );
      const first = mountActivity('first-test-activity');
      mountActivity('second-test-activity');
      expect(activityRegistry.has('first-test-activity')).toBe(true);
      expect(activityRegistry.has('second-test-activity')).toBe(true);
      first.unmount();
      expect(activityRegistry.has('first-test-activity')).toBe(false);
      expect(activityRegistry.has('second-test-activity')).toBe(true);
    });
  });
});
