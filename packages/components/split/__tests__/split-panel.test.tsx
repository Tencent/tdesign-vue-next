import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { Split, SplitPanel } from '@tdesign/components/split';

beforeEach(() => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('SplitPanel', () => {
  describe('props', () => {
    it(':defaultSize[string/number]', async () => {
      const wrapper = mount(
        <Split>
          <SplitPanel defaultSize={100}>First</SplitPanel>
          <SplitPanel defaultSize="50%">Second</SplitPanel>
          <SplitPanel>Third</SplitPanel>
        </Split>,
      );
      await nextTick();
      const styles = wrapper.findAll('.t-split__panel').map((panel) => panel.attributes('style'));

      expect(styles[0]).toContain('100px');
      expect(styles[1]).toContain('300px');
      expect(styles[2]).toContain('200px');
    });

    it(':min[string/number] + :max[string/number]', async () => {
      const wrapper = mount(
        <Split>
          <SplitPanel min="40%" max={300}>
            First
          </SplitPanel>
          <SplitPanel>Second</SplitPanel>
        </Split>,
      );
      await nextTick();
      const separator = wrapper.get('.t-split__bar-inner');

      await separator.trigger('mousedown', { clientX: 300 });
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      await nextTick();
      expect(wrapper.findAll('.t-split__panel')[0].attributes('style')).toContain('240px');

      await separator.trigger('mousedown', { clientX: 240 });
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 400 }));
      document.dispatchEvent(new MouseEvent('mouseup'));
      await nextTick();
      expect(wrapper.findAll('.t-split__panel')[0].attributes('style')).toContain('300px');
    });

    it(':resizable[boolean]', async () => {
      const onResizeStart = vi.fn();
      const wrapper = mount(
        <Split onResizeStart={onResizeStart}>
          <SplitPanel resizable={false}>First</SplitPanel>
          <SplitPanel>Second</SplitPanel>
        </Split>,
      );
      await nextTick();
      const separator = wrapper.get('.t-split__bar-inner');

      expect(separator.attributes('tabindex')).toBe('-1');
      await separator.trigger('mousedown', { clientX: 300 });
      expect(onResizeStart).not.toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it('renders the default slot', () => {
      const wrapper = mount(SplitPanel, { slots: { default: () => <span class="panel-content">Content</span> } });

      expect(wrapper.get('.panel-content').text()).toBe('Content');
    });
  });
});
