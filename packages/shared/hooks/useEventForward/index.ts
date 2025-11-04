import { computed, ComputedRef } from 'vue';

/**
 * 合并组件 props 中的透传事件与组件的回调
 * 先执行封装组件回调，再执行用户回调
 *
 * @param componentsProps 用户传入的 componentsProps
 * @param internalHandlers 组件使用的回调
 * @returns 合并后的 props
 *
 * @example
 * const internalHandlers = {
 *   onChange: () => innerChange(),
 *   onClick: () => innerClick(),
 * };
 * const events = useEventForward(componentsProps, internalHandlers);
 *
 * <Component {...events.value} />
 */
export function useEventForward<T extends Record<string, any>>(
  componentsProps: T,
  internalHandlers?: Partial<{
    [K in keyof T]: T[K] extends (...args: any[]) => void ? T[K] : never;
  }>,
): ComputedRef<T> {
  return computed(() => {
    const merged = { ...componentsProps };

    (Object.keys(internalHandlers ?? {}) as Array<keyof T>).forEach((key) => {
      const userHandler = componentsProps?.[key];
      const internalHandler = internalHandlers?.[key];

      if (typeof userHandler === 'function' && typeof internalHandler === 'function') {
        merged[key] = ((...args: any[]) => {
          try {
            internalHandler(...args);
          } catch (error) {
            console.warn(`[useEventForward]: Error in component callback for ${String(key)}:`, error);
          }
          try {
            userHandler(...args);
          } catch (error) {
            console.warn(`[useEventForward]: Error in custom callback for ${String(key)}:`, error);
          }
        }) as T[keyof T];
      } else if (typeof internalHandler === 'function') {
        // 用户无回调，只用组件回调
        merged[key] = internalHandler;
      }
      // 封装组件无回调(或保留不是方法的参数)，保留用户传入内容
    });

    return merged;
  });
}
