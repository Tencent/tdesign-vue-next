// @ts-nocheck
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { BaseTable } from '@tdesign/components';

const data = [
  { condition: 'A', feedback: 'a' },
  { condition: 'B', feedback: 'b' },
];

// 多级表头：group 为父级表头，不在叶子结点中，不允许拖拽调整列宽
const columns = [
  { colKey: 'condition', title: 'Condition', width: 200 },
  { colKey: 'group', title: 'Group', children: [{ colKey: 'feedback', title: 'Feedback', width: 200 }] },
];

function mockRect(el: Element, left: number, right: number) {
  el.getBoundingClientRect = () =>
    ({ left, right, top: 0, bottom: 40, width: right - left, height: 40, x: left, y: 0 } as DOMRect);
}

function fireMouse(el: EventTarget, type: string, x: number) {
  const event = new MouseEvent(type, { bubbles: true, clientX: x });
  Object.defineProperty(event, 'pageX', { value: x });
  Object.defineProperty(event, 'x', { value: x });
  el.dispatchEvent(event);
}

// thead 的 mousedown 会通过 10ms 定时器读取表头 DOM，需等待其执行完毕再卸载
async function unmountAfterTimers(wrapper) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  wrapper.unmount();
}

function mountResizableTable(props = {}) {
  const wrapper = mount(<BaseTable rowKey="condition" data={data} columns={columns} resizable bordered {...props} />, {
    attachTo: document.body,
  });
  const conditionTh = wrapper.find('th[data-colkey="condition"]').element;
  const groupTh = wrapper.find('th[data-colkey="group"]').element;
  mockRect(conditionTh, 0, 200);
  mockRect(groupTh, 200, 400);
  const resizeLine = wrapper.find('.t-table__resize-line').element as HTMLElement;
  return { wrapper, conditionTh, groupTh, resizeLine };
}

describe('BaseTable column resize with multi-level header', () => {
  let originalSelectStart: typeof document.onselectstart;
  let originalDragStart: typeof document.ondragstart;

  beforeEach(() => {
    originalSelectStart = document.onselectstart;
    originalDragStart = document.ondragstart;
  });

  afterEach(() => {
    document.onselectstart = originalSelectStart;
    document.ondragstart = originalDragStart;
    document.body.innerHTML = '';
  });

  it('should not start dragging when mousedown on a group header after hovering a leaf column border', async () => {
    const onColumnResizeChange = vi.fn();
    const { wrapper, conditionTh, groupTh, resizeLine } = mountResizableTable({ onColumnResizeChange });

    // 鼠标位于叶子结点右侧边框，出现拖拽图标
    fireMouse(conditionTh, 'mousemove', 198);
    expect(conditionTh.style.cursor).toBe('col-resize');

    // 直接移入父级表头并按下鼠标
    fireMouse(groupTh, 'mousemove', 202);
    fireMouse(groupTh, 'mousedown', 202);
    await nextTick();

    expect(document.onselectstart).toBe(originalSelectStart);
    expect(document.ondragstart).toBe(originalDragStart);
    expect(resizeLine.style.display).toBe('none');

    fireMouse(document, 'mouseup', 202);
    expect(onColumnResizeChange).not.toHaveBeenCalled();
    await unmountAfterTimers(wrapper);
  });

  it('should restore drag state when dragging ends on a column without resize info', async () => {
    const { wrapper, conditionTh, groupTh, resizeLine } = mountResizableTable();

    fireMouse(conditionTh, 'mousemove', 198);
    // 不经过 mousemove，直接在父级表头按下（例如表格滚动或布局变化导致鼠标下方元素改变）
    fireMouse(groupTh, 'mousedown', 202);
    await nextTick();
    expect(document.onselectstart?.(new Event('selectstart'))).toBe(false);
    expect(resizeLine.style.display).toBe('block');

    fireMouse(document, 'mouseup', 202);
    await nextTick();
    expect(document.onselectstart).toBe(originalSelectStart);
    expect(document.ondragstart).toBe(originalDragStart);
    expect(resizeLine.style.display).toBe('none');

    // 拖拽状态已重置，再次悬浮叶子结点边框时可以重新出现拖拽图标
    conditionTh.style.cursor = '';
    fireMouse(conditionTh, 'mousemove', 198);
    expect(conditionTh.style.cursor).toBe('col-resize');
    await unmountAfterTimers(wrapper);
  });

  it('should resize leaf column and restore drag state', async () => {
    const onColumnResizeChange = vi.fn();
    const { wrapper, conditionTh, resizeLine } = mountResizableTable({ onColumnResizeChange });

    fireMouse(conditionTh, 'mousemove', 198);
    fireMouse(conditionTh, 'mousedown', 198);
    await nextTick();
    expect(resizeLine.style.display).toBe('block');

    fireMouse(document, 'mouseup', 198);
    await nextTick();
    expect(onColumnResizeChange).toHaveBeenCalledTimes(1);
    expect(document.onselectstart).toBe(originalSelectStart);
    expect(resizeLine.style.display).toBe('none');
    await unmountAfterTimers(wrapper);
  });
});
