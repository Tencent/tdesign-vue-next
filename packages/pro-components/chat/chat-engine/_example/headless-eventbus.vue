<template>
  <div style="padding: 16px">
    <t-card title="Headless 事件总线示例" bordered>
      <t-space direction="vertical" style="width: 100%">
        <!-- 状态展示 -->
        <div style="display: flex; gap: 16px; align-items: center">
          <span>
            引擎状态:
            <t-tag :theme="initialized ? 'success' : 'default'" style="margin-left: 8px">
              {{ initialized ? '已初始化' : '未初始化' }}
            </t-tag>
          </span>
          <span>
            当前状态:
            <t-tag theme="primary" style="margin-left: 8px">
              {{ currentStatus }}
            </t-tag>
          </span>
          <span>
            消息数量:
            <t-tag theme="warning" style="margin-left: 8px">
              {{ messageCount }}
            </t-tag>
          </span>
        </div>

        <t-divider />

        <!-- 操作按钮 -->
        <t-space>
          <t-button :disabled="initialized" @click="initEngine">初始化引擎</t-button>
          <t-button :disabled="!initialized" theme="primary" @click="sendMessage">发送消息</t-button>
          <t-button :disabled="!initialized" theme="warning" @click="abortRequest">中止请求</t-button>
          <t-button :disabled="!initialized" @click="clearMessages">清空消息</t-button>
          <t-button :disabled="!initialized" theme="danger" @click="destroyEngine">销毁引擎</t-button>
        </t-space>

        <t-space>
          <t-button :disabled="!initialized" variant="outline" @click="waitForComplete">等待完成事件</t-button>
          <t-button :disabled="!initialized" variant="outline" @click="emitCustomEvent">发布自定义事件</t-button>
          <t-button :disabled="!initialized" variant="outline" @click="showHistory">查看事件历史</t-button>
        </t-space>

        <t-divider />

        <!-- 事件日志 -->
        <div>
          <h4>事件日志（最新20条）</h4>
          <t-list style="max-height: 400px; overflow: auto; background: #f5f5f5; border-radius: 4px" size="small" split>
            <t-list-item v-if="eventLogs.length === 0" style="color: #999"> 暂无事件日志，请先初始化引擎 </t-list-item>
            <t-list-item v-for="(log, index) in eventLogs" :key="index">
              <div style="font-family: monospace; font-size: 12px">
                <t-tag size="small" theme="primary" style="margin-right: 8px">{{ log.time }}</t-tag>
                <t-tag size="small" style="margin-right: 8px">{{ log.event }}</t-tag>
                <span style="color: #666">{{ log.data }}</span>
              </div>
            </t-list-item>
          </t-list>
        </div>
      </t-space>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import ChatEngine, {
  ChatEngineEventType,
  type SSEChunkData,
  type AIMessageContent,
} from 'tdesign-web-components/lib/chat-engine';

/**
 * Headless 事件总线示例
 *
 * 学习目标：
 * - 了解如何在无 UI 场景下使用 ChatEngine 事件总线
 * - 掌握事件订阅、发布、等待的用法
 * - 理解如何将事件分发到外部系统或自定义 UI
 */

// 事件日志
const eventLogs = ref<Array<{ event: string; time: string; data: string }>>([]);
// 消息计数
const messageCount = ref(0);
// 当前状态
const currentStatus = ref<string>('idle');
// 引擎实例
let engine: ChatEngine | null = null;
// 是否已初始化
const initialized = ref(false);

// 添加事件日志
const addLog = (event: string, data: unknown) => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value = [
    { event, time, data: JSON.stringify(data, null, 2).slice(0, 200) },
    ...eventLogs.value.slice(0, 19), // 最多保留20条
  ];
};

