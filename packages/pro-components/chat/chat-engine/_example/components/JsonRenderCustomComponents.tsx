/* eslint-disable vue/one-component-per-file */
import { defineComponent, type PropType } from 'vue';
import { Card, Progress, Tag } from 'tdesign-vue-next';
import type { UIElement } from '@json-render/core';
import { useDataValue } from '@tdesign-vue-next/chat';

const componentProps = {
  element: { type: Object as PropType<UIElement>, required: true },
  children: { type: null as unknown as PropType<any>, default: undefined as any },
} as const;

export const StatusCard = defineComponent({
  name: 'JsonRenderStatusCard',
  props: componentProps,
  setup: (props) => () => {
    const { title, status = 'info', description } = (props.element.props || {}) as Record<string, any>;
    const themeMap = {
      success: 'success',
      warning: 'warning',
      error: 'danger',
      info: 'primary',
    } as const;
    return (
      <Card bordered>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
          <strong>{title}</strong>
          <Tag theme={themeMap[status as keyof typeof themeMap] || 'default'}>{status}</Tag>
        </div>
        {description ? <p style="margin: 8px 0 0; color: var(--td-text-color-secondary)">{description}</p> : null}
      </Card>
    );
  },
});

export const ProgressBar = defineComponent({
  name: 'JsonRenderProgressBar',
  props: componentProps,
  setup: (props) => () => {
    const { label, percentage = 0, showInfo = true } = (props.element.props || {}) as Record<string, any>;
    return (
      <div>
        {label ? <div style="margin-bottom: 8px">{label}</div> : null}
        <Progress percentage={percentage} label={showInfo} />
      </div>
    );
  },
});

export const NestedPanel = defineComponent({
  name: 'JsonRenderNestedPanel',
  props: componentProps,
  setup: (props) => () => {
    const {
      title,
      level = 1,
      borderColor = 'var(--td-component-border)',
      backgroundColor = 'var(--td-bg-color-container)',
    } = (props.element.props || {}) as Record<string, any>;
    return (
      <section
        style={{
          padding: '12px',
          border: `1px solid ${borderColor}`,
          borderRadius: '6px',
          backgroundColor,
        }}
      >
        <strong>
          {title} <small style="color: var(--td-text-color-placeholder)">L{level}</small>
        </strong>
        <div style="margin-top: 10px">{props.children}</div>
      </section>
    );
  },
});

export const BookingSummary = defineComponent({
  name: 'A2UIBookingSummary',
  props: componentProps,
  setup(props) {
    const elementProps = (props.element.props || {}) as Record<string, string>;
    const topic = useDataValue<string>(elementProps.topicPath);
    const attendees = useDataValue<number>(elementProps.attendeesPath);
    const recording = useDataValue<boolean>(elementProps.recordingPath);
    const submitTime = useDataValue<string>(elementProps.submitTimePath);

    return () => (
      <div
        style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #f6ffed 0%, #e6f7ff 100%)',
          borderLeft: '4px solid var(--td-brand-color)',
          borderRadius: '4px',
        }}
      >
        <strong>📅 预约信息卡片</strong>
        <dl style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; margin-bottom: 0">
          <dt>会议主题</dt>
          <dd>{topic.value || '（未填写）'}</dd>
          <dt>参会人数</dt>
          <dd>{attendees.value ?? 0} 人</dd>
          <dt>是否录像</dt>
          <dd>{recording.value ? '✓ 开启' : '✗ 关闭'}</dd>
          <dt>提交时间</dt>
          <dd>{submitTime.value || '—'}</dd>
        </dl>
      </div>
    );
  },
});
