import { createRegistryManager } from '../shared';
import type { AgentToolcallConfig, ToolcallComponentProps } from './types';

/** Toolcall 注册事件名称 */
export const TOOLCALL_REGISTERED_EVENT = 'toolcall-registered';

/** Toolcall 注册事件 detail 键名 */
export const TOOLCALL_EVENT_DETAIL_KEY = 'name';

/**
 * 全局 Agent Toolcall 注册表
 */
export const agentToolcallRegistry = createRegistryManager<AgentToolcallConfig, ToolcallComponentProps>({
  getKey: (config) => config.name,
  eventName: TOOLCALL_REGISTERED_EVENT,
  eventDetailKey: TOOLCALL_EVENT_DETAIL_KEY,
});
