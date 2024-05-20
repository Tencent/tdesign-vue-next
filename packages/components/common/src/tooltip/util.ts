import { onMounted, onUnmounted, ref } from '@td/adapter-vue';
import { isServer } from '@td/adapter-utils';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const onMouseMove = (e: MouseEvent) => {
    x.value = e.clientX;
    y.value = e.clientY;
  };

  if (!isServer) {
    onMounted(() => {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
    });
    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove);
    });
  }
  return {
    x,
    y,
  };
}
