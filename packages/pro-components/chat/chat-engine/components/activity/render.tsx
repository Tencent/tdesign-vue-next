import { computed, defineComponent, h } from 'vue';
import type { ActivityData } from 'tdesign-web-components';
import type { ActivityComponentProps } from './types';
import { activityRegistry, ACTIVITY_REGISTERED_EVENT, ACTIVITY_EVENT_DETAIL_KEY } from './registry';
import { ComponentErrorBoundary, useRegistrationListener } from '../shared';

interface Props {
  activity: ActivityData;
}

/**
 * 默认的 Activity 渲染器
 * 当没有注册对应类型的组件时使用
 * TODO: 后续支持配置化的默认 UI
 */
const DefaultActivityRenderer = ({ activity }: { activity: ActivityData }): null => {
  // 空白兜底，仅在控制台输出警告
  console.warn(`[ActivityRenderer] Unknown activity type: ${activity.activityType}`, activity.content);
  return null;
};

/**
 * Activity 渲染器组件
 * 根据 activityType 精确匹配查找注册的组件进行渲染
 *
 * 性能优化：
 * - Vue3 的响应式系统会自动进行深度比较
 * - computed 会缓存计算结果，只在依赖变化时重新计算
 */
export default defineComponent({
  name: 'ActivityRenderer',
  props: {
    activity: {
      type: Object as () => ActivityData,
      required: true,
    },
  },
  setup(props: Props) {
    // 使用公共 Hook 监听动态注册
    const { MemoizedComponent } = useRegistrationListener<ActivityComponentProps>({
      componentKey: computed(() => props.activity.activityType),
      eventName: ACTIVITY_REGISTERED_EVENT,
      eventDetailKey: ACTIVITY_EVENT_DETAIL_KEY,
      getRenderFunction: activityRegistry.getRenderFunction,
    });

    // 缓存组件 props
    const componentProps = computed<ActivityComponentProps>(() => ({
      activityType: props.activity.activityType,
      content: props.activity.content,
      messageId: props.activity.messageId || '',
    }));

    return () => (
      <ComponentErrorBoundary componentName={props.activity.activityType} logPrefix="ActivityRenderer">
        {MemoizedComponent.value ? (
          h(MemoizedComponent.value, componentProps.value)
        ) : (
          <DefaultActivityRenderer activity={props.activity} />
        )}
      </ComponentErrorBoundary>
    );
  },
});
