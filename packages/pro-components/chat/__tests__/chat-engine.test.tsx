/**
 * L3 - chat-engine 组合类 API
 *
 * 覆盖 Agent 场景下的组合能力：
 * - 注册表（toolcall / activity）的注册-查询-渲染-注销契约；
 * - useChat / useAgentState 等组合式 API 的返回值契约；
 * - 对外导出的消息工具方法。
 *
 * 这一层是纯逻辑，与 UI 渲染实现完全解耦，迁移前后应完全一致。
 */
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { defineComponent, h } from 'vue';
import {
  activityRegistry,
  agentToolcallRegistry,
  getMessageContentForCopy,
  isAIMessage,
  isToolCallContent,
  useAgentState,
  useChat,
} from '../index';
import { createRegistryManager } from '../chat-engine/components/shared/createRegistry';
import { flush, mountChat } from '../test/helpers';

const TestComponent = defineComponent({ setup: () => () => h('div') });

describe('chat-engine', () => {
  describe('registry', () => {
    beforeEach(() => {
      agentToolcallRegistry.clear();
      activityRegistry.clear();
    });

    it('注册表对外方法契约完整（toolcall 与 activity 一致）', () => {
      const methods = [
        'register',
        'get',
        'getRenderFunction',
        'getAll',
        'unregister',
        'clear',
        'has',
        'getRegisteredKeys',
      ];
      [agentToolcallRegistry, activityRegistry].forEach((registry) => {
        methods.forEach((method) => {
          expect(typeof (registry as any)[method], `缺少方法 ${method}`).toBe('function');
        });
      });
    });

    it('createRegistryManager 可创建独立注册表', () => {
      const registry = createRegistryManager<{ component: any; name: string }>({
        getKey: (config) => config.name,
        eventName: 'test-registered',
        eventDetailKey: 'name',
      });
      registry.register({ name: 'x', component: TestComponent } as any);
      expect(registry.getRegisteredKeys()).toEqual(['x']);
    });

    it('注册后可查询、可获取渲染组件', () => {
      const component = TestComponent;
      expect(agentToolcallRegistry.register({ name: 'search', component } as any)).toBe(true);
      expect(agentToolcallRegistry.has('search')).toBe(true);
      expect(agentToolcallRegistry.get('search')).toMatchObject({ name: 'search' });
      expect(agentToolcallRegistry.getRegisteredKeys()).toEqual(['search']);
      expect(agentToolcallRegistry.getRenderFunction('search')).toBeTruthy();
      // 缓存：同一 key 返回同一组件
      expect(agentToolcallRegistry.getRenderFunction('search')).toBe(agentToolcallRegistry.getRenderFunction('search'));
    });

    it('重复注册同一组件返回 false', () => {
      const component = TestComponent;
      agentToolcallRegistry.register({ name: 'search', component } as any);
      expect(agentToolcallRegistry.register({ name: 'search', component } as any)).toBe(false);
    });

    it('未注册的 key 返回空值', () => {
      expect(agentToolcallRegistry.get('missing')).toBeUndefined();
      expect(agentToolcallRegistry.getRenderFunction('missing')).toBeNull();
      expect(agentToolcallRegistry.has('missing')).toBe(false);
    });

    it('unregister / clear 生效', () => {
      agentToolcallRegistry.register({ name: 'search', component: TestComponent } as any);
      agentToolcallRegistry.unregister('search');
      expect(agentToolcallRegistry.has('search')).toBe(false);

      agentToolcallRegistry.register({ name: 'a', component: TestComponent } as any);
      agentToolcallRegistry.clear();
      expect(agentToolcallRegistry.getRegisteredKeys()).toEqual([]);
    });

    it('注册时派发注册事件', () => {
      const listener = vi.fn();
      window.addEventListener('toolcall-registered', listener);
      agentToolcallRegistry.register({ name: 'search', component: TestComponent } as any);
      expect(listener).toHaveBeenCalled();
      expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ name: 'search' });
      window.removeEventListener('toolcall-registered', listener);
    });

    it('activityRegistry 按 activityType 注册', () => {
      activityRegistry.register({ activityType: 'json-render', component: TestComponent } as any);
      expect(activityRegistry.has('json-render')).toBe(true);
      expect(activityRegistry.getRegisteredKeys()).toEqual(['json-render']);
    });
  });

  describe('hooks', () => {
    it('useAgentState 返回稳定契约', async () => {
      let api: any;
      const Host = defineComponent({
        setup() {
          api = useAgentState({ initialState: { a: 1 } });
          return () => h('div');
        },
      });
      mountChat(Host);
      await flush();
      expect(Object.keys(api).sort()).toEqual([
        'currentStateKey',
        'getCurrentState',
        'getStateByKey',
        'setStateMap',
        'stateMap',
      ]);
      expect(api.stateMap.value).toEqual({ a: 1 });
      api.setStateMap({ b: 2 });
      expect(api.getCurrentState()).toEqual({ b: 2 });
      expect(api.getStateByKey('b')).toBe(2);
    });

    it('useChat 返回 chatEngine / messages / status', async () => {
      let api: any;
      const Host = defineComponent({
        setup() {
          api = useChat({
            defaultMessages: [{ id: '1', role: 'user', content: [{ type: 'text', data: 'hi' }] }] as any,
            chatServiceConfig: { endpoint: 'https://example.com/chat' } as any,
          });
          return () => h('div');
        },
      });
      mountChat(Host);
      await flush();
      expect(Object.keys(api).sort()).toEqual(['chatEngine', 'messages', 'status']);
      expect(Array.isArray(api.messages.value)).toBe(true);
      expect(api.messages.value).toHaveLength(1);
      expect(['idle', 'pending', 'complete', 'error', 'stop']).toContain(api.status.value);
    });

    it('useChat 在卸载后释放订阅不抛错', async () => {
      const Host = defineComponent({
        setup() {
          useChat({ defaultMessages: [] as any, chatServiceConfig: { endpoint: '' } as any });
          return () => h('div');
        },
      });
      const wrapper = mountChat(Host);
      await flush();
      expect(() => wrapper.unmount()).not.toThrow();
    });
  });

  describe('message utils', () => {
    it('isAIMessage 识别助手消息', () => {
      expect(isAIMessage({ role: 'assistant' } as any)).toBe(true);
      expect(isAIMessage({ role: 'user' } as any)).toBe(false);
    });

    it('isToolCallContent 识别工具调用内容', () => {
      expect(isToolCallContent({ type: 'toolcall' } as any)).toBe(true);
      expect(isToolCallContent({ type: 'toolcall-custom' } as any)).toBe(true);
      expect(isToolCallContent({ type: 'text' } as any)).toBe(false);
    });

    it('getMessageContentForCopy 从消息中提取可复制文本', () => {
      const text = getMessageContentForCopy({
        role: 'assistant',
        content: [{ type: 'text', data: '可复制内容' }],
      } as any);
      expect(String(text)).toContain('可复制内容');
    });

    it('getMessageContentForCopy 对非助手消息返回空串', () => {
      expect(getMessageContentForCopy({ role: 'user', content: [] } as any)).toBe('');
    });
  });
});