// 初始化引擎
const initEngine = () => {
  if (engine) {
    engine.destroy();
  }

  // 创建引擎实例，启用调试模式和历史记录
  engine = new ChatEngine({
    debug: true,
    historySize: 50,
  });

  // 初始化配置
  engine.init({
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
    stream: true,
    onMessage: (chunk: SSEChunkData): AIMessageContent => ({
      type: 'markdown',
      data: chunk.data?.msg || '',
    }),
  });

  // 订阅生命周期事件
  engine.eventBus.on(ChatEngineEventType.ENGINE_INIT, (payload) => {
    addLog('ENGINE_INIT', payload);
    currentStatus.value = 'ready';
  });

  engine.eventBus.on(ChatEngineEventType.ENGINE_DESTROY, (payload) => {
    addLog('ENGINE_DESTROY', payload);
    currentStatus.value = 'destroyed';
  });

  // 订阅消息事件
  engine.eventBus.on(ChatEngineEventType.MESSAGE_CREATE, (payload) => {
    addLog('MESSAGE_CREATE', { messageId: payload.message.id, role: payload.message.role });
    messageCount.value += 1;
  });

  engine.eventBus.on(ChatEngineEventType.MESSAGE_UPDATE, (payload) => {
    addLog('MESSAGE_UPDATE', { messageId: payload.messageId });
  });

  engine.eventBus.on(ChatEngineEventType.MESSAGE_STATUS_CHANGE, (payload) => {
    addLog('MESSAGE_STATUS_CHANGE', payload);
    currentStatus.value = payload.status;
  });

  engine.eventBus.on(ChatEngineEventType.MESSAGE_CLEAR, (payload) => {
    addLog('MESSAGE_CLEAR', payload);
    messageCount.value = 0;
  });

  // 订阅请求事件
  engine.eventBus.on(ChatEngineEventType.REQUEST_START, (payload) => {
    addLog('REQUEST_START', { messageId: payload.messageId });
  });

  engine.eventBus.on(ChatEngineEventType.REQUEST_STREAM, (payload) => {
    // 流式数据事件会非常频繁，这里只记录部分
    if (Math.random() < 0.1) {
      addLog('REQUEST_STREAM (sampled)', { messageId: payload.messageId });
    }
  });

  engine.eventBus.on(ChatEngineEventType.REQUEST_COMPLETE, (payload) => {
    addLog('REQUEST_COMPLETE', { messageId: payload.messageId });
    MessagePlugin.success('请求完成');
  });

  engine.eventBus.on(ChatEngineEventType.REQUEST_ERROR, (payload) => {
    addLog('REQUEST_ERROR', { messageId: payload.messageId, error: String(payload.error) });
    MessagePlugin.error('请求出错');
  });

  engine.eventBus.on(ChatEngineEventType.REQUEST_ABORT, (payload) => {
    addLog('REQUEST_ABORT', { messageId: payload.messageId });
    MessagePlugin.warning('请求已中止');
  });

  initialized.value = true;

  // 手动触发初始化事件日志
  addLog('ENGINE_INIT', { timestamp: Date.now() });
};

// 发送消息
const sendMessage = async () => {
  if (!engine) {
    MessagePlugin.warning('请先初始化引擎');
    return;
  }
  await engine.sendUserMessage({ prompt: '你好，请介绍一下自己' });
};

// 中止请求
const abortRequest = () => {
  if (!engine) return;
  engine.abortChat();
};

// 清空消息
const clearMessages = () => {
  if (!engine) return;
  engine.clearMessages();
};

// 销毁引擎
const destroyEngine = () => {
  if (!engine) return;
  engine.destroy();
  engine = null;
  initialized.value = false;
  currentStatus.value = 'idle';
};

// 等待特定事件（演示 waitFor 用法）
const waitForComplete = async () => {
  if (!engine) {
    MessagePlugin.warning('请先初始化引擎');
    return;
  }

  MessagePlugin.info('等待请求完成事件...');

  try {
    const result = await engine.eventBus.waitFor(ChatEngineEventType.REQUEST_COMPLETE, 60000);
    MessagePlugin.success(`收到完成事件，消息ID: ${result.messageId}`);
  } catch {
    MessagePlugin.error('等待超时');
  }
};

// 发布自定义事件
const emitCustomEvent = () => {
  if (!engine) {
    MessagePlugin.warning('请先初始化引擎');
    return;
  }

  engine.eventBus.emitCustom('user:action', {
    action: 'button_click',
    timestamp: Date.now(),
  });

  addLog('CUSTOM:user:action', { action: 'button_click' });
  MessagePlugin.success('自定义事件已发布');
};

// 获取事件历史
const showHistory = () => {
  if (!engine) {
    MessagePlugin.warning('请先初始化引擎');
    return;
  }

  const history = engine.eventBus.getHistory();
  console.log('事件历史:', history);
  MessagePlugin.info(`共 ${history.length} 条历史记录，请查看控制台`);
};

// 组件卸载时清理
onBeforeUnmount(() => {
  if (engine) {
    engine.destroy();
  }
});
</script>
