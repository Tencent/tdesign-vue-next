import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BaseTable, PrimaryTable, EnhancedTable } from '@tdesign/components/table';
import type { BaseTableInstanceFunctions } from '@tdesign/components/table';

const columns = [{ colKey: 'id', title: 'ID' }];

describe.each([
  ['BaseTable', BaseTable],
  ['PrimaryTable', PrimaryTable],
  ['EnhancedTable', EnhancedTable],
] as const)('%s', (name, component) => {
  const wrappers: VueWrapper[] = [];

  const renderTable = async (props: Record<string, unknown> = {}, headerHeight = 48) => {
    const wrapper = mount(component, {
      props: {
        rowKey: 'id',
        columns,
        data: Array.from({ length: 120 }, (_, id) => ({ id })),
        ...(name === 'EnhancedTable' ? { tree: { treeNodeColumnIndex: 0 } } : {}),
        ...props,
      },
    });
    wrappers.push(wrapper);
    await nextTick();

    const container = wrapper.find('.t-table__content').element as HTMLElement;
    const scrollTo = vi.fn();
    const scrollBy = vi.fn();
    container.scrollTo = scrollTo;
    container.scrollBy = scrollBy;
    const header = container.querySelector('thead');
    if (header) Object.defineProperty(header, 'offsetHeight', { configurable: true, value: headerHeight });
    container.querySelectorAll('tbody > tr').forEach((row, index) => {
      Object.defineProperty(row, 'offsetTop', { configurable: true, value: headerHeight + index * 48 });
    });

    return { wrapper, container, scrollTo, scrollBy, instance: wrapper.vm as unknown as BaseTableInstanceFunctions };
  };

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('instanceFunctions', () => {
    it.each([{ key: 0 }, { index: 0 }])(
      'scrollToElement(%j) reaches the first row in a normal table',
      async (target) => {
        vi.useFakeTimers();
        const { container, instance, scrollBy } = await renderTable();
        container.scrollTop = 200;

        instance.scrollToElement({ ...target, top: 48, behavior: 'smooth' });

        expect(scrollBy).toHaveBeenCalledWith({ top: -200, behavior: 'smooth' });
      },
    );

    it.each([
      [{ key: 0 }, 48, 0],
      [{ index: 0 }, 0, 48],
      [{ index: 3 }, 48, 144],
      [{ key: 110 }, 48, 5280],
    ])('scrollToElement(%j, top: %i) targets the correct virtual row', async (target, top, expectedTop) => {
      vi.useFakeTimers();
      const { instance, scrollTo } = await renderTable({
        height: 200,
        scroll: { type: 'virtual', rowHeight: 48, isFixedRowHeight: true },
      });

      instance.scrollToElement({ ...target, top, behavior: 'smooth' });

      expect(scrollTo).toHaveBeenCalledWith({ top: expectedTop, behavior: 'smooth' });
    });

    it('uses the actual header height for virtual scrolling', async () => {
      vi.useFakeTimers();
      const { instance, scrollTo } = await renderTable(
        { height: 200, scroll: { type: 'virtual', rowHeight: 48, isFixedRowHeight: true } },
        96,
      );

      instance.scrollToElement({ index: 3, top: 96 });

      expect(scrollTo).toHaveBeenCalledWith({ top: 144, behavior: 'auto' });
    });

    it('scrolls to the first virtual row when the header is hidden', async () => {
      vi.useFakeTimers();
      const { instance, scrollTo } = await renderTable({
        showHeader: false,
        height: 200,
        scroll: { type: 'virtual', rowHeight: 48, isFixedRowHeight: true },
      });

      instance.scrollToElement({ key: 0 });

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    });

    it('uses measured row heights during the delayed virtual scroll correction', async () => {
      vi.useFakeTimers();
      const getRect = HTMLElement.prototype.getBoundingClientRect;
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        const rect = getRect.call(this);
        const height =
          this.tagName === 'TR' && this.closest('tbody') ? [32, 40, 56][Number(this.textContent)] ?? 48 : 200;
        return { ...rect, height, width: 600 };
      });
      const { instance, scrollTo } = await renderTable({
        height: 200,
        scroll: { type: 'virtual', rowHeight: 48 },
      });

      instance.scrollToElement({ index: 3, top: 48, time: 60 });
      expect(scrollTo).toHaveBeenLastCalledWith({ top: 128, behavior: 'auto' });
      await vi.advanceTimersByTimeAsync(60);
      expect(scrollTo).toHaveBeenCalledTimes(2);
      expect(scrollTo).toHaveBeenLastCalledWith({ top: 128, behavior: 'auto' });
    });

    it.each([{}, { key: 999 }])('does not scroll for an unresolved row (%j)', async (target) => {
      vi.useFakeTimers();
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { instance, scrollTo, scrollBy } = await renderTable({
        height: 200,
        scroll: { type: 'virtual', rowHeight: 48, isFixedRowHeight: true },
      });

      instance.scrollToElement(target);

      expect(error).toHaveBeenCalled();
      expect(scrollTo).not.toHaveBeenCalled();
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it('keeps the target row aligned after a distant virtual scroll with measured heights', async () => {
      vi.useFakeTimers();
      const getRect = HTMLElement.prototype.getBoundingClientRect;
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        return { ...getRect.call(this), height: this.tagName === 'TR' ? 47 : 300, width: 600 };
      });
      const { instance, container, scrollTo } = await renderTable(
        {
          data: Array.from({ length: 400 }, (_, id) => ({ id })),
          height: 300,
          scroll: { type: 'virtual', rowHeight: 48 },
        },
        47,
      );
      scrollTo.mockImplementation(({ top }: ScrollToOptions) => {
        container.scrollTop = top;
        container.dispatchEvent(new Event('scroll'));
      });

      instance.scrollToElement({ index: 255, top: 47, time: 200 });
      await vi.advanceTimersByTimeAsync(350);

      const body = container.querySelector('tbody');
      const firstIndex = Number(body.querySelector('tr > td').textContent);
      const translateY = Number(body.style.transform.match(/translateY\(([-\d.]+)px\)/)[1]);
      const targetOffset = translateY + 47 + (255 - firstIndex) * 47 - container.scrollTop;
      expect(targetOffset).toBe(47);
    });
  });
});
