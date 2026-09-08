/* eslint-disable vue/one-component-per-file */
import { defineComponent, type PropType } from 'vue';
import type { ActionBinding, UIElement } from '@json-render/core';
import { useDataValue } from '../../components/json-render';

const componentProps = {
  element: { type: Object as PropType<UIElement>, required: true },
  children: { type: null as unknown as PropType<any>, default: undefined as any },
  onAction: {
    type: Function as PropType<(action: ActionBinding) => void>,
    default: undefined as any,
  },
  loading: Boolean,
} as const;

export const StatusCard = defineComponent({
  name: 'JsonRenderStatusCard',
  props: componentProps,
  setup: (props) => () => {
    const { title, status = 'info', description, icon } = (props.element.props || {}) as Record<string, any>;
    const colors = {
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
      info: '#1890ff',
    };
    const icons = { success: '✓', warning: '⚠', error: '✗', info: 'ℹ' };
    const color = colors[status as keyof typeof colors] || colors.info;
    return (
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          padding: '16px',
          border: `2px solid ${color}`,
          borderRadius: '8px',
          backgroundColor: `${color}10`,
        }}
      >
        <div style={{ fontSize: '24px', color }}>{icon || icons[status as keyof typeof icons]}</div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              marginBottom: description ? '4px' : 0,
              fontSize: '16px',
              fontWeight: 600,
              color,
            }}
          >
            {title}
          </div>
          {description ? (
            <div style={{ fontSize: '14px', color: 'var(--td-text-color-secondary)' }}>{description}</div>
          ) : null}
        </div>
      </div>
    );
  },
});

export const ProgressBar = defineComponent({
  name: 'JsonRenderProgressBar',
  props: componentProps,
  setup: (props) => () => {
    const { label, percentage = 0, showInfo = true } = (props.element.props || {}) as Record<string, any>;
    const color = percentage < 30 ? '#f5222d' : percentage < 70 ? '#faad14' : '#52c41a';
    return (
      <div style={{ width: '100%' }}>
        {label ? <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>{label}</div> : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              flex: 1,
              height: '20px',
              overflow: 'hidden',
              backgroundColor: 'var(--td-bg-color-component)',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: '100%',
                backgroundColor: color,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          {showInfo ? (
            <span style={{ minWidth: '45px', fontSize: '14px', fontWeight: 600, color }}>{percentage}%</span>
          ) : null}
        </div>
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
      collapsed = false,
      borderColor = '#e0e0e0',
      backgroundColor = '#fafafa',
    } = (props.element.props || {}) as Record<string, any>;
    const levelColors = [
      { border: '#1890ff', bg: '#e6f7ff' },
      { border: '#52c41a', bg: '#f6ffed' },
      { border: '#faad14', bg: '#fffbe6' },
      { border: '#f5222d', bg: '#fff2f0' },
    ];
    const colorScheme = levelColors[(level - 1) % levelColors.length];
    const panelBorder = borderColor || colorScheme.border;
    const panelBackground = backgroundColor || colorScheme.bg;
    return (
      <div
        style={{
          marginTop: '8px',
          marginBottom: '8px',
          marginLeft: `${(level - 1) * 16}px`,
          overflow: 'hidden',
          backgroundColor: panelBackground,
          border: `2px solid ${panelBorder}`,
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            padding: '8px 12px',
            fontSize: `${Math.max(16 - level * 2, 12)}px`,
            fontWeight: 600,
            color: '#fff',
            backgroundColor: panelBorder,
          }}
        >
          <span style={{ opacity: 0.8 }}>L{level}</span>
          <span>{title}</span>
          {collapsed ? <span style={{ fontSize: '12px', opacity: 0.7 }}>(已折叠)</span> : null}
        </div>
        {!collapsed ? <div style={{ padding: '12px' }}>{props.children}</div> : null}
      </div>
    );
  },
});

export const JsonRenderDiv = defineComponent({
  name: 'JsonRenderDiv',
  props: componentProps,
  setup: (props) => () => {
    const { children, ...elementProps } = (props.element.props || {}) as Record<string, any>;
    return <div {...elementProps}>{children || props.children}</div>;
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
