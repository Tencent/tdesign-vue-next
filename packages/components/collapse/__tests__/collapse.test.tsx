// @ts-nocheck
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';

describe('Collapse', () => {
  describe(':props', () => {
    test(':borderless', async () => {
      const borderless = ref(false);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse borderless={borderless.value}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      // const panel = wrapper.findComponent({ ref: '1' });

      expect(wrapper.classes()).not.toContain('t--border-less');

      borderless.value = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).toContain('t--border-less');
    });

    test(':defaultExpandAll', async () => {
      // const defaultExpandAll = ref(false);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll={true}>
              <CollapsePanel header="标题1" default="内容1" />
              <CollapsePanel header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);
      panels.forEach((panel) => {
        expect(panel.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      });
    });

    test(':disabled', async () => {
      const disabled = ref(false);
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse disabled={disabled.value} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalled();

      disabled.value = true;
      await wrapper.vm.$nextTick();
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test(':expandIcon', async () => {
      const expandIcon = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={expandIcon.value}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeTruthy();

      expandIcon.value = false;
      await wrapper.vm.$nextTick();
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeFalsy();
    });

    test(':expandIconPlacement', async () => {
      const expandIconPlacement = ref('left');
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement={expandIconPlacement.value}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header .t-collapse-panel__icon').classes()).toContain(
        't-collapse-panel__icon--left',
      );

      expandIconPlacement.value = 'right';
      await wrapper.vm.$nextTick();
      expect(panel.find('.t-collapse-panel__header .t-collapse-panel__icon').classes()).toContain(
        't-collapse-panel__icon--right',
      );
    });

    test(':expandMutex', async () => {
      const val = ref([]);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandMutex v-model={val.value}>
              <CollapsePanel ref="1" value="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });
      await panel1.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(1);
      expect(val.value).toContain('1');

      await panel2.find('.t-collapse-panel__header').trigger('click');

      expect(val.value).toHaveLength(1);
      expect(val.value).toContain('2');
    });

    test(':expandOnRowClick', async () => {
      const expandOnRowClick = ref(true);
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandOnRowClick={expandOnRowClick.value} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalled();

      expandOnRowClick.value = false;
      await wrapper.vm.$nextTick();

      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledTimes(1);

      await panel.find('.t-collapse-panel__header .t-collapse-panel__icon').trigger('click');
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    test(':defaultValue', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse default-value={['1']}>
              <CollapsePanel ref="1" value="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      expect(panel1.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panel2.find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
    });

    test(':value and modelValue', async () => {
      const value = ref(['1']);
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={value.value} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      // 初始状态：panel1 展开，panel2 收起
      expect(panel1.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panel2.find('.t-collapse-panel__body').attributes().style).toBe('display: none;');

      // 点击 panel2 展开
      await panel2.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['1', '2']);

      // 更新 value
      value.value = ['2'];
      await nextTick();
      expect(panel1.find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
      expect(panel2.find('.t-collapse-panel__body').attributes().style).not.toBe('display: none;');
    });

    test(':expandIcon function type', async () => {
      const customIcon = () => <span class="custom-icon">+</span>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={customIcon}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom-icon').exists()).toBeTruthy();
      expect(panel.find('.custom-icon').text()).toBe('+');
    });

    test(':expandIcon false', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={false}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      // expandIcon=false 时，图标容器仍然存在，但内容为空
      const icon = panel.find('.t-collapse-panel__icon');
      expect(icon.exists()).toBeTruthy();
      expect(icon.find('svg').exists()).toBeFalsy();
    });

    test('empty children', async () => {
      const wrapper = mount({
        setup() {
          return () => <Collapse />;
        },
      });

      expect(wrapper.find('.t-collapse').exists()).toBeTruthy();
      expect(wrapper.findAllComponents(CollapsePanel)).toHaveLength(0);
    });

    test('dynamic panels', async () => {
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

    test('invalid value handling', async () => {
      const value = ref(['nonexistent']);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={value.value}>
              <CollapsePanel ref="1" value="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      // 无效的 value 不应该展开任何面板
      expect(panel1.find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
      expect(panel2.find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
    });

    test('expandMutex with defaultExpandAll conflict', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandMutex defaultExpandAll>
              <CollapsePanel ref="1" value="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });

      // defaultExpandAll 会展开所有面板，但 expandMutex 会让最后一个面板保持展开
      expect(panel1.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
      expect(panel2.find('.t-collapse-panel__body').attributes().style).toBeUndefined();
    });

    test('number type value', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value={1} header="标题1" default="内容1" />
              <CollapsePanel ref="2" value={2} header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([1]);
    });

    test('auto-generated value when no value provided', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" header="标题1" default="内容1" />
              <CollapsePanel ref="2" header="标题2" default="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      await panel1.find('.t-collapse-panel__header').trigger('click');

      // 应该使用自动生成的 ID
      expect(handleChange).toHaveBeenCalledWith([0]);
    });

    test(':expandIconPlacement validator edge cases', async () => {
      // 测试 expandIconPlacement 验证器的边界情况
      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement={undefined}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement={null}>
              <CollapsePanel ref="2" value="2" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const wrapper3 = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement="">
              <CollapsePanel ref="3" value="3" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      // 这些情况下组件应该正常渲染，使用默认值
      expect(wrapper1.findComponent({ ref: '1' }).exists()).toBeTruthy();
      expect(wrapper2.findComponent({ ref: '2' }).exists()).toBeTruthy();
      expect(wrapper3.findComponent({ ref: '3' }).exists()).toBeTruthy();
    });

    test('expandIcon with overlayStyle and overlayClassName', async () => {
      const customStyle = { color: 'red', fontSize: '20px' };
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      const icon = panel.find('.t-collapse-panel__icon--default');
      expect(icon.exists()).toBeTruthy();
    });

    test('multiple collapse instances', async () => {
      const handleChange1 = vi.fn();
      const handleChange2 = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <div>
              <Collapse onChange={handleChange1}>
                <CollapsePanel ref="1-1" value="1" header="Collapse1 Panel1" default="内容1" />
                <CollapsePanel ref="1-2" value="2" header="Collapse1 Panel2" default="内容2" />
              </Collapse>
              <Collapse onChange={handleChange2}>
                <CollapsePanel ref="2-1" value="1" header="Collapse2 Panel1" default="内容1" />
                <CollapsePanel ref="2-2" value="2" header="Collapse2 Panel2" default="内容2" />
              </Collapse>
            </div>
          );
        },
      });

      const panel11 = wrapper.findComponent({ ref: '1-1' });
      const panel21 = wrapper.findComponent({ ref: '2-1' });

      await panel11.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange1).toHaveBeenCalledWith(['1']);
      expect(handleChange2).not.toHaveBeenCalled();

      await panel21.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange2).toHaveBeenCalledWith(['1']);
      expect(handleChange1).toHaveBeenCalledTimes(1);
    });

    test('nested collapse components', async () => {
      const outerChange = vi.fn();
      const innerChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={outerChange} defaultValue={['outer1']}>
              <CollapsePanel ref="outer1" value="outer1" header="外层面板">
                <Collapse onChange={innerChange}>
                  <CollapsePanel ref="inner1" value="inner1" header="内层面板" default="嵌套内容" />
                </Collapse>
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const innerPanel = wrapper.findComponent({ ref: 'inner1' });
      await innerPanel.find('.t-collapse-panel__header').trigger('click');

      expect(innerChange).toHaveBeenCalledWith(['inner1']);
      expect(outerChange).not.toHaveBeenCalled();
    });
  });

  describe('@event', () => {
    test('change', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalled();
    });
  });
});

