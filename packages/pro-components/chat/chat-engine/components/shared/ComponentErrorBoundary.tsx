import { defineComponent, ref, onErrorCaptured } from 'vue';

interface Props {
  /** 组件标识，用于错误日志 */
  componentName: string;
  /** 日志前缀，如 'ActivityRenderer' 或 'ToolCallRenderer' */
  logPrefix?: string;
}

export default defineComponent({
  name: 'ComponentErrorBoundary',
  props: {
    componentName: {
      type: String,
      required: true,
    },
    logPrefix: {
      type: String,
      default: 'ComponentRenderer',
    },
  },
  setup(props: Props, { slots }) {
    const hasError = ref(false);
    const error = ref<Error | null>(null);

    // 捕获子组件错误
    onErrorCaptured((err: Error, instance, info) => {
      hasError.value = true;
      error.value = err;

      console.error(`[${props.logPrefix}] Error in "${props.componentName}":`, err, info);

      // 阻止错误继续向上传播
      return false;
    });

    return () => {
      if (!hasError.value) {
        return slots.default?.();
      }
      return slots.fallback?.();
    };
  },
});
