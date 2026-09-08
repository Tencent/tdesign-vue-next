/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, h, type Component, type PropType } from 'vue';
import { Button, Card, Col, Divider, Input, Row, Slider, Space, Switch } from 'tdesign-vue-next';
import { normalizeActionBinding, resolveActionParams } from '@tdesign/web-components-chat/chat-engine';
import type { ActionBinding, UIElement } from '@json-render/core';
import { useDataBinding, useDataStore, useDataValue } from './context';
import type { ComponentRegistry, ComponentRenderer } from './types';

const rendererProps = {
  element: {
    type: Object as PropType<UIElement>,
    required: true,
  },
  children: {
    type: null as unknown as PropType<any>,
    default: undefined as any,
  },
  onAction: {
    type: Function as PropType<(action: ActionBinding) => void>,
    default: undefined as any,
  },
  loading: Boolean,
} as const;

export const JsonRenderText = defineComponent({
  name: 'JsonRenderText',
  props: rendererProps,
  setup(props) {
    const elementProps = computed(() => (props.element.props || {}) as Record<string, any>);
    const contentPath = computed(() => elementProps.value.contentPath as string | undefined);
    const boundValue = useDataValue(contentPath.value);
    return () => {
      const { content, contentPath: _contentPath, style, className, ...rest } = elementProps.value;
      const text = contentPath.value ? boundValue.value : content ?? props.children;
      return (
        <span style={style} class={className} {...rest}>
          {text == null ? '' : String(text)}
        </span>
      );
    };
  },
});

export const JsonRenderCard = defineComponent({
  name: 'JsonRenderCard',
  props: rendererProps,
  setup: (props) => () => {
    const { children: _children, ...cardProps } = (props.element.props || {}) as Record<string, any>;
    return <Card {...cardProps}>{props.children}</Card>;
  },
});

const createLayoutRenderer = (name: string, component: Component, defaults: Record<string, any> = {}) =>
  defineComponent({
    name,
    props: rendererProps,
    setup: (props) => () =>
      h(component, { ...defaults, ...(props.element.props || {}) }, { default: () => props.children }),
  });

export const JsonRenderRow = createLayoutRenderer('JsonRenderRow', Row);
export const JsonRenderCol = createLayoutRenderer('JsonRenderCol', Col);
export const JsonRenderSpace = createLayoutRenderer('JsonRenderSpace', Space);
export const JsonRenderColumn = createLayoutRenderer('JsonRenderColumn', Space, {
  direction: 'vertical',
  align: 'stretch',
  style: { width: '100%' },
});
export const JsonRenderDivider = createLayoutRenderer('JsonRenderDivider', Divider);

export const JsonRenderInput = defineComponent({
  name: 'JsonRenderInput',
  props: rendererProps,
  setup: (props) => () => <Input {...((props.element.props || {}) as Record<string, any>)} />,
});

const createTextField = (a2ui = false) =>
  defineComponent({
    name: a2ui ? 'A2UITextField' : 'JsonRenderTextField',
    props: rendererProps,
    setup(props) {
      const elementProps = computed(() => (props.element.props || {}) as Record<string, any>);
      const valuePath = computed(() => elementProps.value.valuePath as string | undefined);
      const disabledPath = computed(() => elementProps.value.disabledPath as string | undefined);
      const [value, setValue] = useDataBinding<any>(valuePath.value);
      const disabledValue = useDataValue(disabledPath.value);

      return () => {
        const { label, valuePath: _valuePath, disabledPath: _disabledPath, ...inputProps } = elementProps.value;
        const input = (
          <Input
            {...inputProps}
            value={value.value ?? ''}
            disabled={disabledPath.value ? Boolean(disabledValue.value) : inputProps.disabled}
            onChange={setValue}
          />
        );
        return label ? (
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <label style={{ fontSize: '14px', fontWeight: 500 }}>{label}</label>
            {input}
          </Space>
        ) : (
          input
        );
      };
    },
  });

export const JsonRenderTextField = createTextField();
export const A2UITextField = createTextField(true);

const createButton = (a2ui = false) =>
  defineComponent({
    name: a2ui ? 'A2UIButton' : 'JsonRenderButton',
    props: rendererProps,
    setup(props) {
      const store = useDataStore();
      return () => {
        const {
          label,
          action,
          children: _children,
          onClick,
          ...buttonProps
        } = (props.element.props || {}) as Record<string, any>;
        return (
          <Button
            {...buttonProps}
            loading={buttonProps.loading || props.loading}
            onClick={(event) => {
              onClick?.(event);
              if (!action || !props.onAction) return;
              const normalized = normalizeActionBinding(action);
              if (!normalized) return;
              props.onAction({
                ...normalized,
                params:
                  a2ui && normalized.params
                    ? resolveActionParams(normalized.params, store.getData())
                    : normalized.params || {},
              } as ActionBinding);
            }}
          >
            {label || props.children}
          </Button>
        );
      };
    },
  });

