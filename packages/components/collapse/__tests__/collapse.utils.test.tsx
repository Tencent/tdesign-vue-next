import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';

describe('Collapse Utils and Edge Cases', () => {
  describe('getUniqId function', () => {
    test('generates unique incremental ids', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel header="Panel 1" default="Content 1" />
              <CollapsePanel header="Panel 2" default="Content 2" />
              <CollapsePanel header="Panel 3" default="Content 3" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);
      await panels[0].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0]);

      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0, 1]);

      await panels[2].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0, 1, 2]);
    });

    test('maintains id consistency across re-renders', async () => {
      const showThirdPanel = ref(false);
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel header="Panel 1" default="Content 1" />
              <CollapsePanel header="Panel 2" default="Content 2" />
              {showThirdPanel.value && <CollapsePanel header="Panel 3" default="Content 3" />}
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findAllComponents(CollapsePanel)[0];
      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0]);

      showThirdPanel.value = true;
      await nextTick();

      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('updateCollapseValue function edge cases', () => {
    test('handles duplicate values correctly', async () => {
      const value = ref(['1', '1']);
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={value.value} onChange={handleChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findAllComponents(CollapsePanel)[0];
      await panel1.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalledWith(['1']);
    });

    test('handles mixed string and number values', async () => {
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel value="string1" header="String Panel" default="Content 1" />
              <CollapsePanel value={123} header="Number Panel" default="Content 2" />
              <CollapsePanel value="456" header="String Number Panel" default="Content 3" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);

      await panels[0].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['string1']);

      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['string1', 123]);

      await panels[2].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['string1', 123, '456']);
    });

    test('expandMutex with existing values', async () => {
      const value = ref(['1', '2']);
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandMutex value={value.value} onChange={handleChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" />
              <CollapsePanel value="3" header="Panel 3" default="Content 3" />
            </Collapse>
          );
        },
      });

      const panel3 = wrapper.findAllComponents(CollapsePanel)[2];
      await panel3.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalledWith(['3']);
    });
  });

  describe('provide/inject mechanism', () => {
    test('child components receive correct injected values', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement="right" expandOnRowClick={false} disabled={true} defaultExpandAll={true}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);

      expect(panel.find('.t-collapse-panel__icon--right').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__header').classes()).not.toContain('t-is-clickable');
      expect(panel.classes()).toContain('t-is-disabled');
    });

    test('renderParentTNode injection works correctly', () => {
      const customExpandIcon = () => <span class="parent-custom-icon">📁</span>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={customExpandIcon}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });
      const panel = wrapper.findComponent(CollapsePanel);
      expect(panel.find('.parent-custom-icon').exists()).toBeTruthy();
      expect(panel.find('.parent-custom-icon').text()).toBe('📁');
    });
  });

  describe('event handling edge cases', () => {
    test('stopPropagation on panel click', async () => {
      const parentClick = vi.fn();
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <div onClick={parentClick}>
              <Collapse onChange={handleChange}>
                <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              </Collapse>
            </div>
          );
        },
      });
      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalled();
      expect(parentClick).not.toHaveBeenCalled();
    });

    test('icon click when expandOnRowClick is false', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandOnRowClick={false} onChange={handleChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });
      const panel = wrapper.findComponent(CollapsePanel);
      const header = panel.find('.t-collapse-panel__header');
      const icon = panel.find('.t-collapse-panel__icon');
      await header.trigger('click');
      expect(handleChange).not.toHaveBeenCalled();
      await icon.trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['1']);
    });
  });

  describe('CSS classes and styling', () => {
    test('borderless class application', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse borderless>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });

      expect(wrapper.classes()).toContain('t--border-less');
    });

    test('active icon class application', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['1']}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const icon = panel.find('.t-collapse-panel__icon');
      expect(icon.classes()).toContain('t-collapse-panel__icon--active');
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(icon.classes()).not.toContain('t-collapse-panel__icon--active');
    });

    test('disabled class inheritance', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse disabled>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" disabled={false} />
            </Collapse>
          );
        },
      });
      const panels = wrapper.findAllComponents(CollapsePanel);
      expect(panels[0].classes()).toContain('t-is-disabled');
      expect(panels[1].classes()).toContain('t-is-disabled');
    });
  });

  describe('render function edge cases', () => {
    test('empty slots and props', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" />
            </Collapse>
          );
        },
      });
      const panel = wrapper.findComponent(CollapsePanel);
      expect(panel.exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__header').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();
    });

    test('renderIcon with different expandIconPlacement', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement="right">
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const header = panel.find('.t-collapse-panel__header');
      const icons = header.findAll('.t-collapse-panel__icon');
      expect(icons).toHaveLength(1);
      expect(icons[0].classes()).toContain('t-collapse-panel__icon--right');
    });

    test('renderHeaderRightContent with null content', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Panel 1" headerRightContent={null} default="Content 1" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const header = panel.find('.t-collapse-panel__header');
      expect(header.findAll('div')).toHaveLength(2);
      expect(header.find('.t-collapse-panel__header--blank').exists()).toBeTruthy();
    });
  });
});
