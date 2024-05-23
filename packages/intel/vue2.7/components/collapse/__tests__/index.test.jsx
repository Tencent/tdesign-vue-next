import { ref } from '@td/adapter-vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '../index';

describe('collapse', () => {
  describe(':props', () => {
    it(':borderless', async () => {
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

      const panel = wrapper.findComponent({ ref: '1' });

      expect(wrapper.classes()).not.toContain('t--border-less');

      borderless.value = true;
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).toContain('t--border-less');
    });

    it(':defaultExpandAll', async () => {
      const defaultExpandAll = ref(false);
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

    it(':disabled', async () => {
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

    it(':expandIcon', async () => {
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

    it(':expandIconPlacement', async () => {
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

    it(':expandMutex', async () => {
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

    it(':expandOnRowClick', async () => {
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

    it(':defaultValue', async () => {
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
  });

  describe('@event', () => {
    it('change', async () => {
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

describe('collapsePanel', () => {
  describe(':props', () => {
    it(':default、content、header、headerRightContent', async () => {
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

    it(':destroyOnCollapse', async () => {
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

    it(':disabled', async () => {
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

    it(':expandIcon', async () => {
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

    it(':value', async () => {
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
    it('default', () => {
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

    it('header', () => {
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

    it('headerRightContent', () => {
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

    it('content', () => {
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
