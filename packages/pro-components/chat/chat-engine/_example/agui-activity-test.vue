<template>
  <t-space direction="vertical" style="width: 100%">
    <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px">
      <div style="margin-bottom: 8px; font-size: 14px; font-weight: 500">示例说明：</div>
      <p style="margin: 8px 0; font-size: 14px; color: #666">
        演示 Activity 事件的流式更新：先列出规划步骤，然后逐步打钩完成
      </p>
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
        placeholder="输入规划需求，例如：帮我规划一次北京三日游"
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
 * Activity 示例 - 规划步骤（Plan TodoList）
 *
 * 演示如何使用 Activity 事件展示动态规划步骤，支持：
 * 1. 标准模式：后端先发 ACTIVITY_SNAPSHOT，再发 ACTIVITY_DELTA
 * 2. 纯增量模式：后端只发 ACTIVITY_DELTA，无 SNAPSHOT（前端自动初始化）
 */

// ==================== Activity 组件定义 ====================

/**
 * 规划步骤内容类型
 */
interface PlanStep {
  id: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  description?: string;
}

interface PlanTodoContent {
  title: string;
  description?: string;
  steps: PlanStep[];
  status: 'loading' | 'active' | 'completed';
  currentStep?: number;
}

/**
 * 规划步骤 Activity 组件
 * 展示任务规划的步骤列表，支持实时更新状态
 */
const PlanTodoActivity = (props: ActivityComponentProps<PlanTodoContent>) => {
  const { content } = props;
  const { title, description, steps, status } = content;

  // 计算完成进度
  const completedCount = steps?.filter((s) => s.status === 'completed').length || 0;
  const totalCount = steps?.length || 0;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 获取步骤图标
  const getStepIcon = (stepStatus: PlanStep['status']) => {
    switch (stepStatus) {
      case 'completed':
        return <CheckCircleFilledIcon style={{ color: '#52c41a', fontSize: '18px' }} />;
      case 'running':
        return <TimeFilledIcon style={{ color: '#1890ff', fontSize: '18px' }} />;
      case 'failed':
        return <CloseCircleFilledIcon style={{ color: '#ff4d4f', fontSize: '18px' }} />;
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
  const getStatusTheme = () => {
    if (status === 'completed') return 'success';
    if (status === 'loading') return 'warning';
    return 'primary';
  };

  // 获取状态标签文本
  const getStatusText = () => {
    if (status === 'loading') return '规划中';
    if (status === 'completed') return '已完成';
    return '执行中';
  };

  // 获取步骤文字颜色
  const getStepColor = (stepStatus: PlanStep['status']) => {
    if (stepStatus === 'completed') return '#52c41a';
    if (stepStatus === 'failed') return '#ff4d4f';
    return '#333';
  };

  return (
    <Card bordered style={{ marginTop: '8px', width: '100%' }}>
      <TSpace direction="vertical" style={{ width: '100%' }}>
        {/* 标题和状态 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>{title}</span>
          <Tag theme={getStatusTheme()}>{getStatusText()}</Tag>
        </div>

        {/* 描述 */}
        {description && <div style={{ fontSize: '13px', color: '#666' }}>{description}</div>}

        {/* 进度条 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '6px', background: '#f0f0f0', borderRadius: '3px' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: status === 'completed' ? '#52c41a' : '#1890ff',
                borderRadius: '3px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '12px', color: '#666', minWidth: '60px' }}>
            {completedCount}/{totalCount} 完成
          </span>
        </div>

        {/* 步骤列表 */}
        <div style={{ marginTop: '8px' }}>
          {steps?.map((step, index) => (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '8px 0',
                borderBottom: index < steps.length - 1 ? '1px solid #f0f0f0' : 'none',
                opacity: step.status === 'pending' ? 0.6 : 1,
              }}
            >
              <div style={{ marginRight: '12px', marginTop: '2px' }}>{getStepIcon(step.status)}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: step.status === 'running' ? 600 : 400,
                    color: getStepColor(step.status),
                    textDecoration: step.status === 'completed' ? 'line-through' : 'none',
                  }}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{step.description}</div>
                )}
              </div>
              {step.status === 'running' && (
                <Tag size="small" theme="primary" variant="light">
                  进行中
                </Tag>
              )}
            </div>
          ))}
        </div>
      </TSpace>
    </Card>
  );
};

// ==================== 主组件逻辑 ====================

const listRef = ref();
const inputRef = ref();
const inputValue = ref('帮我规划一次北京三日游');

// 注册 Activity 组件
useAgentActivity([
  {
    activityType: 'plan-todo',
    component: PlanTodoActivity,
    description: '规划步骤展示',
  },
]);

// 聊天配置 - 根据模式切换 endpoint
const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  chatServiceConfig: {
    endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agui-activity-test',
    protocol: 'agui',
    stream: true,
    onRequest: (params) => ({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: params.prompt,
        mode: 'standard',
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
