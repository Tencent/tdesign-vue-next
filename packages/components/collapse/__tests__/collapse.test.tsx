import { nextTick, ref } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';
import collapseProps from '@tdesign/components/collapse/props';

describe('Collapse', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Collapse>> | null = null;
    beforeEach(() => {
      wrapper = mount(
        <Collapse>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      ) as VueWrapper<InstanceType<typeof Collapse>>;
    });

    it(':borderless[boolean]', async () => {
      expect(wrapper.classes()).not.toContain('t--border-less');
      await wrapper.setProps({ borderless: true });
      expect(wrapper.classes()).toContain('t--border-less');
    });

    it(':defaultExpandAll[boolean]', async () => {
      const wrapper = mount(
        <Collapse defaultExpandAll>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);
      panels.forEach((panel) => {
        expect(panel.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      });
    });

    it(':disabled[boolean]', async () => {
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse onChange={handleChange}>
          <CollapsePanel value="1" header="标题" default="内容" />
        </Collapse>,
      );
      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalled();
      await wrapper.setProps({ disabled: true });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it(':expandIcon[boolean/function]', async () => {
      const wrapper = mount(
        <Collapse>
          <CollapsePanel value="1" header="标题" default="内容" />
        </Collapse>,
      );
      const panel = wrapper.findComponent(CollapsePanel);
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeTruthy();
      await wrapper.setProps({ expandIcon: false });
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeFalsy();
      const customIcon = () => <span class="custom-icon">+</span>;
      await wrapper.setProps({ expandIcon: customIcon });
      expect(panel.find('.custom-icon').exists()).toBeTruthy();
      expect(panel.find('.custom-icon').text()).toBe('+');
    });

    it(':expandIconPlacement[left/right]', async () => {
      const validator = collapseProps.expandIconPlacement.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error
      expect(validator('other')).toBe(false);

      const panel = wrapper.findComponent(CollapsePanel);
      expect(panel.find('.t-collapse-panel__header .t-collapse-panel__icon').classes()).toContain(
        't-collapse-panel__icon--left',
      );

      await wrapper.setProps({ expandIconPlacement: 'right' });
      expect(panel.find('.t-collapse-panel__header .t-collapse-panel__icon').classes()).toContain(
        't-collapse-panel__icon--right',
      );
    });

    it(':expandMutex[boolean]', async () => {
      const value = ref([]);
      const wrapper = mount(
        <Collapse expandMutex v-model={value.value}>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);
      await panels[0].find('.t-collapse-panel__header').trigger('click');

      expect(value.value).toHaveLength(1);
      expect(value.value).toContain('1');

      await panels[1].find('.t-collapse-panel__header').trigger('click');

      expect(value.value).toHaveLength(1);
      expect(value.value).toContain('2');
    });

    it(':expandOnRowClick[boolean]', async () => {
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse onChange={handleChange}>
          <CollapsePanel value="1" header="标题" default="内容" />
        </Collapse>,
      );

      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalled();

      await wrapper.setProps({ expandOnRowClick: false });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledTimes(1);

      await panel.find('.t-collapse-panel__header .t-collapse-panel__icon').trigger('click');
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it(':defaultValue[array]', async () => {
      const wrapper = mount(
        <Collapse defaultValue={['1']}>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
    });

    it(':value[array]', async () => {
      const value = ref(['1']);
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse value={value.value} onChange={handleChange}>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);

      // 初始状态：panel1 展开，panel2 收起
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');

      // 点击 panel2 展开
      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['1', '2']);

      wrapper.setProps({ value: ['2'] });
      await nextTick();
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).not.toBe('display: none;');
    });
  });

  describe('events', () => {
    it('change', async () => {
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse onChange={handleChange}>
          <CollapsePanel value="1" header="标题" default="内容" />
        </Collapse>,
      );

      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['1']);
    });
  });

  describe('edge cases', () => {
    it('empty children', async () => {
      const wrapper = mount(<Collapse />);
      expect(wrapper.find('.t-collapse').exists()).toBeTruthy();
      expect(wrapper.findAllComponents(CollapsePanel)).toHaveLength(0);
    });

    it('dynamic panels', async () => {
      const panels = ref([
        { value: '1', header: '标题1', content: '内容1' },
        { value: '2', header: '标题2', content: '内容2' },
      ]);
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              {panels.value.map((panel) => (
                <CollapsePanel key={panel.value} value={panel.value} header={panel.header} default={panel.content} />
              ))}
            </Collapse>
          );
        },
      });

      expect(wrapper.findAllComponents(CollapsePanel)).toHaveLength(2);

      // 动态添加面板
      panels.value.push({ value: '3', header: '标题3', content: '内容3' });
      await nextTick();
      expect(wrapper.findAllComponents(CollapsePanel)).toHaveLength(3);

      // 动态删除面板
      panels.value.splice(0, 1);
      await nextTick();
      expect(wrapper.findAllComponents(CollapsePanel)).toHaveLength(2);
    });

    it('invalid value handling', async () => {
      const value = ref(['nonexistent']);
      const wrapper = mount(
        <Collapse value={value.value}>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);

      // 无效的 value 不应该展开任何面板
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
    });

    it('expandMutex with defaultExpandAll conflict', async () => {
      const wrapper = mount(
        <Collapse expandMutex defaultExpandAll>
          <CollapsePanel value="1" header="标题1" default="内容1" />
          <CollapsePanel value="2" header="标题2" default="内容2" />
        </Collapse>,
      );

      const panels = wrapper.findAllComponents(CollapsePanel);

      // defaultExpandAll 会展开所有面板，但 expandMutex 会让最后一个面板保持展开
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).toBeUndefined();
    });

    it('number type value', async () => {
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse onChange={handleChange}>
          <CollapsePanel value={1} header="标题1" default="内容1" />
          <CollapsePanel value={2} header="标题2" default="内容2" />
        </Collapse>,
      );

      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([1]);
    });

    it('auto-generated value when no value provided', async () => {
      const handleChange = vi.fn();
      const wrapper = mount(
        <Collapse onChange={handleChange}>
          <CollapsePanel header="标题1" default="内容1" />
          <CollapsePanel header="标题2" default="内容2" />
        </Collapse>,
      );

      const panel = wrapper.findComponent(CollapsePanel);
      await panel.find('.t-collapse-panel__header').trigger('click');

      // 应该使用自动生成的 ID
      expect(handleChange).toHaveBeenCalledWith([0]);
    });

    it('multiple collapse instances', async () => {
      const handleChange1 = vi.fn();
      const handleChange2 = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <div>
              <Collapse onChange={handleChange1}>
                <CollapsePanel value="1" header="Collapse1 Panel1" default="内容1" />
                <CollapsePanel value="2" header="Collapse1 Panel2" default="内容2" />
              </Collapse>
              <Collapse onChange={handleChange2}>
                <CollapsePanel value="1" header="Collapse2 Panel1" default="内容1" />
                <CollapsePanel value="2" header="Collapse2 Panel2" default="内容2" />
              </Collapse>
            </div>
          );
        },
      });

      const collapses = wrapper.findAllComponents(Collapse);
      const panel11 = collapses[0].findComponent(CollapsePanel);
      const panel21 = collapses[1].findComponent(CollapsePanel);

      await panel11.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange1).toHaveBeenCalledWith(['1']);
      expect(handleChange2).not.toHaveBeenCalled();

      await panel21.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange2).toHaveBeenCalledWith(['1']);
      expect(handleChange1).toHaveBeenCalledTimes(1);
    });

    it('nested collapse components', async () => {
      const outerChange = vi.fn();
      const innerChange = vi.fn();

      const wrapper = mount(
        <Collapse onChange={outerChange} defaultValue={['outer1']}>
          <CollapsePanel value="outer1" header="外层面板">
            <Collapse onChange={innerChange}>
              <CollapsePanel value="inner1" header="内层面板" default="嵌套内容" />
            </Collapse>
          </CollapsePanel>
        </Collapse>,
      );

      const innerPanel = wrapper.findAllComponents(CollapsePanel)[1];
      await innerPanel.find('.t-collapse-panel__header').trigger('click');

      expect(innerChange).toHaveBeenCalledWith(['inner1']);
      expect(outerChange).not.toHaveBeenCalled();
    });
  });
});
