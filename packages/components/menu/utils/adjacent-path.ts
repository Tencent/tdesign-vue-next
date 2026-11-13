type Point = { x: number; y: number };
type ActivePath = {
  owner: HTMLElement;
  group: Element | null;
  test: (event: MouseEvent) => boolean;
  stop: (event?: MouseEvent, release?: boolean) => void;
  pending?: () => void;
  pendingTarget?: HTMLElement;
};

const EDGE_TOLERANCE_PX = 3;
const BACKTRACK_TOLERANCE_PX = 4;
const PAUSE_DELAY_MS = 300;
const NON_INTERACTIVE_GRACE_MS = 700;

const paths = new WeakMap<object, ActivePath>();
const cross = (a: Point, b: Point, p: Point) => (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);

/**
 * Protect the pointer path between a trigger and its adjacent popup.
 * Each menu scope has one active path; ending it can release the owner and resume a hovered sibling.
 */
export function createAdjacentPath(scope: object) {
  let path: ActivePath | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastEvent: MouseEvent | undefined;
  let anchor: Point;
  let previous: Point;
  let corners: [Point, Point];
  let direction: Point;
  let progress = 0;
  let target: HTMLElement;
  let onRelease: (event: MouseEvent) => void;
  let forward = false;
  let prefix = '';

  // Clear the active path before callbacks: release may close the owner, while
  // pending may open a competing sibling that is still hovered.
  const stop = (event?: MouseEvent, release = false) => {
    if (!path) return;
    const pending = path.pending;
    if (paths.get(scope) === path) paths.delete(scope);
    path = undefined;
    clearTimeout(timer);
    document.removeEventListener('mousemove', move);
    document.removeEventListener('pointerdown', down, true);
    window.removeEventListener('scroll', reposition, true);
    window.removeEventListener('resize', reposition);
    if (release && event) onRelease(event);
    pending?.();
  };

  const update = (point: Point) => {
    const r = target.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dx = point.x < r.left ? r.left - point.x : point.x > r.right ? point.x - r.right : 0;
    const dy = point.y < r.top ? r.top - point.y : point.y > r.bottom ? point.y - r.bottom : 0;
    if (!dx && !dy) return false;
    if (dx > dy) {
      const x = point.x < r.left ? r.left : r.right;
      direction = { x: point.x < r.left ? 1 : -1, y: 0 };
      corners = [
        { x, y: r.top },
        { x, y: r.bottom },
      ];
    } else {
      const y = point.y < r.top ? r.top : r.bottom;
      direction = { x: 0, y: point.y < r.top ? 1 : -1 };
      corners = [
        { x: r.left, y },
        { x: r.right, y },
      ];
    }
    anchor = previous = point;
    progress = 0;
    return true;
  };
  const contains = (event: MouseEvent) => {
    const p = { x: event.clientX, y: event.clientY };
    const [b, c] = corners;
    const sides = [cross(anchor, b, p), cross(b, c, p), cross(c, anchor, p)];
    const edges = [
      Math.hypot(anchor.x - b.x, anchor.y - b.y),
      Math.hypot(b.x - c.x, b.y - c.y),
      Math.hypot(c.x - anchor.x, c.y - anchor.y),
    ];
    // Cross products test the triangle; tolerances allow edge and backward pointer jitter.
    const negative = sides.some((v, i) => v < -EDGE_TOLERANCE_PX * edges[i]);
    const positive = sides.some((v, i) => v > EDGE_TOLERANCE_PX * edges[i]);
    const next = (p.x - anchor.x) * direction.x + (p.y - anchor.y) * direction.y;
    return !(negative && positive) && next >= progress - BACKTRACK_TOLERANCE_PX;
  };
  const schedule = (event: MouseEvent) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const below = document.elementFromPoint(event.clientX, event.clientY);
      const interactive = below?.closest(
        `.${prefix}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
      );
      // Extend a pause only over non-interactive space when there is movement
      // intent. Return paths establish that intent on entry.
      if ((!forward || progress > 0) && below && !interactive) {
        timer = setTimeout(() => stop(event, true), NON_INTERACTIVE_GRACE_MS);
      } else {
        stop(event, true);
      }
    }, PAUSE_DELAY_MS);
  };
  const move = (event: MouseEvent) => {
    if (!path) return;
    lastEvent = event;
    if (event.target instanceof Node && target.contains(event.target)) {
      path.pending = undefined;
      stop();
      return;
    }
    if (
      !forward &&
      (event.target as Element | null)?.closest?.(
        `.${prefix}-menu__item, button, a, input, select, textarea, [role="button"], [role="menuitem"]`,
      )
    ) {
      stop(event, true);
      return;
    }
    if (!contains(event)) {
      stop(event, true);
      return;
    }
    const next = (event.clientX - anchor.x) * direction.x + (event.clientY - anchor.y) * direction.y;
    progress = Math.max(progress, next);
    previous = { x: event.clientX, y: event.clientY };
    schedule(event);
  };
  const down = (event: PointerEvent) => {
    if (path && !(event.target instanceof Node && path.pendingTarget?.contains(event.target))) {
      path.pending = undefined;
    }
    stop(event, true);
  };
  const reposition = () => {
    if (!path) return;
    const hit = document.elementFromPoint(previous.x, previous.y);
    if (hit && target.contains(hit)) {
      path.pending = undefined;
      stop();
    } else if (!update(previous)) {
      stop(lastEvent, true);
    }
  };
  const begin = (options: {
    owner: HTMLElement | undefined;
    target: HTMLElement | undefined;
    previous: Point | undefined;
    event: MouseEvent;
    prefix: string;
    forward: boolean;
    release: (event: MouseEvent) => void;
  }) => {
    if (!options.owner || !options.target || !options.previous) return false;
    if (path) stop(options.event, true);
    target = options.target;
    const point = { x: options.event.clientX, y: options.event.clientY };
    if (!update(point)) return false;
    const toward = (point.x - options.previous.x) * direction.x + (point.y - options.previous.y) * direction.y;
    if (toward <= 0) return false;
    paths.get(scope)?.stop(options.event, true);
    onRelease = options.release;
    prefix = options.prefix;
    forward = options.forward;
    lastEvent = options.event;
    path = {
      owner: options.owner,
      group: options.owner.closest(`.${prefix}-submenu`)?.parentElement ?? null,
      test: contains,
      stop,
    };
    paths.set(scope, path);
    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('pointerdown', down, true);
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    schedule(options.event);
    return true;
  };
  return { begin, stop };
}

/** Delay a competing sibling only while the pointer still follows its neighbour's path. */
export function deferAdjacentSibling(
  scope: object,
  owner: HTMLElement,
  event: MouseEvent,
  resume: () => void,
  prefix: string,
) {
  const path = paths.get(scope);
  const group = owner.closest(`.${prefix}-submenu`)?.parentElement;
  if (!path || path.owner === owner || path.group !== group || !path.test(event)) return false;
  path.pendingTarget = owner;
  path.pending = () => {
    if (owner.matches(':hover')) resume();
  };
  return true;
}

export function protectsDescendant(scope: object, parent: HTMLElement | undefined, event: MouseEvent) {
  const path = paths.get(scope);
  return !!(path && parent?.contains(path.owner) && path.test(event));
}