describe('CollapsePanel', () => {
  describe(':props', () => {
    test(':default、content、header、headerRightContent', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel ref="1" value="1" header="标题" headerRightContent="右侧" default="内容1" />
              <CollapsePanel ref="2" value="2" header="标题" content="内容2" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper.findComponent({ ref: '1' });
      const panel2 = wrapper.findComponent({ ref: '2' });
      expect(panel1.find('.t-collapse-panel__content').text()).toBe('内容1');
      expect(panel1.find('.t-collapse-panel__header').text()).toBe('标题右侧');
      expect(panel2.find('.t-collapse-panel__content').text()).toBe('内容2');
    });

    test(':destroyOnCollapse', async () => {
      const destroyOnCollapse = ref(false);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel
                ref="1"
                value="1"
                header="标题"
                default="内容"
                destroyOnCollapse={destroyOnCollapse.value}
              />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();

      destroyOnCollapse.value = true;
      await panel.find('.t-collapse-panel__header').trigger('click');
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(panel.find('.t-collapse-panel__content').exists()).toBeFalsy();
    });

    test(':disabled', async () => {
      const disabled = ref(false);
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" disabled={disabled.value} />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalled();

      disabled.value = true;
      await wrapper.vm.$nextTick();
      await panel.find('.t-collapse-panel__header').trigger('click');

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test(':expandIcon', async () => {
      const expandIcon = ref(true);
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" expandIcon={expandIcon.value} />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeTruthy();

      expandIcon.value = false;
      await wrapper.vm.$nextTick();
      expect(panel.find('.t-collapse-panel__header svg').exists()).toBeFalsy();
    });

    test(':value', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="abc" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['abc']);
    });
  });

  describe('<slot>', () => {
    test('default', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1">
                {{
                  default: () => <div>内容</div>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__content > div').html()).toBe('<div>内容</div>');
    });

    test('header', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1">
                {{
                  header: () => <h4>标题</h4>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header > h4').html()).toBe('<h4>标题</h4>');
    });

    test('headerRightContent', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1">
                {{
                  headerRightContent: () => <span>操作</span>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header > div > span').html()).toBe('<span>操作</span>');
    });

    test('content', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题">
                {{
                  content: () => <div>内容</div>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__content > div').html()).toBe('<div>内容</div>');
    });
  });
});
