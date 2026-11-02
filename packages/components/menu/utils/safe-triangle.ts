export interface SafeTrianglePoint {
  x: number;
  y: number;
}

export type SafeTriangleDirection = 'right' | 'left' | 'top' | 'bottom';

export interface SafeTriangleGeometry {
  points: [SafeTrianglePoint, SafeTrianglePoint, SafeTrianglePoint];
  anchor: SafeTrianglePoint;
  toward: SafeTrianglePoint;
  top: number;
  left: number;
  width: number;
  height: number;
  path: string;
}

type PopupRect = Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left' | 'width' | 'height'>;

/** Builds a triangle from the pointer's leave point to the popup edge facing its trigger. */
export function getSafeTriangle(
  pointer: SafeTrianglePoint,
  popupRect: PopupRect,
  direction: SafeTriangleDirection,
): SafeTriangleGeometry | undefined {
  if (popupRect.width <= 0 || popupRect.height <= 0) return undefined;

  let nearEdge: [SafeTrianglePoint, SafeTrianglePoint];
  switch (direction) {
    case 'left':
      nearEdge = [
        { x: popupRect.right, y: popupRect.top },
        { x: popupRect.right, y: popupRect.bottom },
      ];
      break;
    case 'top':
      nearEdge = [
        { x: popupRect.left, y: popupRect.bottom },
        { x: popupRect.right, y: popupRect.bottom },
      ];
      break;
    case 'bottom':
      nearEdge = [
        { x: popupRect.left, y: popupRect.top },
        { x: popupRect.right, y: popupRect.top },
      ];
      break;
    default:
      nearEdge = [
        { x: popupRect.left, y: popupRect.top },
        { x: popupRect.left, y: popupRect.bottom },
      ];
  }

  const toward = {
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    top: { x: 0, y: -1 },
    bottom: { x: 0, y: 1 },
  }[direction];
  const distanceToEdge = (nearEdge[0].x - pointer.x) * toward.x + (nearEdge[0].y - pointer.y) * toward.y;
  if (distanceToEdge <= 0) return undefined;
  const left = Math.min(pointer.x, nearEdge[0].x, nearEdge[1].x);
  const top = Math.min(pointer.y, nearEdge[0].y, nearEdge[1].y);
  const right = Math.max(pointer.x, nearEdge[0].x, nearEdge[1].x);
  const bottom = Math.max(pointer.y, nearEdge[0].y, nearEdge[1].y);
  const toLocal = ({ x, y }: SafeTrianglePoint) => `${x - left},${y - top}`;

  return {
    points: [pointer, nearEdge[0], nearEdge[1]],
    anchor: pointer,
    toward,
    top,
    left,
    width: Math.max(right - left, 1),
    height: Math.max(bottom - top, 1),
    path: `M ${toLocal(pointer)} L ${toLocal(nearEdge[0])} L ${toLocal(nearEdge[1])} Z`,
  };
}

export function isPointInSafeTriangle(point: SafeTrianglePoint, [a, b, c]: SafeTriangleGeometry['points']) {
  const cross = (p1: SafeTrianglePoint, p2: SafeTrianglePoint, p3: SafeTrianglePoint) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = cross(point, a, b);
  const d2 = cross(point, b, c);
  const d3 = cross(point, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}

/** Rejects a grace path that leaves the triangle or materially reverses away from the popup. */
export function isPointerFollowingSafePath(
  point: SafeTrianglePoint,
  triangle: SafeTriangleGeometry,
  furthestProgress: number,
  previousPoint: SafeTrianglePoint = triangle.anchor,
  tolerance = 4,
) {
  if (!isPointInSafeTriangle(point, triangle.points)) return { active: false, progress: furthestProgress };

  const { x, y } = triangle.toward;
  const length = Math.hypot(x, y) || 1;
  const progress = ((point.x - triangle.anchor.x) * x + (point.y - triangle.anchor.y) * y) / length;
  const movementTowardPopup = ((point.x - previousPoint.x) * x + (point.y - previousPoint.y) * y) / length;
  // A lateral move toward a sibling item should release the hit area even if the pointer
  // remains inside the geometric triangle. Permit tiny sensor jitter while rejecting no-progress motion.
  if (movementTowardPopup <= 0.25) return { active: false, progress };
  if (progress < furthestProgress - tolerance) return { active: false, progress };

  return { active: true, progress: Math.max(furthestProgress, progress) };
}
