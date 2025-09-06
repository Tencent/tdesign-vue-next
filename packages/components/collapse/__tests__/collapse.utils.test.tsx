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

      // 点击第一个面板
      await panels[0].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0]);

      // 点击第二个面板
      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0, 1]);

      // 点击第三个面板
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

      // 点击第一个面板
      const panel1 = wrapper.findAllComponents(CollapsePanel)[0];
      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0]);

      // 显示第三个面板
      showThirdPanel.value = true;
      await nextTick();

      // 再次点击第一个面板（应该移除）
      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([]);
    });
  });

  describe('updateCollapseValue function edge cases', () => {
    test('handles duplicate values correctly', async () => {
      const value = ref(['1', '1']); // 重复值
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

      // 应该只移除第一个匹配的值
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

      // expandMutex 模式下应该只保留新点击的面板
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

      // 验证子组件接收到正确的配置
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

      // 点击整行不应该触发
      await header.trigger('click');
      expect(handleChange).not.toHaveBeenCalled();

      // 点击图标应该触发
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

      // 收起后应该移除 active 类
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

      // 第一个面板继承父组件的 disabled
      expect(panels[0].classes()).toContain('t-is-disabled');

      // 第二个面板虽然设置了 disabled=false，但父组件的 disabled 仍然生效
      // 因为 isDisabled = computed(() => disabled.value || disableAll.value)
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

      // 应该只有一个图标，且在右侧
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

      // headerRightContent 为 null 时，仍然会有 blank div 和 icon div
      expect(header.findAll('div')).toHaveLength(2); // blank div + icon div
      expect(header.find('.t-collapse-panel__header--blank').exists()).toBeTruthy();
    });
  });
});
