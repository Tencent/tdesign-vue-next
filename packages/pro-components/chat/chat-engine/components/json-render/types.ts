import type { Component, VNodeChild } from 'vue';
import type { ActionBinding, UIElement } from '@json-render/core';
import type { JsonRenderSchema } from '@tdesign/web-components-chat/chat-engine';

export interface ComponentRenderProps<P = Record<string, unknown>> {
  element: UIElement<string, P>;
  children?: VNodeChild;
  onAction?: (action: ActionBinding) => void;
  loading?: boolean;
}

export type ComponentRenderer<P = Record<string, unknown>> = Component<ComponentRenderProps<P>>;
export type ComponentRegistry = Record<string, ComponentRenderer<any>>;

export interface RendererProps {
  tree: JsonRenderSchema | null;
  registry: ComponentRegistry;
  loading?: boolean;
  fallback?: ComponentRenderer;
}

export interface JsonRenderDeltaInfo {
  fromIndex: number;
  toIndex: number;
}

export interface JsonRenderActivityProps {
  activityType: string;
  content: JsonRenderSchema;
  messageId: string;
  ext?: {
    deltaInfo?: JsonRenderDeltaInfo;
    [key: string]: any;
  };
}

export type ActionHandlers = Record<string, (params: Record<string, unknown>) => void | Promise<void>>;
