import { defineComponent, h, computed, type DefineComponent } from 'vue';
import { useAgentStateDataByKey } from '../../hooks/useAgentState';

/**
 * HOC（高阶组件）：将 AgentState 注入到组件的 props 中
 */

// 定义增强后的 Props 类型
export type WithAgentStateProps<P extends object = any> = P & { agentState?: Record<string, any> };

/**
 * 简单的状态注入 HOC（高阶组件）
 * 将 AgentState 注入到组件的 props 中
 */
export const withAgentStateToolcall1 = <P extends object = any>(
  Component: DefineComponent<WithAgentStateProps<P>>,
): DefineComponent<P> => {
  //@ts-ignore
  return defineComponent({
    name: `withAgentState(${Component.name || 'Component'})`,
    props: Component.props,
    setup(props: any) {
      // 使用 Vue 的 inject 获取 AgentState（如果有提供者的话）
      // 这里简化处理，直接获取所有状态
      const agentState = useAgentStateDataByKey();

      return () => {
        return h(Component as any, {
          ...props,
          agentState: agentState.value,
        });
      };
    },
  });
};

/**
 * 高级的状态注入 HOC（高阶组件）
 * 支持通过 subscribeKeyExtractor 获取特定的状态 key
 */
export const withAgentStateToolcall = <P extends object = any>(
  Component: DefineComponent<WithAgentStateProps<P>>,
  subscribeKeyExtractor?: (props: P) => string | undefined,
): DefineComponent<P> => {
  // @ts-ignore
  return defineComponent({
    name: `withAgentState(${Component.name || 'Component'})`,
    props: Component.props,
    setup(props: any) {
      // 计算需要订阅的 stateKey
      const targetStateKey = computed(() => (subscribeKeyExtractor ? subscribeKeyExtractor(props) : undefined));

      // 使用精确的 stateKey 获取状态
      const agentState = useAgentStateDataByKey(targetStateKey.value);

      return () => {
        return h(Component as any, {
          ...props,
          agentState: agentState.value,
        });
      };
    },
  });
};
