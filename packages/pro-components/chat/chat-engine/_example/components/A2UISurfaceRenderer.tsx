import { defineComponent, h, type PropType } from 'vue';
import { Button, Card, Divider, Input } from 'tdesign-vue-next';
import { normalizeActionBinding, resolveActionParams, type JsonRenderSchema } from '@tdesign-vue-next/chat';

type JsonRenderElement = {
  type: string;
  props?: Record<string, any>;
  children?: string[];
};

const getValueByPointer = (data: Record<string, any>, pointer?: string) => {
  if (!pointer || pointer === '/') return data;
  return pointer
    .split('/')
    .slice(1)
    .reduce((value, key) => value?.[key.replace(/~1/g, '/').replace(/~0/g, '~')], data);
};

export default defineComponent({
  name: 'A2UISurfaceRenderer',
  props: {
    schema: {
      type: Object as PropType<JsonRenderSchema>,
      required: true,
    },
  },
  emits: {
    dataChange: (_payload: { path: string; value: unknown }) => true,
    action: (_payload: { name: string; kind: string; params: Record<string, unknown> }) => true,
  },
  setup(props, { emit }) {
    const renderElement = (elementId: string): ReturnType<typeof h> | null => {
      const element = props.schema.elements[elementId] as JsonRenderElement | undefined;
      if (!element) return null;

      const elementProps = element.props || {};
      const children = (element.children || []).map(renderElement);

      switch (element.type) {
        case 'Column':
          return <div style="display: flex; flex-direction: column; gap: 12px">{children}</div>;
        case 'Row':
          return <div style="display: flex; align-items: center; gap: 12px">{children}</div>;
        case 'Card':
          return <Card bordered>{children}</Card>;
        case 'Text':
          return <div>{elementProps.content}</div>;
        case 'TextField': {
          const path = elementProps.valuePath as string | undefined;
          return (
            <label style="display: flex; flex-direction: column; gap: 6px">
              <span style="font-size: 13px; color: var(--td-text-color-secondary)">{elementProps.label}</span>
              <Input
                value={String(getValueByPointer(props.schema.data || {}, path) || '')}
                placeholder={elementProps.placeholder}
                onChange={(value) => path && emit('dataChange', { path, value })}
              />
            </label>
          );
        }
        case 'Button':
          return (
            <Button
              theme="primary"
              onClick={() => {
                const binding = normalizeActionBinding(elementProps.action);
                if (!binding) return;
                emit('action', {
                  name: binding.action,
                  kind: binding.kind,
                  params: resolveActionParams(binding.params || {}, props.schema.data || {}),
                });
              }}
            >
              {children}
            </Button>
          );
        case 'Divider':
          return <Divider />;
        default:
          return (
            <div style="padding: 8px; border: 1px dashed var(--td-component-border); border-radius: 4px">
              未注册组件：{element.type}
            </div>
          );
      }
    };

    return () => renderElement(props.schema.root);
  },
});
