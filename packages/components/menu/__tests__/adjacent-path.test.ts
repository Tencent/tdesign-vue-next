import { createAdjacentPath, deferAdjacentSibling, protectsDescendant } from '../utils/adjacent-path';

describe('adjacent menu path', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    document.body.innerHTML = '';
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it.each([
    [
      { x: 80, y: 150 },
      { x: 100, y: 150 },
    ],
    [
      { x: 420, y: 150 },
      { x: 400, y: 150 },
    ],
    [
      { x: 250, y: -20 },
      { x: 250, y: 0 },
    ],
    [
      { x: 250, y: 320 },
      { x: 250, y: 300 },
    ],
  ])('starts a path toward the adjacent target from %o', (previous, point) => {
    const owner = document.createElement('div');
    const target = document.createElement('div');
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });
    const path = createAdjacentPath({});
    expect(
      path.begin({
        owner,
        target,
        previous,
        event: new MouseEvent('mouseleave', { clientX: point.x, clientY: point.y }),
        release: vi.fn(),
        prefix: 't',
        forward: true,
      }),
    ).toBe(true);
    path.stop();
  });

  it('protects the adjacent path, defers its sibling and releases on click', () => {
    const scope = {};
    const parent = document.createElement('ul');
    const first = document.createElement('li');
    const sibling = document.createElement('li');
    first.className = sibling.className = 'x-submenu';
    const owner = document.createElement('div');
    const siblingItem = document.createElement('div');
    const target = document.createElement('div');
    first.appendChild(owner);
    sibling.appendChild(siblingItem);
    parent.append(first, sibling);
    document.body.append(parent, target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });
    const release = vi.fn();
    const resume = vi.fn();
    const path = createAdjacentPath(scope);
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 'x',
        forward: true,
      }),
    ).toBe(true);
    const move = new MouseEvent('mousemove', { bubbles: true, clientX: 150, clientY: 150 });
    expect(protectsDescendant(scope, parent, move)).toBe(true);
    expect(deferAdjacentSibling(scope, siblingItem, move, resume, 'x')).toBe(true);
    document.body.dispatchEvent(move);
    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 150, clientY: 150 }));
    expect(release).toHaveBeenCalledTimes(1);
    expect(resume).not.toHaveBeenCalled();
    expect(protectsDescendant(scope, parent, move)).toBe(false);
    vi.advanceTimersByTime(400);
    expect(release).toHaveBeenCalledTimes(1);
    path.stop();
  });

  it('resumes a deferred sibling when that sibling is clicked', () => {
    const scope = {};
    const group = document.createElement('ul');
    const first = document.createElement('li');
    const second = document.createElement('li');
    first.className = second.className = 't-submenu';
    const owner = document.createElement('div');
    const sibling = document.createElement('div');
    const child = document.createElement('span');
    const target = document.createElement('div');
    sibling.append(child);
    first.append(owner);
    second.append(sibling);
    group.append(first, second);
    document.body.append(group, target);
    vi.spyOn(sibling, 'matches').mockReturnValue(true);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });
    const resume = vi.fn();
    const release = vi.fn();
    const path = createAdjacentPath(scope);
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 't',
        forward: true,
      }),
    ).toBe(true);
    expect(
      deferAdjacentSibling(scope, sibling, new MouseEvent('mouseenter', { clientX: 150, clientY: 150 }), resume, 't'),
    ).toBe(true);
    child.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 150, clientY: 150 }));
    expect(release).toHaveBeenCalledTimes(1);
    expect(resume).toHaveBeenCalledTimes(1);
    path.stop();
  });

  it.each(['scroll', 'resize'])('treats the target moving under the pointer on %s as arrival', (eventName) => {
    const owner = document.createElement('div');
    const target = document.createElement('div');
    const rect = {
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(rect);
    const release = vi.fn();
    const path = createAdjacentPath({});
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 't',
        forward: true,
      }),
    ).toBe(true);
    document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 150, clientY: 150 }));
    rect.left = 100;
    rect.right = 200;
    rect.x = 100;
    const original = document.elementFromPoint;
    document.elementFromPoint = () => target;
    window.dispatchEvent(new Event(eventName));
    vi.advanceTimersByTime(1000);
    expect(release).not.toHaveBeenCalled();
    document.elementFromPoint = original;
    path.stop();
  });

  it('releases when a moved target is covered by another element', () => {
    const owner = document.createElement('div');
    const target = document.createElement('div');
    const rect = {
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    };
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue(rect);
    const release = vi.fn();
    const path = createAdjacentPath({});
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 't',
        forward: true,
      }),
    ).toBe(true);
    document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 150, clientY: 150 }));
    rect.left = 100;
    rect.right = 200;
    const original = document.elementFromPoint;
    document.elementFromPoint = () => document.body;
    window.dispatchEvent(new Event('resize'));
    expect(release).toHaveBeenCalledTimes(1);
    document.elementFromPoint = original;
    path.stop();
  });

  it('only extends a moving forward path over a non-interactive surface', () => {
    const owner = document.createElement('div');
    const target = document.createElement('div');
    document.body.append(owner, target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });
    const original = document.elementFromPoint;
    document.elementFromPoint = () => document.body;
    const release = vi.fn();
    const path = createAdjacentPath({});
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 't',
        forward: true,
      }),
    ).toBe(true);
    document.body.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 150, clientY: 150 }));
    vi.advanceTimersByTime(650);
    expect(release).not.toHaveBeenCalled();
    document.body.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    expect(release).toHaveBeenCalledTimes(1);
    document.elementFromPoint = original;
    path.stop();
  });

  it.each([
    ['background', false],
    ['button', true],
  ])('keeps a return pause over %s only when it is non-interactive', (surface, closesAt300) => {
    const owner = document.createElement('div');
    const target = document.createElement('div');
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 300,
      top: 100,
      bottom: 200,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      toJSON: () => ({}),
    });
    const original = document.elementFromPoint;
    document.elementFromPoint = () => (surface === 'button' ? document.createElement('button') : document.body);
    const release = vi.fn();
    const path = createAdjacentPath({});
    expect(
      path.begin({
        owner,
        target,
        previous: { x: 80, y: 150 },
        event: new MouseEvent('mouseleave', { clientX: 100, clientY: 150 }),
        release,
        prefix: 't',
        forward: false,
      }),
    ).toBe(true);
    vi.advanceTimersByTime(300);
    expect(release).toHaveBeenCalledTimes(closesAt300 ? 1 : 0);
    vi.advanceTimersByTime(700);
    expect(release).toHaveBeenCalledTimes(1);
    document.elementFromPoint = original;
    path.stop();
  });
});
