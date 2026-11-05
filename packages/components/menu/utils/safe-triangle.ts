export interface SafeTrianglePoint {
  x: number;
  y: number;
}

export type SafeTriangleDirection = 'right' | 'left' | 'top' | 'bottom';

export interface SafeTriangleGeometry {
  points: [SafeTrianglePoint, SafeTrianglePoint, SafeTrianglePoint];
  edgeLengths: [number, number, number];
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
    edgeLengths: [
      Math.hypot(pointer.x - nearEdge[0].x, pointer.y - nearEdge[0].y),
      Math.hypot(nearEdge[0].x - nearEdge[1].x, nearEdge[0].y - nearEdge[1].y),
      Math.hypot(nearEdge[1].x - pointer.x, nearEdge[1].y - pointer.y),
    ],
    anchor: pointer,
    toward,
    top,
    left,
    width: Math.max(right - left, 1),
    height: Math.max(bottom - top, 1),
    path: `M ${toLocal(pointer)} L ${toLocal(nearEdge[0])} L ${toLocal(nearEdge[1])} Z`,
  };
}

export function isPointInSafeTriangle(
  point: SafeTrianglePoint,
  [a, b, c]: SafeTriangleGeometry['points'],
  tolerance = 0,
  edgeLengths?: SafeTriangleGeometry['edgeLengths'],
) {
  const cross = (p1: SafeTrianglePoint, p2: SafeTrianglePoint, p3: SafeTrianglePoint) =>
    (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = cross(point, a, b);
  const d2 = cross(point, b, c);
  const d3 = cross(point, c, a);
  const t1 = tolerance * (edgeLengths?.[0] ?? Math.hypot(a.x - b.x, a.y - b.y));
  const t2 = tolerance * (edgeLengths?.[1] ?? Math.hypot(b.x - c.x, b.y - c.y));
  const t3 = tolerance * (edgeLengths?.[2] ?? Math.hypot(c.x - a.x, c.y - a.y));
  const hasNegative = d1 < -t1 || d2 < -t2 || d3 < -t3;
  const hasPositive = d1 > t1 || d2 > t2 || d3 > t3;
  return !(hasNegative && hasPositive);
}

/** Rejects a grace path that leaves the triangle or materially reverses away from the popup. */
export function isPointerFollowingSafePath(
  point: SafeTrianglePoint,
  triangle: SafeTriangleGeometry,
  furthestProgress: number,
  previousPoint: SafeTrianglePoint = triangle.anchor,
  tolerance = 4,
  lastAdvancingPoint: SafeTrianglePoint = previousPoint,
) {
  if (!isPointInSafeTriangle(point, triangle.points, 3, triangle.edgeLengths)) {
    return { active: false, progress: furthestProgress };
  }

  const { x, y } = triangle.toward;
  // getSafeTriangle only supplies axis-aligned unit vectors.
  const progress = (point.x - triangle.anchor.x) * x + (point.y - triangle.anchor.y) * y;
  const movementTowardPopup = (point.x - previousPoint.x) * x + (point.y - previousPoint.y) * y;
  // Allow small quantized lateral steps, but release for a deliberate sibling
  // move even if several small steps remain inside the triangle.
  const lateralDrift = Math.abs((point.x - lastAdvancingPoint.x) * y - (point.y - lastAdvancingPoint.y) * x);
  if (progress < furthestProgress - Math.min(tolerance, 1) || (movementTowardPopup <= 0.25 && lateralDrift > 2)) {
    return { active: false, progress };
  }
  if (progress < furthestProgress - tolerance) return { active: false, progress };

  return { active: true, progress: Math.max(furthestProgress, progress) };
}
