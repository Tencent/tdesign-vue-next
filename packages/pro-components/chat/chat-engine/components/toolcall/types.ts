import type { DefineComponent } from 'vue';

/**
 * 智能体可交互组件的标准 Props 接口
 */
export interface ToolcallComponentProps<TArgs extends object = any, TResult = any, TResponse = any> {
  /** 组件的当前渲染状态 */
  status: 'idle' | 'executing' | 'complete' | 'error';
  /** Agent 调用时传入的初始参数 */
  args: TArgs;
  /** 当 status 为 'complete' 时，包含 Toolcall 的最终执行结果 */
  result?: TResult;
  /** 当 status 为 'error' 时，包含错误信息 */
  error?: Error;
  /**
   * 【交互核心】一个回调函数，用于将用户的交互结果返回给宿主环境。
   * 仅在"交互式"场景下由宿主提供。
   */
  respond?: (response: TResponse) => void;
  agentState?: Record<string, any>;
}

// 场景一：非交互式 Toolcall 的配置 (有 handler)
interface NonInteractiveToolcallConfig<TArgs extends object, TResult> {
  name: string;
  description?: string;
  parameters?: Array<{ name: string; type: string; required?: boolean }>;
  /** 业务逻辑执行器，支持可选的后端结果作为第二个参数 */
  handler: (args: TArgs, backendResult?: any) => Promise<TResult>;
  /** 状态显示组件 */
  component: DefineComponent<ToolcallComponentProps<TArgs, TResult>>;
  /** 订阅statekey提取函数 */
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
}

// 场景二：交互式 Toolcall 的配置 (无 handler)
interface InteractiveToolcallConfig<TArgs extends object, TResult, TResponse> {
  name: string;
  description: string;
  parameters?: Array<{ name: string; type: string; required?: boolean }>;
  /** 交互式UI组件 */
  component: DefineComponent<ToolcallComponentProps<TArgs, TResult, TResponse>>;
  /** handler 属性不存在，以此作为区分标志 */
  handler?: never;
  /** 订阅statekey提取函数 */
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
}

// 最终的配置类型
export type AgentToolcallConfig<TArgs extends object = any, TResult = any, TResponse = any> =
  | NonInteractiveToolcallConfig<TArgs, TResult>
  | InteractiveToolcallConfig<TArgs, TResult, TResponse>;

// 类型守卫：判断是否为非交互式配置
export function isNonInteractive<TArgs extends object, TResult>(
  config: AgentToolcallConfig<TArgs, TResult, any>,
): config is NonInteractiveToolcallConfig<TArgs, TResult> {
  return typeof (config as any).handler === 'function';
}

// Agent Toolcall 注册表
export interface AgentToolcallRegistry {
  [ToolcallName: string]: AgentToolcallConfig;
}

// 内部状态管理
export interface AgentToolcallState<TArgs extends object = any, TResult = any> {
  status: ToolcallComponentProps['status'];
  args?: TArgs;
  result?: TResult;
  error?: Error;
}

// 类型守卫函数
export const isNonInteractiveConfig = (cfg: AgentToolcallConfig): cfg is AgentToolcallConfig & { handler: Function } =>
  typeof (cfg as any).handler === 'function';
