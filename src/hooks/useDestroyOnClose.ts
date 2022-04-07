import { ref, provide, onUpdated } from 'vue';

export const TDisplayNoneElementRefresh = 't-display-none-element-refresh';

// destroyOnClose=false 时，父元素为 display: none，此时的子元素无法获取到自身元素的任何宽度
// 因此，需在父元素 display: none 发生变化时主动更新子元素
export default function useDestroyOnClose() {
  const refresh = ref(0);
  provide(TDisplayNoneElementRefresh, refresh);
  onUpdated(() => {
    refresh.value += 1;
  });
}
