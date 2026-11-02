import { getSafeTriangle, isPointerFollowingSafePath } from '../utils/safe-triangle';

describe('submenu safe triangle', () => {
  const popupRect = { top: 20, right: 220, bottom: 120, left: 100, width: 120, height: 100 };

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

  it('does not create a degenerate or backwards triangle', () => {
    expect(getSafeTriangle({ x: 100, y: 50 }, popupRect, 'right')).toBeUndefined();
    expect(getSafeTriangle({ x: 110, y: 50 }, popupRect, 'right')).toBeUndefined();
  });
});
