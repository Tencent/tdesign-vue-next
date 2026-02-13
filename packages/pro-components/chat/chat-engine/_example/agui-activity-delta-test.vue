<template>
  <t-space direction="vertical" style="width: 100%">
    <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px">
      <div style="margin-bottom: 8px; font-size: 14px; font-weight: 500">纯增量模式验证：</div>
      <p style="margin: 8px 0; font-size: 14px; color: #666">
        验证没有 ACTIVITY_SNAPSHOT，只有 ACTIVITY_DELTA 的情况下，event-mapper 是否能正确处理
      </p>
      <p style="margin: 8px 0; font-size: 14px; color: #666">基于 text.txt 中的真实数据，包含节点生命周期和中断事件</p>
    </div>
    <div style="display: flex; flex-direction: column; height: 500px">
      <t-chat-list ref="listRef">
        <t-chat-message
          v-for="message in messages"
          :key="message.id"
          v-bind="messageProps[message.role]"
          :message="message"
        >
          <template v-if="Array.isArray(message.content)">
            <template v-for="(item, index) in message.content" :key="`content-${index}`">
              <ActivityRenderer v-if="isActivityContent(item)" :activity="item.data" />
            </template>
          </template>
        </t-chat-message>
      </t-chat-list>
      <t-chat-sender
        ref="inputRef"
        v-model="inputValue"
        placeholder="输入任意内容开始测试纯增量模式"
        :loading="senderLoading"
        @send="sendHandler"
        @stop="chatEngine.abortChat()"
      />
    </div>
  </t-space>
</template>

<script setup lang="tsx">
import { ref, computed } from 'vue';
import { Space as TSpace, Card, Tag } from 'tdesign-vue-next';
import { CheckCircleFilledIcon, TimeFilledIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { useChat, useAgentActivity, isActivityContent, ActivityRenderer } from '../index';
import type { ActivityComponentProps } from '../components/activity/types';

/**
 * Activity 纯增量模式验证示例
 *
 * 验证没有 ACTIVITY_SNAPSHOT，只有 ACTIVITY_DELTA 的情况下的处理逻辑
 * 基于 text.txt 中的真实数据进行测试
 */

// ==================== Activity 组件定义 ====================

/**
 * 节点生命周期内容类型
 */
interface NodeLifecycleNode {
  nodeId: string;
  phase: 'start' | 'complete';
}

interface NodeInterrupt {
  nodeId: string;
  key: string;
  prompt: string;
  checkpointId: string;
  lineageId: string;
}

interface NodeLifecycleContent {
  node?: NodeLifecycleNode;
  interrupt?: NodeInterrupt;
}

/**
 * 节点生命周期 Activity 组件
 * 展示节点的执行状态和中断信息
 */
const NodeLifecycleActivity = (props: ActivityComponentProps<NodeLifecycleContent>) => {
  const { content } = props;
  const { node, interrupt } = content;

  // 获取节点状态图标
  const getNodeIcon = (phase: string) => {
    switch (phase) {
      case 'complete':
        return <CheckCircleFilledIcon style={{ color: '#52c41a', fontSize: '18px' }} />;
      case 'start':
        return <TimeFilledIcon style={{ color: '#1890ff', fontSize: '18px' }} />;
      default:
        return (
          <span
            style={{
              display: 'inline-block',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              border: '2px solid #d9d9d9',
              background: '#fff',
            }}
          />
        );
    }
  };

  // 获取状态标签主题
  const getStatusTheme = (phase: string) => {
    if (phase === 'complete') return 'success';
    if (phase === 'start') return 'primary';
    return 'default';
  };

  // 获取状态文本
  const getStatusText = (phase: string) => {
    if (phase === 'complete') return '已完成';
    if (phase === 'start') return '执行中';
    return '未知';
  };

  return (
    <Card bordered style={{ marginTop: '8px', width: '100%' }}>
      <TSpace direction="vertical" style={{ width: '100%' }}>
        {/* 标题 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>节点生命周期</span>
          <Tag theme="primary" variant="light">
            纯增量模式
          </Tag>
        </div>

        {/* 节点信息 */}
        {node && (
          <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              {getNodeIcon(node.phase)}
              <span style={{ fontSize: '14px', fontWeight: 500 }}>节点: {node.nodeId}</span>
              <Tag size="small" theme={getStatusTheme(node.phase)}>
                {getStatusText(node.phase)}
              </Tag>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>阶段: {node.phase}</div>
          </div>
        )}

        {/* 中断信息 */}
        {interrupt && (
          <div style={{ padding: '12px', background: '#fff2e8', borderRadius: '6px', border: '1px solid #ffbb96' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <CloseCircleFilledIcon style={{ color: '#fa8c16', fontSize: '18px' }} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>节点中断: {interrupt.nodeId}</span>
              <Tag size="small" theme="warning">
                需要确认
              </Tag>
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>键: {interrupt.key}</div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              检查点ID: {interrupt.checkpointId}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>提示: {interrupt.prompt}</div>
          </div>
        )}

        {/* 调试信息 */}
        <details style={{ fontSize: '12px', color: '#999' }}>
          <summary style={{ cursor: 'pointer', userSelect: 'none' }}>调试信息</summary>
          <pre
            style={{ marginTop: '8px', padding: '8px', background: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}
          >
            {JSON.stringify(content, null, 2)}
          </pre>
        </details>
      </TSpace>
    </Card>
  );
};

// ==================== 主组件逻辑 ====================

const listRef = ref();
const inputRef = ref();
const inputValue = ref('测试纯增量模式');

// 注册 Activity 组件
useAgentActivity([
  {
    activityType: 'graph.node.lifecycle',
    component: NodeLifecycleActivity,
    description: '节点生命周期展示',
  },
  {
    activityType: 'graph.node.interrupt',
    component: NodeLifecycleActivity,
    description: '节点中断展示',
  },
]);

// 聊天配置 - 使用新的 endpoint
const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agui-activity-delta-test',
    protocol: 'agui',
    stream: true,
    onRequest: (params) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: params.prompt,
      }),
    }),
  },
});

const senderLoading = computed(() => status.value === 'pending' || status.value === 'streaming');

// 消息配置
const messageProps = {
  user: {
    variant: 'base' as const,
    placement: 'right' as const,
  },
  assistant: {
    placement: 'left' as const,
  },
};

const sendHandler = async (e: any) => {
  const { value } = e.detail;
  await chatEngine.sendUserMessage({ prompt: value });
  inputValue.value = '';
};
</script>
