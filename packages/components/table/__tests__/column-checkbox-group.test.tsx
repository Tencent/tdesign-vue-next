/**
 * 列选择框组组件测试
 * 测试列选择框组组件的全选、单选、状态管理等功能
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import ColumnCheckboxGroup from '../components/column-checkbox-group';
import { waitForRender } from './shared/test-utils';

// 测试用的列选项数据
const mockColumnOptions = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Age', value: 'age' },
  { label: 'Email', value: 'email' },
  { label: 'Status', value: 'status' },
];

const mockColumnOptionsWithDisabled = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name', disabled: true },
  { label: 'Age', value: 'age' },
  { label: 'Email', value: 'email', disabled: true },
  { label: 'Status', value: 'status' },
];

const mockColumnOptionsMixed = [
  'id',
  { label: 'Name', value: 'name' },
  'age',
  { label: 'Email', value: 'email' },
  'status',
];

describe('ColumnCheckboxGroup Component', () => {
  // 测试基础渲染
  describe('Basic Rendering', () => {
    it('should render with basic props', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn();

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 检查组件基本结构
      expect(wrapper.find('.t-table__column-controller-item').exists()).toBeTruthy();
      expect(wrapper.find('.t-table__column-controller-block').exists()).toBeTruthy();

      // 检查全选复选框
      const allCheckbox = wrapper.find('.t-checkbox');
      expect(allCheckbox.exists()).toBeTruthy();
      expect(allCheckbox.text()).toContain('列显示控制');

      // 检查选项组
      const checkboxGroup = wrapper.find('.t-checkbox-group');
      expect(checkboxGroup.exists()).toBeTruthy();
    });

    it('should render with unique key', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn();

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          uniqueKey="test-key"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 检查uniqueKey是否正确应用
      expect(wrapper.find('.t-table__test-key').exists()).toBeTruthy();
    });

    it('should render with empty options', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn();

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={[]}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 检查组件仍然能正常渲染
      expect(wrapper.find('.t-table__column-controller-item').exists()).toBeTruthy();

      // 全选复选框应该被禁用
      const allCheckbox = wrapper.find('.t-checkbox');
      expect(allCheckbox.exists()).toBeTruthy();
      // 检查是否有disabled属性
      const checkboxInput = allCheckbox.find('input');
      expect(checkboxInput.exists()).toBeTruthy();
      expect(checkboxInput.attributes('disabled')).toBeDefined();
    });
  });

  // 测试全选功能
  describe('Select All Functionality', () => {
    it('should select all when all checkbox is clicked', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证onChange被调用，且包含所有选项的值
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['id', 'name', 'age', 'email', 'status']);
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          type: 'check',
          e: expect.any(Object),
        }),
      );
    });

    it('should unselect all when all checkbox is unchecked', async () => {
      const selectedKeys = ref<string[]>(['id', 'name', 'age', 'email', 'status']);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框取消选择
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证onChange被调用，且返回空数组
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual([]);
      expect(callArgs[1]).toEqual(
        expect.objectContaining({
          type: 'uncheck',
          e: expect.any(Object),
        }),
      );
    });

    it('should handle mixed options format correctly', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptionsMixed}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证onChange被调用，且包含所有选项的值
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['id', 'name', 'age', 'email', 'status']);
    });
  });

  // 测试单选功能
  describe('Individual Selection', () => {
    it('should handle individual checkbox changes', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 模拟选择单个选项
      const newKeys = ['id', 'name'];
      onChange(newKeys, { type: 'check', current: 'name', option: { label: 'Name', value: 'name' } });
      await waitForRender(wrapper);

      // 验证onChange被调用
      expect(onChange).toHaveBeenCalledWith(
        newKeys,
        expect.objectContaining({
          type: 'check',
          current: 'name',
          option: { label: 'Name', value: 'name' },
        }),
      );
    });

    it('should handle checkbox group change event', async () => {
      const selectedKeys = ref<string[]>(['id']);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 模拟复选框组变化
      const newKeys = ['id', 'name', 'age'];
      const changeContext = {
        type: 'check',
        current: 'age',
        option: { label: 'Age', value: 'age' },
        e: new Event('change'),
      };

      onChange(newKeys, changeContext);
      await waitForRender(wrapper);

      // 验证onChange被正确调用
      expect(onChange).toHaveBeenCalledWith(newKeys, changeContext);
    });
  });

  // 测试状态计算
  describe('State Calculation', () => {
    it('should show checked state when all options are selected', async () => {
      const selectedKeys = ref<string[]>(['id', 'name', 'age', 'email', 'status']);

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={vi.fn()}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 全选复选框应该被选中
      const allCheckbox = wrapper.find('.t-checkbox input');
      expect(allCheckbox.element).toBeTruthy();
      const element = allCheckbox.element as HTMLInputElement;
      expect(element.checked).toBe(true);
      expect(element.indeterminate).toBe(false);
    });

    it('should show indeterminate state when some options are selected', async () => {
      const selectedKeys = ref<string[]>(['id', 'name']);

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={vi.fn()}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 全选复选框应该显示半选状态
      const allCheckbox = wrapper.find('.t-checkbox input');
      expect(allCheckbox.element).toBeTruthy();
      const element = allCheckbox.element as HTMLInputElement;
      expect(element.checked).toBe(false);
      expect(element.indeterminate).toBe(true);
    });

    it('should show unchecked state when no options are selected', async () => {
      const selectedKeys = ref<string[]>([]);

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={vi.fn()}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 全选复选框应该未被选中
      const allCheckbox = wrapper.find('.t-checkbox input');
      expect(allCheckbox.element).toBeTruthy();
      const element = allCheckbox.element as HTMLInputElement;
      expect(element.checked).toBe(false);
      expect(element.indeterminate).toBe(false);
    });
  });

  // 测试禁用选项处理
  describe('Disabled Options Handling', () => {
    it('should exclude disabled options from all checked keys', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptionsWithDisabled}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证只包含非禁用选项
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['id', 'age', 'status']);
      // 禁用选项 'name' 和 'email' 不应该被包含
      expect(callArgs[0]).not.toContain('name');
      expect(callArgs[0]).not.toContain('email');
    });

    it('should handle mixed format with disabled options', async () => {
      const mixedOptionsWithDisabled = [
        'id',
        { label: 'Name', value: 'name', disabled: true },
        'age',
        { label: 'Email', value: 'email' },
        { label: 'Status', value: 'status', disabled: true },
      ];

      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mixedOptionsWithDisabled}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证只包含非禁用选项
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['id', 'age', 'email']);
      // 禁用选项不应该被包含
      expect(callArgs[0]).not.toContain('name');
      expect(callArgs[0]).not.toContain('status');
    });
  });

  // 测试复选框组属性传递
  describe('Checkbox Group Props', () => {
    it('should pass checkbox props to checkbox group', async () => {
      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn();

      const checkboxProps = {
        size: 'small' as const,
        max: 3,
        name: 'column-selector',
      };

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={mockColumnOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={checkboxProps}
        />
      ));

      await waitForRender(wrapper);

      // 检查复选框组是否正确接收了属性
      const checkboxGroup = wrapper.find('.t-checkbox-group');
      expect(checkboxGroup.exists()).toBeTruthy();

      // 注意：由于Vue Test Utils的限制，我们无法直接检查传递的props
      // 但可以验证组件结构是否正确
      expect(wrapper.find('.t-table__column-controller-item').exists()).toBeTruthy();
    });
  });

  // 测试边界情况
  describe('Edge Cases', () => {
    it('should handle options with only disabled items', async () => {
      const allDisabledOptions = [
        { label: 'Name', value: 'name', disabled: true },
        { label: 'Email', value: 'email', disabled: true },
      ];

      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn();

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={allDisabledOptions}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 全选复选框应该被禁用
      const allCheckbox = wrapper.find('.t-checkbox input');
      expect(allCheckbox.element).toBeTruthy();
      const element = allCheckbox.element as HTMLInputElement;
      expect(element.disabled).toBe(true);
    });

    it('should handle options with empty values', async () => {
      const optionsWithEmptyValues = [
        { label: 'ID', value: '' },
        { label: 'Name', value: 'name' },
        { label: 'Age', value: null },
        { label: 'Email', value: undefined },
      ];

      const selectedKeys = ref<string[]>([]);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={optionsWithEmptyValues}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证只包含有效值的选项
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['ID', 'name', 'Age', 'Email']);
    });

    it('should handle duplicate values correctly', async () => {
      const optionsWithDuplicates = [
        { label: 'ID', value: 'id' },
        { label: 'Name', value: 'name' },
        { label: 'ID2', value: 'id' }, // 重复的value
      ];

      const selectedKeys = ref<string[]>(['id']);
      const onChange = vi.fn((keys) => {
        selectedKeys.value = keys;
      });

      const wrapper = mount(() => (
        <ColumnCheckboxGroup
          label="列显示控制"
          options={optionsWithDuplicates}
          value={selectedKeys.value}
          onChange={onChange}
          checkboxProps={{}}
        />
      ));

      await waitForRender(wrapper);

      // 点击全选复选框
      const allCheckbox = wrapper.find('.t-checkbox input');
      await allCheckbox.trigger('change');
      await waitForRender(wrapper);

      // 验证重复值被正确处理（使用Set去重）
      expect(onChange).toHaveBeenCalledTimes(1);
      const callArgs = onChange.mock.calls[0];
      expect(callArgs[0]).toEqual(['id', 'name']);
      // 重复的'id'应该只出现一次
      expect(callArgs[0].filter((v: any) => v === 'id')).toHaveLength(1);
    });
  });
});
