import { defineComponent } from 'vue';
import { useAgentState, provideAgentState } from '../../hooks/useAgentState';

interface Props {
  initialState?: Record<string, any>;
  subscribeKey?: string;
}

export default defineComponent({
  name: 'AgentStateProvider',
  props: {
    initialState: {
      type: Object as () => Record<string, any>,
      default: () => ({}),
    },
    subscribeKey: {
      type: String,
      default: undefined,
    },
  },
  setup(props: Props, { slots, expose }) {
    // 创建 AgentState 并提供给后代组件
    const agentStateResult = useAgentState({
      initialState: props.initialState,
      subscribeKey: props.subscribeKey,
    });

    provideAgentState(agentStateResult);

    // 暴露给父组件使用
    expose(agentStateResult);

    return () => slots.default?.();
  },
});
