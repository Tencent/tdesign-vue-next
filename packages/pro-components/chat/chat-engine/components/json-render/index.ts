import { h } from 'vue';
import { A2UIJsonRenderActivityRenderer } from './a2ui';
import { JsonRenderActivityRenderer } from './renderer';
import { a2uiRegistry, tdesignRegistry } from './registry';
import type { ActivityConfig, ActivityComponentProps } from '../activity/types';
import type { ActionHandlers, ComponentRegistry, JsonRenderActivityProps } from './types';

export interface JsonRenderActivityConfigOptions {
  activityType?: string;
  registry?: ComponentRegistry;
  actionHandlers?: ActionHandlers;
  debug?: boolean;
  description?: string;
}

export const createJsonRenderActivityConfig = (
  options: JsonRenderActivityConfigOptions = {},
): ActivityConfig<JsonRenderActivityProps['content']> => {
  const {
    activityType = 'json-render',
    registry = tdesignRegistry,
    actionHandlers = {},
    debug = false,
    description = 'json-render 动态 UI 渲染器',
  } = options;

  return {
    activityType,
    component: (props: ActivityComponentProps<JsonRenderActivityProps['content']>) =>
      h(JsonRenderActivityRenderer, {
        ...props,
        registry,
        actionHandlers,
        debug,
      }),
    description,
  };
};

export const createA2UIJsonRenderActivityConfig = (
  options: JsonRenderActivityConfigOptions = {},
): ActivityConfig<any> => {
  const {
    activityType = 'a2ui-json-render',
    registry = a2uiRegistry,
    actionHandlers = {},
    debug = false,
    description = 'A2UI + json-render 适配渲染器',
  } = options;

  return {
    activityType,
    component: (props: ActivityComponentProps<any>) =>
      h(A2UIJsonRenderActivityRenderer, {
        ...props,
        registry,
        actionHandlers,
        debug,
      }),
    description,
  };
};

export * from './a2ui';
export * from './catalog';
export * from './context';
export * from './registry';
export * from './renderer';
export type * from './types';