export const JsonRenderButton = createButton();
export const A2UIButton = createButton(true);

const createBoundControl = (name: string, component: Component) =>
  defineComponent({
    name,
    props: rendererProps,
    setup(props) {
      const elementProps = computed(() => (props.element.props || {}) as Record<string, any>);
      const valuePath = computed(() => elementProps.value.valuePath as string | undefined);
      const disabledPath = computed(() => elementProps.value.disabledPath as string | undefined);
      const [value, setValue] = useDataBinding<any>(valuePath.value);
      const disabled = useDataValue(disabledPath.value);
      return () => {
        const { label, valuePath: _valuePath, disabledPath: _disabledPath, ...controlProps } = elementProps.value;
        const control = h(component, {
          ...controlProps,
          value: value.value,
          disabled: disabledPath.value ? Boolean(disabled.value) : controlProps.disabled,
          onChange: setValue,
        });
        return label ? (
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <label style={{ fontSize: '14px', fontWeight: 500 }}>{label}</label>
            {control}
          </Space>
        ) : (
          control
        );
      };
    },
  });

export const A2UISlider = createBoundControl('A2UISlider', Slider);
export const A2UISwitch = createBoundControl('A2UISwitch', Switch);

export const tdesignRegistry: ComponentRegistry = {
  Button: JsonRenderButton,
  Input: JsonRenderInput,
  TextField: JsonRenderTextField,
  Card: JsonRenderCard,
  Text: JsonRenderText,
  Row: JsonRenderRow,
  Col: JsonRenderCol,
  Space: JsonRenderSpace,
  Column: JsonRenderColumn,
  Divider: JsonRenderDivider,
};

Object.entries({ ...tdesignRegistry }).forEach(([name, component]) => {
  tdesignRegistry[name.toLowerCase()] = component;
});

export const a2uiRegistry: ComponentRegistry = {
  ...tdesignRegistry,
  TextField: A2UITextField,
  Button: A2UIButton,
  Slider: A2UISlider,
  Switch: A2UISwitch,
};

export interface CreateCustomRegistryOptions {
  enableStableProps?: boolean;
}

// Vue 会按响应式依赖精确更新组件；保留该 API 以与 React Chat 的 Registry 接口对齐。
export const withStableProps = <T extends ComponentRenderer>(component: T): T => component;

export const createCustomRegistry = (
  customComponents: ComponentRegistry,
  options: CreateCustomRegistryOptions = {},
): ComponentRegistry => ({
  ...tdesignRegistry,
  ...Object.fromEntries(
    Object.entries(customComponents).map(([name, component]) => [
      name,
      options.enableStableProps ? withStableProps(component) : component,
    ]),
  ),
});

export const createA2UIRegistry = (customComponents: ComponentRegistry): ComponentRegistry => ({
  ...a2uiRegistry,
  ...customComponents,
});

export interface A2UIBindingConfig {
  valueField?: string;
  onChangeField?: string;
  supportsAction?: boolean;
  actionTrigger?: string;
}

export const withA2UIBinding = (WrappedComponent: Component, config: A2UIBindingConfig = {}): ComponentRenderer => {
  const {
    valueField = 'value',
    onChangeField = 'onChange',
    supportsAction = false,
    actionTrigger = 'onClick',
  } = config;

  return defineComponent({
    name: 'A2UIBoundComponent',
    props: rendererProps,
    setup(props) {
      const store = useDataStore();
      const elementProps = computed(() => (props.element.props || {}) as Record<string, any>);
      const valuePath = computed(() => elementProps.value.valuePath as string | undefined);
      const disabledPath = computed(() => elementProps.value.disabledPath as string | undefined);
      const [value, setValue] = useDataBinding<any>(valuePath.value);
      const disabled = useDataValue(disabledPath.value);

      return () => {
        const { valuePath: _valuePath, disabledPath: _disabledPath, action, ...componentProps } = elementProps.value;
        const finalProps: Record<string, any> = {
          ...componentProps,
          disabled: disabledPath.value ? Boolean(disabled.value) : componentProps.disabled,
        };
        if (valuePath.value) {
          finalProps[valueField] = value.value;
          finalProps[onChangeField] = setValue;
        }
        if (supportsAction && action) {
          finalProps[actionTrigger] = (...args: any[]) => {
            componentProps[actionTrigger]?.(...args);
            const normalized = normalizeActionBinding(action);
            if (normalized && props.onAction) {
              props.onAction({
                ...normalized,
                params: normalized.params ? resolveActionParams(normalized.params, store.getData()) : {},
              } as ActionBinding);
            }
          };
        }
        return h(WrappedComponent, finalProps, { default: () => props.children });
      };
    },
  }) as ComponentRenderer;
};
