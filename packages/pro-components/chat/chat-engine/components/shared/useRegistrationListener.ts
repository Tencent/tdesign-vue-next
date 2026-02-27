import { ref, computed, watch, unref, type Component, type Ref, type ComputedRef } from 'vue';

interface UseRegistrationListenerOptions<TProps> {
  /** 组件唯一标识 */
  componentKey: string | Ref<string> | ComputedRef<string>;
  /** 监听的事件名称 */
  eventName: string;
  /** 事件 detail 中的键名 */
  eventDetailKey: string;
  /** 获取渲染函数的方法 */
  getRenderFunction: (key: string) => Component | null;
}

interface UseRegistrationListenerResult<TProps> {
  /** 是否已注册 */
  isRegistered: boolean;
  /** 缓存的 Memo 组件 */
  MemoizedComponent: Component | null;
}

/**
 * 动态注册监听 Hook
 * 统一处理 Activity 和 Toolcall 的动态注册逻辑
 */
export function useRegistrationListener<TProps>(
  options: UseRegistrationListenerOptions<TProps>,
): UseRegistrationListenerResult<TProps> {
  const { componentKey, eventName, eventDetailKey, getRenderFunction } = options;

  // 注册状态
  const isRegistered = ref(!!getRenderFunction(unref(componentKey)));

  // 监听组件注册事件，支持动态注册
  watch(
    [() => unref(componentKey), () => unref(eventName), () => unref(eventDetailKey), isRegistered],
    ([key, evtName, detailKey, registered]) => {
      if (!registered) {
        const handleRegistered = (event: CustomEvent) => {
          // 精确匹配
          if (event.detail?.[detailKey] === key) {
            isRegistered.value = true;
          }
        };

        window.addEventListener(evtName, handleRegistered as EventListener);

        return () => {
          window.removeEventListener(evtName, handleRegistered as EventListener);
        };
      }
    },
    { immediate: true },
  );

  // 使用 registry 的缓存渲染函数
  const MemoizedComponent = computed(() => {
    // 显式依赖 isRegistered，确保注册状态变化时重新计算
    if (!isRegistered.value) {
      return null;
    }
    return getRenderFunction(unref(componentKey));
  });

  return { isRegistered: isRegistered.value, MemoizedComponent: MemoizedComponent.value };
}
