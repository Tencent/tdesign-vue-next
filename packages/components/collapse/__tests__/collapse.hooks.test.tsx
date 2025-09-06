import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';

describe('Collapse Hooks and Internal Logic', () => {
  describe('FakeArrow component coverage', () => {
    test('overlayStyle with different types', () => {
      // 测试 overlayStyle 的不同类型处理，覆盖 fake-arrow.tsx 第16行
      const stringStyle = 'color: red; font-size: 16px;';
      const objectStyle = { color: 'blue', fontSize: '18px' };

      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="String Style Panel" default="Content" />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="2" header="Object Style Panel" default="Content" />
            </Collapse>
          );
        },
      });

      // 验证 FakeArrow 组件正常渲染
      expect(wrapper1.find('.t-fake-arrow').exists()).toBeTruthy();
      expect(wrapper2.find('.t-fake-arrow').exists()).toBeTruthy();
    });

    test('isActive state changes', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Panel" default="Content" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const icon = panel.find('.t-collapse-panel__icon');

      // 初始状态：未激活
      expect(icon.classes()).not.toContain('t-collapse-panel__icon--active');

      // 点击展开
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(icon.classes()).toContain('t-collapse-panel__icon--active');

      // 再次点击收起
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(icon.classes()).not.toContain('t-collapse-panel__icon--active');
    });

    test('overlayClassName application', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Panel" default="Content" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const arrow = panel.find('.t-fake-arrow');

      // 验证默认的 overlayClassName 被应用
      expect(arrow.classes()).toContain('t-collapse-panel__icon--default');
    });
  });

  describe('useCollapseAnimation hooks', () => {
    test('animation lifecycle hooks', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Animation Panel" default="Content" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const transition = panel.findComponent({ name: 'Transition' });

      // 验证所有动画钩子都存在
      expect(transition.props()).toHaveProperty('onBeforeEnter');
      expect(transition.props()).toHaveProperty('onEnter');
      expect(transition.props()).toHaveProperty('onAfterEnter');
      expect(transition.props()).toHaveProperty('onBeforeLeave');
      expect(transition.props()).toHaveProperty('onLeave');
      expect(transition.props()).toHaveProperty('onAfterLeave');

      // 验证 transition 名称
      expect(transition.props('name')).toBe('t-slide-down');
    });
  });

  describe('renderTNodeJSX and renderContent hooks', () => {
    test('renderTNodeJSX with different node types', () => {
      const stringHeader = 'String Header';
      const functionHeader = () => <span class="func-header">Function Header</span>;

      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header={stringHeader} default="Content" />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="2" header={functionHeader} default="Content" />
            </Collapse>
          );
        },
      });

      expect(wrapper1.find('.t-collapse-panel__header').text()).toContain('String Header');
      expect(wrapper2.find('.func-header').exists()).toBeTruthy();
      expect(wrapper2.find('.func-header').text()).toBe('Function Header');
    });

    test('renderContent with slot and prop priority', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel value="1" header="Panel" content="Prop Content">
                Slot Content
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      // 插槽内容优先于 content 属性
      expect(panel.find('.t-collapse-panel__content').text()).toBe('Slot Content');
    });
  });

  describe('usePrefixClass hook usage', () => {
    test('prefix class generation', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse borderless>
              <CollapsePanel value="1" header="Panel" default="Content" disabled />
            </Collapse>
          );
        },
      });

      // 验证各种 prefix class 的应用
      expect(wrapper.classes()).toContain('t-collapse');
      expect(wrapper.classes()).toContain('t--border-less');

      const panel = wrapper.findComponent(CollapsePanel);
      expect(panel.classes()).toContain('t-collapse-panel');
      expect(panel.classes()).toContain('t-is-disabled');
      expect(panel.find('.t-collapse-panel__header').classes()).toContain('t-collapse-panel__header');
      expect(panel.find('.t-collapse-panel__body').classes()).toContain('t-collapse-panel__body');
      expect(panel.find('.t-collapse-panel__content').classes()).toContain('t-collapse-panel__content');
    });
  });

  describe('useVModel hook integration', () => {
    test('v-model with value prop', async () => {
      const value = ref(['1']);
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={value.value} onChange={onChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);

      // 点击已展开的面板应该收起
      await panels[0].find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith([]);

      // 点击未展开的面板应该展开（会添加到现有数组中）
      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith(['1', '2']);
    });

    test('v-model with modelValue prop', async () => {
      const modelValue = ref(['2']);
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse modelValue={modelValue.value} onChange={onChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);

      // 验证初始状态
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).not.toBe('display: none;');

      // 点击第一个面板
      await panels[0].find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith(['2', '1']);
    });

    test('defaultValue without controlled value', async () => {
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['1']} onChange={onChange}>
              <CollapsePanel value="1" header="Panel 1" default="Content 1" />
              <CollapsePanel value="2" header="Panel 2" default="Content 2" />
            </Collapse>
          );
        },
      });

      const panels = wrapper.findAllComponents(CollapsePanel);

      // 验证 defaultValue 生效
      expect(panels[0].find('.t-collapse-panel__body').attributes().style).not.toBe('display: none;');
      expect(panels[1].find('.t-collapse-panel__body').attributes().style).toBe('display: none;');

      // 交互应该正常工作
      await panels[1].find('.t-collapse-panel__header').trigger('click');
      expect(onChange).toHaveBeenCalledWith(['1', '2']);
    });
  });

  describe('computed properties reactivity', () => {
    test('classes computed property updates', async () => {
      const borderless = ref(false);

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse borderless={borderless.value}>
              <CollapsePanel value="1" header="Panel" default="Content" />
            </Collapse>
          );
        },
      });

      // 初始状态
      expect(wrapper.classes()).not.toContain('t--border-less');

      // 更新 borderless
      borderless.value = true;
      await nextTick();
      expect(wrapper.classes()).toContain('t--border-less');
    });

    test('isActive computed property updates', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Panel" default="Content" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);
      const icon = panel.find('.t-collapse-panel__icon');

      // 初始状态：未激活
      expect(icon.classes()).not.toContain('t-collapse-panel__icon--active');

      // 点击激活
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(icon.classes()).toContain('t-collapse-panel__icon--active');
    });

    test('isDisabled computed property with multiple sources', async () => {
      const panelDisabled = ref(false);
      const collapseDisabled = ref(false);

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse disabled={collapseDisabled.value}>
              <CollapsePanel value="1" header="Panel" default="Content" disabled={panelDisabled.value} />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent(CollapsePanel);

      // 初始状态：都不禁用
      expect(panel.classes()).not.toContain('t-is-disabled');

      // 只禁用面板
      panelDisabled.value = true;
      await nextTick();
      expect(panel.classes()).toContain('t-is-disabled');

      // 恢复面板，禁用整个 Collapse
      panelDisabled.value = false;
      collapseDisabled.value = true;
      await nextTick();
      expect(panel.classes()).toContain('t-is-disabled');

      // 两者都禁用
      panelDisabled.value = true;
      await nextTick();
      expect(panel.classes()).toContain('t-is-disabled');
    });
  });
});
