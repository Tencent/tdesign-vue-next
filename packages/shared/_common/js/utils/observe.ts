export default function observe(
  element: HTMLElement,
  root: HTMLElement,
  callback: Function,
  marginBottom: number,
): IntersectionObserver {
  if (typeof window === 'undefined') return null;
  if (!window || !window.IntersectionObserver) {
    callback();
    return null;
  }
  let io: IntersectionObserver = null;
  try {
    io = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          callback();
          io.unobserve(element);
        }
      },
      {
        rootMargin: `0px 0px ${marginBottom}px 0px`,
        root,
      },
    );
    io.observe(element);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    callback();
  }
  return io;
}
