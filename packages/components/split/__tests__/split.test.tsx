import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Split, SplitPanel } from '@tdesign/components/split';

const getPanelSizes = (wrapper: ReturnType<typeof mount>) =>
  wrapper
    .findAll('.t-split__panel')
    .map((panel) => Number.parseFloat(panel.attributes('style').match(/0(?:px)? 0(?:px)? ([\d.]+)px/)?.[1] || '0'));

const mountSplit = (props = {}) =>
  mount(
    <Split {...props}>
      <SplitPanel>First</SplitPanel>
      <SplitPanel>Second</SplitPanel>
    </Split>,
  );

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(400);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Split', () => {
  describe('props', () => {
    it(':direction[string]', async () => {
      const wrapper = mountSplit({ direction: 'vertical' });
      await nextTick();

      expect(wrapper.classes()).toContain('t-split--vertical');
      expect(getPanelSizes(wrapper)).toEqual([200, 200]);
      expect(wrapper.get('[role="separator"]').attributes('aria-orientation')).toBe('horizontal');
    });

    it(':gap[number] + :splitSize[number]', async () => {
      const wrapper = mountSplit({ gap: 12, splitSize: 20 });
      await nextTick();

      expect(wrapper.get('.t-split__bar').attributes('style')).toContain('width: 12px');
      expect(wrapper.get('.t-split__bar-inner').attributes('style')).toContain('width: 20px');
      expect(getPanelSizes(wrapper)).toEqual([294, 294]);
    });

    it(':splitClassName[string] + :splitStyle[object]', () => {
      const wrapper = mountSplit({ splitClassName: 'custom-split', splitStyle: { backgroundColor: 'red' } });
      const bar = wrapper.get('.t-split__bar');

      expect(bar.classes()).toContain('custom-split');
      expect(bar.attributes('style')).toContain('background-color: red');
    });

    it(':draggerIcon[string/function]', () => {
      const stringWrapper = mountSplit({ draggerIcon: 'drag' });
      expect(stringWrapper.get('.t-split__dragger').text()).toBe('drag');

      const functionWrapper = mountSplit({ draggerIcon: () => <span class="custom-dragger">D</span> });
      expect(functionWrapper.get('.custom-dragger').text()).toBe('D');
    });

    it(':panelSize[object]', async () => {
      const wrapper = mountSplit({ panelSize: { min: 250, max: 350 } });
      await nextTick();
      const separator = wrapper.get('.t-split__bar-inner');

      await separator.trigger('mousedown', { clientX: 300 });
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 500 }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      await nextTick();

      expect(getPanelSizes(wrapper)).toEqual([350, 250]);
    });

    it(':lazy[boolean]', async () => {
      const wrapper = mountSplit({ lazy: true });
      await nextTick();
      const separator = wrapper.get('.t-split__bar-inner');

      await separator.trigger('mousedown', { clientX: 300 });
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 350 }));
      await nextTick();
      expect(getPanelSizes(wrapper)).toEqual([300, 300]);
      expect(wrapper.get('.t-split__bar').attributes('style')).toContain('translateX(50px)');

      document.dispatchEvent(new MouseEvent('mouseup'));
      await nextTick();
      expect(getPanelSizes(wrapper)).toEqual([350, 250]);
    });
  });

  describe('events', () => {
    it('emits resize lifecycle callbacks with pixel sizes', async () => {
      const onResizeStart = vi.fn();
      const onResize = vi.fn();
      const onResizeEnd = vi.fn();
      const wrapper = mountSplit({ onResizeStart, onResize, onResizeEnd });
      await nextTick();

      await wrapper.get('.t-split__bar-inner').trigger('mousedown', { clientX: 300 });
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 340 }));
      document.dispatchEvent(new MouseEvent('mouseup'));

      expect(onResizeStart).toHaveBeenCalledWith([300, 300]);
      expect(onResize).toHaveBeenCalledWith([340, 260]);
      expect(onResizeEnd).toHaveBeenCalledWith([340, 260]);
    });
  });

  describe('slots', () => {
    it('renders draggerIcon slot', () => {
      const wrapper = mount(Split, {
        slots: {
          default: () => [<SplitPanel>First</SplitPanel>, <SplitPanel>Second</SplitPanel>],
          draggerIcon: () => <span class="slot-dragger">Slot</span>,
        },
      });

      expect(wrapper.get('.slot-dragger').text()).toBe('Slot');
    });
  });

  describe('instanceFunctions', () => {
    it('supports getSizes, setSizes and reset', async () => {
      const wrapper = mountSplit();
      await nextTick();
      const instance = wrapper.vm as unknown as {
        getSizes: () => number[];
        setSizes: (sizes: (number | string | 'auto')[]) => void;
        reset: () => void;
      };

      expect(instance.getSizes()).toEqual([300, 300]);
      instance.setSizes(['25%', 'auto']);
      await nextTick();
      expect(instance.getSizes()).toEqual([150, 450]);

      instance.reset();
      await nextTick();
      expect(instance.getSizes()).toEqual([300, 300]);
    });
  });

  describe('scenarios', () => {
    describe('keyboard interaction', () => {
      it('resizes horizontal panels with arrow keys', async () => {
        const onResize = vi.fn();
        const wrapper = mountSplit({ onResize });
        await nextTick();

        await wrapper.get('.t-split__bar-inner').trigger('keydown', { key: 'ArrowRight' });

        expect(getPanelSizes(wrapper)).toEqual([310, 290]);
        expect(onResize).toHaveBeenCalledWith([310, 290]);
      });
    });
  });
});
