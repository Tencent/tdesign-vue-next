// @ts-nocheck
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { Collapse, CollapsePanel } from '@tdesign/components/collapse';
import FakeArrow from '@tdesign/components/common-components/fake-arrow';

describe('FakeArrow Component Coverage', () => {
  describe('overlayStyle prop type handling', () => {
    test('overlayStyle with string type - type validation behavior', () => {
      // 测试 overlayStyle 为字符串类型
      // 注意：由于 fake-arrow.tsx 第16行的类型定义 `Object || String` 实际上只会是 Object
      // 所以字符串类型会触发 Vue 的类型警告，但组件仍然可以正常工作
      const stringStyle = 'color: red; font-size: 16px;';

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="1"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={stringStyle} />}
              />
            </Collapse>
          );
        },
      });

      const fakeArrow = wrapper.findComponent(FakeArrow);
      expect(fakeArrow.exists()).toBeTruthy();
      expect(fakeArrow.props('overlayStyle')).toBe(stringStyle);
      
      // 验证样式确实被应用到 SVG 元素上
      const svg = fakeArrow.find('svg');
      expect(svg.attributes('style')).toBe(stringStyle);
    });

    test('overlayStyle with object type', () => {
      // 测试 overlayStyle 为对象类型，覆盖 fake-arrow.tsx 第16行的 Object 分支
      const objectStyle = { color: 'blue', fontSize: '18px' };

      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="2"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={objectStyle} />}
              />
            </Collapse>
          );
        },
      });

      const fakeArrow = wrapper.findComponent(FakeArrow);
      expect(fakeArrow.exists()).toBeTruthy();
      expect(fakeArrow.props('overlayStyle')).toEqual(objectStyle);
    });

    test('overlayStyle with null/undefined values', () => {
      // 测试 overlayStyle 为 null 或 undefined，覆盖类型检查的边界情况
      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="3"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={null} />}
              />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="4"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={undefined} />}
              />
            </Collapse>
          );
        },
      });

      expect(wrapper1.findComponent(FakeArrow).exists()).toBeTruthy();
      expect(wrapper2.findComponent(FakeArrow).exists()).toBeTruthy();
    });

    test('overlayStyle type validation edge cases', () => {
      // 测试各种边界情况，确保类型处理的完整性
      const emptyString = '';
      const emptyObject = {};
      const complexObject = {
        color: 'green',
        fontSize: '20px',
        backgroundColor: 'yellow',
        padding: '10px',
      };

      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="5"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={emptyString} />}
              />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="6"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={emptyObject} />}
              />
            </Collapse>
          );
        },
      });

      const wrapper3 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="7"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayStyle={complexObject} />}
              />
            </Collapse>
          );
        },
      });

      expect(wrapper1.findComponent(FakeArrow).props('overlayStyle')).toBe(emptyString);
      expect(wrapper2.findComponent(FakeArrow).props('overlayStyle')).toEqual(emptyObject);
      expect(wrapper3.findComponent(FakeArrow).props('overlayStyle')).toEqual(complexObject);
    });
  });

  describe('overlayClassName prop handling', () => {
    test('overlayClassName with different types', () => {
      // 测试 overlayClassName 的不同类型支持
      const stringClass = 'custom-class';
      const arrayClass = ['class1', 'class2'];
      const objectClass = { active: true, disabled: false };

      const wrapper1 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="8"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayClassName={stringClass} />}
              />
            </Collapse>
          );
        },
      });

      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="9"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayClassName={arrayClass} />}
              />
            </Collapse>
          );
        },
      });

      const wrapper3 = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="10"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow overlayClassName={objectClass} />}
              />
            </Collapse>
          );
        },
      });

      expect(wrapper1.findComponent(FakeArrow).props('overlayClassName')).toBe(stringClass);
      expect(wrapper2.findComponent(FakeArrow).props('overlayClassName')).toEqual(arrayClass);
      expect(wrapper3.findComponent(FakeArrow).props('overlayClassName')).toEqual(objectClass);
    });
  });

  describe('isActive prop behavior', () => {
    test('isActive state changes affect arrow appearance', async () => {
      // 测试 isActive 状态变化对箭头外观的影响
      const wrapper = mount({
        setup() {
          return () => (
            <Collapse>
              <CollapsePanel
                value="11"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow isActive={false} />}
              />
            </Collapse>
          );
        },
      });

      const fakeArrow = wrapper.findComponent(FakeArrow);
      expect(fakeArrow.props('isActive')).toBe(false);

      // 测试 isActive 为 true 的情况
      const wrapper2 = mount({
        setup() {
          return () => (
            <Collapse defaultValue={['12']}>
              <CollapsePanel
                value="12"
                header="Panel"
                default="Content"
                expandIcon={() => <FakeArrow isActive={true} />}
              />
            </Collapse>
          );
        },
      });

      const fakeArrow2 = wrapper2.findComponent(FakeArrow);
      expect(fakeArrow2.props('isActive')).toBe(true);
    });
  });
});
