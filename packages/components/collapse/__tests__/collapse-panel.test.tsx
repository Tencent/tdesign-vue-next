// @ts-nocheck
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';

describe('CollapsePanel', () => {
  describe(':props', () => {
    test(':content and default priority', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel ref="1" value="1" header="标题" content="content prop" default="default prop" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      // default 属性优先级高于 content 属性
      expect(panel.find('.t-collapse-panel__content').text()).toBe('default prop');
    });

    test(':content function type', async () => {
      const contentFn = () => <div class="custom-content">Function Content</div>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel ref="1" value="1" header="标题" content={contentFn} />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom-content').exists()).toBeTruthy();
      expect(panel.find('.custom-content').text()).toBe('Function Content');
    });

    test(':header function type', async () => {
      const headerFn = () => <h3 class="custom-header">Custom Header</h3>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header={headerFn} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom-header').exists()).toBeTruthy();
      expect(panel.find('.custom-header').text()).toBe('Custom Header');
    });

    test(':headerRightContent function type', async () => {
      const rightContentFn = () => <button class="custom-btn">操作</button>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" headerRightContent={rightContentFn} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom-btn').exists()).toBeTruthy();
      expect(panel.find('.custom-btn').text()).toBe('操作');
    });

    test(':expandIcon function type', async () => {
      const customIcon = () => <i class="custom-expand-icon">→</i>;
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" expandIcon={customIcon} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom-expand-icon').exists()).toBeTruthy();
      expect(panel.find('.custom-expand-icon').text()).toBe('→');
    });

    test(':expandIcon priority over parent', async () => {
      const parentIcon = () => <span class="parent-icon">P</span>;
      const panelIcon = () => <span class="panel-icon">C</span>;

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={parentIcon}>
              <CollapsePanel ref="1" value="1" header="标题" expandIcon={panelIcon} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.panel-icon').exists()).toBeTruthy();
      expect(panel.find('.parent-icon').exists()).toBeFalsy();
    });

    test(':disabled priority over parent', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse disabled={false} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" disabled={true} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.classes()).toContain('t-is-disabled');

      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).not.toHaveBeenCalled();
    });

    test(':value number type', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value={123} header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([123]);
    });

    test(':destroyOnCollapse behavior', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['1']}>
              <CollapsePanel ref="1" value="1" header="标题" destroyOnCollapse={true} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 初始展开状态，内容存在
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();

      // 收起面板
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      // destroyOnCollapse=true 时，内容应该被销毁
      expect(panel.find('.t-collapse-panel__content').exists()).toBeFalsy();

      // 再次展开
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      // 内容重新创建
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();
    });

    test(':destroyOnCollapse returns null when collapsed', async () => {
      // 测试 renderBodyDestroyOnCollapse 返回 null 的分支，覆盖 collapse-panel.tsx 第128行
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" destroyOnCollapse={true} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 初始状态：收起，destroyOnCollapse=true 时应该返回 null
      expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeFalsy();

      // 展开面板
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      // 展开后内容存在
      expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();

      // 再次收起
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      // 收起后又返回 null
      expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeFalsy();
    });

    test(':destroyOnCollapse edge case - multiple state changes', async () => {
      // 测试 destroyOnCollapse 的边界情况，确保覆盖所有条件分支
      const destroyOnCollapse = ref(false);
      const isActive = ref(false);

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={isActive.value ? ['1'] : []}>
              <CollapsePanel
                ref="1"
                value="1"
                header="标题"
                destroyOnCollapse={destroyOnCollapse.value}
                default="内容"
              />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 初始状态：destroyOnCollapse=false, isActive=false
      expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__body').attributes('style')).toBe('display: none;');

      // 切换到 destroyOnCollapse=true, isActive=false
      destroyOnCollapse.value = true;
      await nextTick();

      // 这时应该返回 null（因为 isActive=false 且 destroyOnCollapse=true）
      expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();

      // 切换到 destroyOnCollapse=true, isActive=true
      isActive.value = true;
      await nextTick();

      // 这时应该渲染内容（因为 isActive=true）
      expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();

      // 切换回 destroyOnCollapse=true, isActive=false
      isActive.value = false;
      await nextTick();

      // 再次返回 null
      expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();
    });

    test('renderBody function complete branch coverage', async () => {
      // 专门测试 renderBody 函数的所有分支，确保覆盖第128行的所有执行路径

      // 测试1: destroyOnCollapse=false 的情况（调用 renderBodyByNormal）
      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" destroyOnCollapse={false} default="内容1" />
            </Collapse>
          );
        },
      });

      const panel1 = wrapper1.findComponent({ ref: '1' });
      // destroyOnCollapse=false 时，应该使用 v-show 控制显示
      expect(panel1.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel1.find('.t-collapse-panel__body').attributes('style')).toBe('display: none;');

      // 测试2: destroyOnCollapse=true, isActive=false 的情况（返回 null）
      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="2" value="2" header="标题" destroyOnCollapse={true} default="内容2" />
            </Collapse>
          );
        },
      });

      const panel2 = wrapper2.findComponent({ ref: '2' });
      // destroyOnCollapse=true 且 isActive=false 时，应该返回 null
      expect(panel2.find('.t-collapse-panel__body').exists()).toBeFalsy();

      // 测试3: destroyOnCollapse=true, isActive=true 的情况（渲染内容）
      const wrapper3 = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['3']}>
              <CollapsePanel ref="3" value="3" header="标题" destroyOnCollapse={true} default="内容3" />
            </Collapse>
          );
        },
      });

      const panel3 = wrapper3.findComponent({ ref: '3' });
      // destroyOnCollapse=true 且 isActive=true 时，应该渲染内容
      expect(panel3.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel3.find('.t-collapse-panel__content').exists()).toBeTruthy();
      expect(panel3.find('.t-collapse-panel__content').text()).toBe('内容3');

      // 测试4: 动态切换 destroyOnCollapse 的值
      const dynamicDestroyOnCollapse = ref(false);
      const wrapper4 = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['4']}>
              <CollapsePanel
                ref="4"
                value="4"
                header="标题"
                destroyOnCollapse={dynamicDestroyOnCollapse.value}
                default="内容4"
              />
            </Collapse>
          );
        },
      });

      const panel4 = wrapper4.findComponent({ ref: '4' });

      // 初始：destroyOnCollapse=false, isActive=true
      expect(panel4.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel4.find('.t-collapse-panel__body').attributes('style')).not.toBe('display: none;');

      // 切换到 destroyOnCollapse=true, isActive=true
      dynamicDestroyOnCollapse.value = true;
      await nextTick();
      expect(panel4.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(panel4.find('.t-collapse-panel__content').text()).toBe('内容4');
    });

    test('renderBody edge case - force all execution paths', async () => {
      // 强制测试 renderBody 函数的所有可能执行路径，包括边界情况

      // 创建一个可以动态控制所有状态的测试
      const destroyOnCollapse = ref(false);
      const value = ref([]);
      const handleChange = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse value={value.value} onChange={handleChange}>
              <CollapsePanel
                ref="test"
                value="test"
                header="Test Header"
                destroyOnCollapse={destroyOnCollapse.value}
                default="Test Content"
              />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: 'test' });

      // 场景1: destroyOnCollapse=false, isActive=false (renderBodyByNormal with v-show=false)
      destroyOnCollapse.value = false;
      value.value = [];
      await nextTick();

      let body = panel.find('.t-collapse-panel__body');
      expect(body.exists()).toBeTruthy();
      expect(body.attributes('style')).toBe('display: none;');

      // 场景2: destroyOnCollapse=false, isActive=true (renderBodyByNormal with v-show=true)
      destroyOnCollapse.value = false;
      value.value = ['test'];
      await nextTick();

      body = panel.find('.t-collapse-panel__body');
      expect(body.exists()).toBeTruthy();
      expect(body.attributes('style')).not.toBe('display: none;');

      // 场景3: destroyOnCollapse=true, isActive=false (renderBodyDestroyOnCollapse returns null)
      destroyOnCollapse.value = true;
      value.value = [];
      await nextTick();

      expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();

      // 场景4: destroyOnCollapse=true, isActive=true (renderBodyDestroyOnCollapse returns element)
      destroyOnCollapse.value = true;
      value.value = ['test'];
      await nextTick();

      body = panel.find('.t-collapse-panel__body');
      expect(body.exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__content').text()).toBe('Test Content');

      // 场景5: 快速切换状态，确保所有分支都被执行
      for (let i = 0; i < 3; i++) {
        destroyOnCollapse.value = !destroyOnCollapse.value;
        value.value = value.value.length > 0 ? [] : ['test'];
        await nextTick();

        // 验证每次状态变化后的结果
        if (destroyOnCollapse.value && value.value.length === 0) {
          expect(panel.find('.t-collapse-panel__body').exists()).toBeFalsy();
        } else {
          expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();
        }
      }
    });

    test('renderBody JSX expression edge cases', async () => {
      // 测试 JSX 中 {renderBody()} 表达式的所有可能分支

      // 测试组件在异常状态下的渲染
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="edge" value="" header="" destroyOnCollapse={false} default="" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: 'edge' });

      // 验证空值情况下的渲染
      expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();

      // 测试 renderBody 在 Transition 组件内部的渲染
      const transition = panel.findComponent({ name: 'Transition' });
      expect(transition.exists()).toBeTruthy();

      // 强制触发 Transition 的渲染更新
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      // 验证渲染后的状态
      expect(panel.find('.t-collapse-panel__body').exists()).toBeTruthy();

      // 再次点击，确保所有渲染路径都被执行
      await panel.find('.t-collapse-panel__header').trigger('click');
      await nextTick();

      expect(panel.find('.t-collapse-panel__body').attributes('style')).toBe('display: none;');
    });

    test('renderBody function return value handling', () => {
      // 直接测试 renderBody 函数的返回值处理

      // 测试 destroyOnCollapse=false 的返回值
      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="1" header="Test" destroyOnCollapse={false} default="Content" />
            </Collapse>
          );
        },
      });

      // 测试 destroyOnCollapse=true, isActive=false 的返回值
      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel value="2" header="Test" destroyOnCollapse={true} default="Content" />
            </Collapse>
          );
        },
      });

      // 测试 destroyOnCollapse=true, isActive=true 的返回值
      const wrapper3 = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['3']}>
              <CollapsePanel value="3" header="Test" destroyOnCollapse={true} default="Content" />
            </Collapse>
          );
        },
      });

      // 验证所有情况下的渲染结果
      expect(wrapper1.find('.t-collapse-panel__body').exists()).toBeTruthy();
      expect(wrapper2.find('.t-collapse-panel__body').exists()).toBeFalsy();
      expect(wrapper3.find('.t-collapse-panel__body').exists()).toBeTruthy();

      // 验证 Transition 组件都正确包含了 renderBody 的结果
      expect(wrapper1.findComponent({ name: 'Transition' }).exists()).toBeTruthy();
      expect(wrapper2.findComponent({ name: 'Transition' }).exists()).toBeTruthy();
      expect(wrapper3.findComponent({ name: 'Transition' }).exists()).toBeTruthy();
    });
  });

  describe('interaction', () => {
    test('expandOnRowClick=false behavior', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandOnRowClick={false} onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 点击整行不应该触发展开
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).not.toHaveBeenCalled();

      // 点击图标应该触发展开
      await panel.find('.t-collapse-panel__icon').trigger('click');
      expect(handleChange).toHaveBeenCalledWith(['1']);
    });

    test('headerRightContent click event stopPropagation', async () => {
      const handleChange = vi.fn();
      const rightContentClick = vi.fn();

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel
                ref="1"
                value="1"
                header="标题"
                default="内容"
                headerRightContent={() => (
                  <button class="right-btn" onClick={rightContentClick}>
                    操作
                  </button>
                )}
              />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 点击右侧内容不应该触发面板展开
      await panel.find('.right-btn').trigger('click');
      expect(rightContentClick).toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('disabled state interaction', async () => {
      const handleChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse onChange={handleChange}>
              <CollapsePanel ref="1" value="1" header="标题" disabled={true} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 禁用状态下点击不应该触发展开
      await panel.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).not.toHaveBeenCalled();

      // 禁用状态下点击图标也不应该触发展开
      await panel.find('.t-collapse-panel__icon').trigger('click');
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('icon placement and active state', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement="right" defaultValue={['1']}>
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      const icon = panel.find('.t-collapse-panel__icon');

      // 图标位置应该是右侧
      expect(icon.classes()).toContain('t-collapse-panel__icon--right');

      // 展开状态下图标应该有 active 类
      expect(icon.classes()).toContain('t-collapse-panel__icon--active');
    });
  });

  describe('slots', () => {
    test('expandIcon slot', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" default="内容">
                {{
                  expandIcon: () => <span class="slot-icon">⬇</span>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.slot-icon').exists()).toBeTruthy();
      expect(panel.find('.slot-icon').text()).toBe('⬇');
    });

    test('multiple slots combination', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel ref="1" value="1">
                {{
                  header: () => <h4 class="slot-header">Slot Header</h4>,
                  headerRightContent: () => <span class="slot-right">Right</span>,
                  expandIcon: () => <i class="slot-icon">+</i>,
                  default: () => <div class="slot-content">Slot Content</div>,
                }}
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.slot-header').text()).toBe('Slot Header');
      expect(panel.find('.slot-right').text()).toBe('Right');
      expect(panel.find('.slot-icon').text()).toBe('+');
      expect(panel.find('.slot-content').text()).toBe('Slot Content');
    });

    test('default slot priority over content prop', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse defaultExpandAll>
              <CollapsePanel ref="1" value="1" header="标题" content="prop content">
                <div class="slot-content">Slot Content</div>
              </CollapsePanel>
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.slot-content').exists()).toBeTruthy();
      expect(panel.find('.slot-content').text()).toBe('Slot Content');
    });
  });

  describe('edge cases', () => {
    test('panel without value uses auto-generated id', async () => {
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
      const panel2 = wrapper.findComponent({ ref: '2' });

      await panel1.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0]);

      await panel2.find('.t-collapse-panel__header').trigger('click');
      expect(handleChange).toHaveBeenCalledWith([0, 1]);
    });

    test('panel with empty header and content', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.t-collapse-panel__header').exists()).toBeTruthy();
      expect(panel.find('.t-collapse-panel__content').exists()).toBeTruthy();
    });

    test('dynamic prop changes', async () => {
      const disabled = ref(false);
      const header = ref('Initial Header');

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header={header.value} disabled={disabled.value} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 初始状态
      expect(panel.find('.t-collapse-panel__header').text()).toContain('Initial Header');
      expect(panel.classes()).not.toContain('t-is-disabled');

      // 动态更新
      header.value = 'Updated Header';
      disabled.value = true;
      await nextTick();

      expect(panel.find('.t-collapse-panel__header').text()).toContain('Updated Header');
      expect(panel.classes()).toContain('t-is-disabled');
    });

    test('transition animation hooks', async () => {
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
      const transition = panel.findComponent({ name: 'Transition' });

      expect(transition.exists()).toBeTruthy();
      expect(transition.props('name')).toBe('t-slide-down');

      // 验证动画钩子函数存在
      expect(typeof transition.props('onBeforeEnter')).toBe('function');
      expect(typeof transition.props('onEnter')).toBe('function');
      expect(typeof transition.props('onAfterEnter')).toBe('function');
      expect(typeof transition.props('onBeforeLeave')).toBe('function');
      expect(typeof transition.props('onLeave')).toBe('function');
      expect(typeof transition.props('onAfterLeave')).toBe('function');
    });

    test('expandIcon undefined behavior', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIcon={undefined}>
              <CollapsePanel ref="1" value="1" header="标题" expandIcon={undefined} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      const icon = panel.find('.t-collapse-panel__icon');

      // expandIcon 为 undefined 时应该使用父组件的 renderTNode
      expect(icon.exists()).toBeTruthy();
    });

    test('headerRightContent with complex content', async () => {
      const complexContent = () => (
        <div class="complex-right">
          <button class="btn1">按钮1</button>
          <span class="text">文本</span>
          <button class="btn2">按钮2</button>
        </div>
      );

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel ref="1" value="1" header="标题" headerRightContent={complexContent} default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.complex-right').exists()).toBeTruthy();
      expect(panel.find('.btn1').exists()).toBeTruthy();
      expect(panel.find('.text').exists()).toBeTruthy();
      expect(panel.find('.btn2').exists()).toBeTruthy();
    });

    test('panel with all props combinations', async () => {
      const customIcon = () => <span class="custom">⭐</span>;
      const customHeader = () => <h4 class="custom-h4">Custom Header</h4>;
      const customRight = () => <div class="custom-right">Right</div>;
      const customContent = () => <div class="custom-content">Custom Content</div>;

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse expandIconPlacement="right" expandOnRowClick={false}>
              <CollapsePanel
                ref="1"
                value="test"
                header={customHeader}
                headerRightContent={customRight}
                expandIcon={customIcon}
                content={customContent}
                disabled={false}
                destroyOnCollapse={false}
              />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });
      expect(panel.find('.custom').exists()).toBeTruthy();
      expect(panel.find('.custom-h4').exists()).toBeTruthy();
      expect(panel.find('.custom-right').exists()).toBeTruthy();
      expect(panel.find('.custom-content').exists()).toBeTruthy();
    });

    test('panel state changes with parent config', async () => {
      const expandOnRowClick = ref(true);
      const expandIconPlacement = ref('left');
      const disabled = ref(false);

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse
              expandOnRowClick={expandOnRowClick.value}
              expandIconPlacement={expandIconPlacement.value}
              disabled={disabled.value}
            >
              <CollapsePanel ref="1" value="1" header="标题" default="内容" />
            </Collapse>
          );
        },
      });

      const panel = wrapper.findComponent({ ref: '1' });

      // 初始状态
      expect(panel.find('.t-collapse-panel__header').classes()).toContain('t-is-clickable');
      expect(panel.find('.t-collapse-panel__icon').classes()).toContain('t-collapse-panel__icon--left');
      expect(panel.classes()).not.toContain('t-is-disabled');

      // 动态更新父组件配置
      expandOnRowClick.value = false;
      expandIconPlacement.value = 'right';
      disabled.value = true;
      await nextTick();

      expect(panel.find('.t-collapse-panel__header').classes()).not.toContain('t-is-clickable');
      expect(panel.find('.t-collapse-panel__icon').classes()).toContain('t-collapse-panel__icon--right');
      expect(panel.classes()).toContain('t-is-disabled');
    });

    test('renderBlank functionality', () => {
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
      const blank = panel.find('.t-collapse-panel__header--blank');
      expect(blank.exists()).toBeTruthy();
    });
  });
});
