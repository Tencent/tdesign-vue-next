<template>
  <div class="booking-summary">
    <strong>📅 预约信息卡片</strong>
    <dl class="booking-summary__details">
      <dt>会议主题</dt>
      <dd>{{ topic || '（未填写）' }}</dd>
      <dt>参会人数</dt>
      <dd>{{ attendees ?? 0 }} 人</dd>
      <dt>是否录像</dt>
      <dd>{{ recording ? '✓ 开启' : '✗ 关闭' }}</dd>
      <dt>提交时间</dt>
      <dd>{{ submitTime || '—' }}</dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { ActionBinding, UIElement } from '@json-render/core';
import { useDataValue } from '@tdesign-vue-next/chat';

const props = defineProps<{
  element: UIElement;
  children?: unknown;
  onAction?: (action: ActionBinding) => void;
  loading?: boolean;
}>();

const elementProps = (props.element.props || {}) as Record<string, string>;
const topic = useDataValue<string>(elementProps.topicPath);
const attendees = useDataValue<number>(elementProps.attendeesPath);
const recording = useDataValue<boolean>(elementProps.recordingPath);
const submitTime = useDataValue<string>(elementProps.submitTimePath);
</script>

<style scoped>
.booking-summary {
  padding: 16px;
  background: linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%);
  border-left: 4px solid var(--td-brand-color);
  border-radius: 4px;
}

.booking-summary__details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 12px;
  margin-bottom: 0;
}
</style>
