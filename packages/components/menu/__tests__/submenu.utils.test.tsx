import {
  getSafeReturnTriangle,
  getSafeTriangle,
  isPointInSafeTriangle,
  isPointerFollowingSafePath,
} from '../utils/safe-triangle';

describe('submenu safe triangle', () => {
  const popupRect = { top: 20, right: 220, bottom: 120, left: 100, width: 120, height: 100 };

  it.each([
    [
      { x: 50, y: 70 },
      { x: 1, y: 0 },
    ],
    [
      { x: 270, y: 70 },
      { x: -1, y: 0 },
    ],
    [
      { x: 160, y: 0 },
      { x: 0, y: 1 },
    ],
    [
      { x: 160, y: 140 },
      { x: 0, y: -1 },
    ],
  ])('points a return path from %o toward its trigger', (point, toward) => {
    expect(getSafeReturnTriangle(point, popupRect)?.toward).toEqual(toward);
  });

  it.each([
    ['right', { x: 50, y: 50 }, { x: 100, y: 20 }, { x: 100, y: 120 }],
    ['left', { x: 250, y: 50 }, { x: 220, y: 20 }, { x: 220, y: 120 }],
    ['top', { x: 150, y: 150 }, { x: 100, y: 120 }, { x: 220, y: 120 }],
    ['bottom', { x: 150, y: 0 }, { x: 100, y: 20 }, { x: 220, y: 20 }],
  ] as const)('connects the pointer to the near popup edge for %s placement', (direction, point, first, second) => {
    const triangle = getSafeTriangle(point, popupRect, direction);

    expect(triangle?.points).toEqual([point, first, second]);
  });

  it('retains an advancing pointer inside the triangle and ends on reversal or exit', () => {
    const triangle = getSafeTriangle({ x: 50, y: 50 }, popupRect, 'right');
    expect(triangle).toBeDefined();
    if (!triangle) return;

    const advancing = isPointerFollowingSafePath({ x: 75, y: 50 }, triangle, 0, { x: 50, y: 50 });
    expect(advancing.active).toBe(true);
    expect(isPointerFollowingSafePath({ x: 65, y: 50 }, triangle, advancing.progress, { x: 75, y: 50 }).active).toBe(
      false,
    );
    expect(isPointerFollowingSafePath({ x: 50, y: 65 }, triangle, 0, { x: 50, y: 50 }).active).toBe(false);
    expect(isPointerFollowingSafePath({ x: 90, y: 0 }, triangle, 0, { x: 50, y: 50 }).active).toBe(false);
  });

  it('does not create a triangle when the popup has not been measured', () => {
    expect(getSafeTriangle({ x: 0, y: 0 }, { ...popupRect, width: 0 }, 'right')).toBeUndefined();
  });

  it('accepts diagonal movement toward the edge rather than only toward its center', () => {
    const triangle = getSafeTriangle({ x: 50, y: 110 }, popupRect, 'right');
    expect(triangle).toBeDefined();
    if (!triangle) return;
    expect(isPointerFollowingSafePath({ x: 75, y: 70 }, triangle, 0).active).toBe(true);
  });

  it('keeps a one-pixel lateral step but releases accumulated sibling movement', () => {
    const triangle = getSafeTriangle({ x: 50, y: 50 }, popupRect, 'right');
    if (!triangle) throw new Error('Expected triangle');
    const advancing = { x: 75, y: 60 };
    expect(isPointerFollowingSafePath({ x: 75, y: 61 }, triangle, 25, advancing, advancing).active).toBe(true);
    expect(isPointerFollowingSafePath({ x: 75, y: 63 }, triangle, 25, { x: 75, y: 62 }, advancing).active).toBe(false);
    expect(isPointerFollowingSafePath({ x: 74, y: 60 }, triangle, 25, advancing, advancing).active).toBe(true);
    expect(isPointerFollowingSafePath({ x: 73, y: 60 }, triangle, 25, { x: 74, y: 60 }, advancing).active).toBe(false);
  });

  it('allows limited return jitter without changing forward reversal handling', () => {
    const triangle = getSafeTriangle({ x: 50, y: 50 }, popupRect, 'right');
    if (!triangle) throw new Error('Expected triangle');
    const previous = { x: 75, y: 50 };
    const jitter = { x: 73, y: 50 };
    expect(isPointerFollowingSafePath(jitter, triangle, 25, previous).active).toBe(false);
    expect(isPointerFollowingSafePath(jitter, triangle, 25, previous, previous, 4).active).toBe(true);
    expect(isPointerFollowingSafePath({ x: 70, y: 50 }, triangle, 25, jitter, jitter, 4).active).toBe(false);
  });

  it('tolerates a small deviation near the tip while rejecting a larger deviation', () => {
    const triangle = getSafeTriangle(
      { x: 510, y: 581 },
      { top: 394, bottom: 574, left: 518, right: 652, width: 134, height: 180 },
      'top',
    );
    if (!triangle) throw new Error('Expected triangle');
    expect(isPointerFollowingSafePath({ x: 512, y: 578 }, triangle, 0).active).toBe(true);
    expect(isPointerFollowingSafePath({ x: 500, y: 578 }, triangle, 0).active).toBe(false);
  });

  it.each([
    ['right', { x: 50, y: 50 }],
    ['left', { x: 250, y: 50 }],
    ['top', { x: 150, y: 150 }],
    ['bottom', { x: 150, y: 0 }],
  ] as const)('applies the three-pixel boundary tolerance for %s', (direction, anchor) => {
    const triangle = getSafeTriangle(anchor, popupRect, direction);
    if (!triangle) throw new Error('Expected triangle');
    const [a, b, c] = triangle.points;
    const midpoint = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    let normal = { x: (b.y - a.y) / length, y: (a.x - b.x) / length };
    if ((c.x - midpoint.x) * normal.x + (c.y - midpoint.y) * normal.y > 0) {
      normal = { x: -normal.x, y: -normal.y };
    }
    const outside = (distance: number) => ({
      x: midpoint.x + normal.x * distance,
      y: midpoint.y + normal.y * distance,
    });
    expect(isPointInSafeTriangle(outside(2.9), triangle.points, 3, triangle.edgeLengths)).toBe(true);
    expect(isPointInSafeTriangle(outside(3.1), triangle.points, 3, triangle.edgeLengths)).toBe(false);
  });

  it('does not create a degenerate or backwards triangle', () => {
    expect(getSafeTriangle({ x: 100, y: 50 }, popupRect, 'right')).toBeUndefined();
    expect(getSafeTriangle({ x: 110, y: 50 }, popupRect, 'right')).toBeUndefined();
  });
});
