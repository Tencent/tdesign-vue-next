type PointerLifecycleOptions = {
  onMove: (event: MouseEvent) => void;
  onPointerDown: (event: PointerEvent) => void;
  onReposition: () => void;
};

/** Owns the listeners and timer used while a pointer path is protected. */
export function createPointerLifecycle({ onMove, onPointerDown, onReposition }: PointerLifecycleOptions) {
  let listening = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };

  return {
    start: () => {
      if (listening) return;
      document.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('pointerdown', onPointerDown, true);
      window.addEventListener('scroll', onReposition, true);
      window.addEventListener('resize', onReposition);
      listening = true;
    },
    stop: () => {
      clearTimer();
      if (!listening) return;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
      listening = false;
    },
    clearTimer,
    hasTimer: () => timer !== undefined,
    setTimer: (callback: () => void, delay: number) => {
      timer = setTimeout(callback, delay);
    },
  };
}
