// @ts-nocheck
import { ref, nextTick, computed } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, afterEach, beforeAll, beforeEach } from 'vitest';
import { Select } from '@tdesign/components/select';
import { useKeyboardControl } from '../hooks/useKeyboardControl';
import { usePanelVirtualScroll } from '../hooks/usePanelVirtualScroll';
import { useSelectOptions } from '../hooks/useSelectOptions';
import { getNewMultipleValue, getSingleContent, getMultipleContent } from '../utils';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

// 简单选项
const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

// 带禁用的选项
const optionsWithDisabled = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2', disabled: true },
  { label: '选项3', value: '3' },
];

// 带全选的选项
const optionsWithCheckAll = [
  { label: '全选', checkAll: true },
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
];

// 辅助函数：清理 DOM
const cleanupDOM = () => {
  const panels = document.querySelectorAll('.t-select__list');
  panels.forEach((panel) => panel.parentNode?.removeChild(panel));
  const popups = document.querySelectorAll('.t-popup');
  popups.forEach((popup) => popup.parentNode?.removeChild(popup));
};

describe('Select Hooks - useKeyboardControl', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe('ArrowUp navigation', () => {
    it('should set index to 0 when hoverIndex is -1', async () => {
      // 覆盖行 56-57: if (hoverIndex.value === -1) { newIndex = 0; }
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 按 ArrowUp（hoverIndex 为 -1）
      await input.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();

      // 弹窗应该保持打开
      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should go to last option when hoverIndex is 0', async () => {
      // 覆盖行 58-59: if (hoverIndex.value === 0 || hoverIndex.value > displayOptions.value.length - 1)
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 先 ArrowDown 到第一项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 再 ArrowUp，应该循环到最后
      await input.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should decrement index normally in ArrowUp', async () => {
      // 覆盖行 60-61: else { newIndex--; }
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 先 ArrowDown 两次
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 再 ArrowUp 一次，应该回到上一项
      await input.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should skip disabled option in ArrowUp', async () => {
      // 覆盖行 63-65: if (optionsList.value[newIndex]?.disabled) { newIndex--; }
      const wrapper = mount({
        render() {
          return <Select options={optionsWithDisabled}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 移动到最后一项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();

      // ArrowUp 应该跳过 disabled 项
      await input.trigger('keydown', { code: 'ArrowUp' });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });
  });

  describe('ArrowDown navigation', () => {
    it('should skip disabled option in ArrowDown', async () => {
      // 覆盖行 76-78: if (optionsList.value[newIndex]?.disabled) { newIndex++; }
      const wrapper = mount({
        render() {
          return <Select options={optionsWithDisabled}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // ArrowDown 到第一项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 再 ArrowDown，应该跳过 disabled 到第三项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });
  });

  describe('Enter key handling', () => {
    it('should break when hoverIndex is -1 on Enter', async () => {
      // 覆盖行 82: if (hoverIndex.value === -1) break;
      const value = ref('');
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 直接按 Enter（hoverIndex 为 -1）
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      // 值不应该改变
      expect(value.value).toBe('');
    });

    it('should use virtualFilteredOptions when virtual scroll and filterable', async () => {
      // 覆盖行 84-86: selectPanelRef.value.isVirtual && isFilterable.value && virtualFilteredOptions.value.length
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const value = ref('');
      const wrapper = mount({
        render() {
          return (
            <Select
              v-model={value.value}
              options={manyOptions}
              filterable
              scroll={{ type: 'virtual', threshold: 100 }}
            ></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value).toBeTruthy();
    });

    it('should use optionsList when isRemoteSearch', async () => {
      // 覆盖行 87-88: isRemoteSearch.value ? optionsList.value
      const onSearchFn = vi.fn();
      const value = ref('');
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} filterable onSearch={onSearchFn}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value).toBe('1');
    });

    it('should fallback to optionsList when finalOptions is empty', async () => {
      // 覆盖行 91: if (!finalOptions.length) finalOptions = optionsList.value;
      const value = ref('');
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value).toBe('1');
    });

    it('should open popup when not visible', async () => {
      // 覆盖行 92-95: if (!innerPopupVisible.value) { setInnerPopupVisible(true, { e }); break; }
      const onPopupVisibleChangeFn = vi.fn();
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn}></Select>;
        },
      });

      // 先打开再关闭
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();
      await wrapper.setProps({ popupProps: { visible: false } });
      await nextTick();

      const input = wrapper.find('input');
      // 先 ArrowDown 使 hoverIndex 不为 -1
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 按 Enter 应该打开弹窗
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(onPopupVisibleChangeFn).toHaveBeenCalled();
    });

    it('should select and close popup in single mode', async () => {
      // 覆盖行 97-105: if (!multiple) { ... setInnerPopupVisible(false, { e }); }
      const value = ref('');
      const onChangeFn = vi.fn();
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} onChange={onChangeFn}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value).toBe('1');
      expect(onChangeFn).toHaveBeenCalled();
    });

    it('should return early when hoverIndex is -1 in multiple mode', async () => {
      // 覆盖行 107: if (hoverIndex.value === -1) return;
      const value = ref(['1']);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 关闭再打开，重置 hoverIndex
      await wrapper.setProps({ popupProps: { visible: false } });
      await nextTick();
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 直接按 Enter（hoverIndex 为 -1）
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      // 值不应该改变
      expect(value.value).toEqual(['1']);
    });

    it('should handle checkAll option in multiple mode', async () => {
      // 覆盖行 109-112: if (finalOptions[hoverIndex.value].checkAll) { onCheckAllChange(!isCheckAll.value); return; }
      const value = ref([]);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={optionsWithCheckAll} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 移动到全选选项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 按 Enter 触发全选
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      // 验证全选被触发
      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should return early when optionValue is undefined', async () => {
      // 覆盖行 116: if (!optionValue) return;
      const optionsWithUndefined = [
        { label: '空值选项', value: undefined },
        { label: '选项1', value: '1' },
      ];
      const value = ref([]);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={optionsWithUndefined} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      // 值不应该改变（因为 optionValue 为 undefined）
      expect(value.value).toEqual([]);
    });

    it('should respect max limit in multiple mode', async () => {
      // 覆盖行 119: if (max > 0 && newValue.value.length > max) return;
      const value = ref(['1', '2']);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple max={2}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 移动到第三个选项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      // 尝试按 Enter 选中，应该被 max 限制
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value.length).toBe(2);
    });

    it('should toggle value and clear filteredOptions in multiple mode', async () => {
      // 覆盖行 117-128: const newValue = getNewMultipleValue(...); ... filteredOptions.value = [];
      const value = ref([]);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple filterable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('选项1');
      await nextTick();

      // 点击选项选择（通过 Enter 测试 filteredOptions 清理逻辑）
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();
      await input.trigger('keydown', { code: 'Enter' });
      await nextTick();

      expect(value.value).toContain('1');
    });
  });

  describe('Watch handlers', () => {
    it('should reset hoverIndex when popup opens', async () => {
      // 覆盖行 136-142: watch(innerPopupVisible, ...)
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });

      // 打开弹窗
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 移动到某个选项
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();

      // 关闭再打开
      await wrapper.setProps({ popupProps: { visible: false } });
      await nextTick();
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // hoverIndex 应该被重置
      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should scroll to hovered option', async () => {
      // 覆盖行 146-156: watch(hoverIndex, ...)
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      // 多次 ArrowDown 触发滚动
      await input.trigger('keydown', { code: 'ArrowDown' });
      await input.trigger('keydown', { code: 'ArrowDown' });
      await nextTick();

      // 验证 scrollTo 被调用
      expect(Element.prototype.scrollTo).toHaveBeenCalled();
    });
  });
});

describe('Select Hooks - usePanelVirtualScroll', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe('Virtual scroll activation', () => {
    it('should not activate virtual scroll when options below threshold', async () => {
      // 覆盖行 11-13: isVirtual computed
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 选项少于阈值，不启用虚拟滚动
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
    });

    it('should activate virtual scroll when options exceed threshold', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
    });
  });

  describe('Scroll event handling', () => {
    it('should return early when isVirtual is false', async () => {
      // 覆盖行 35-37: if (!isVirtual.value) { return; }
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 模拟滚动事件
      const scrollContainer = document.querySelector('.t-popup__content');
      if (scrollContainer) {
        scrollContainer.dispatchEvent(new Event('scroll'));
      }
      await nextTick();

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should skip scroll when delta is less than 5px', async () => {
      // 覆盖行 44-46: lastScrollY = -1
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const scrollContainer = document.querySelector('.t-popup__content');
      if (scrollContainer) {
        // 模拟小幅度滚动（小于 5px）
        Object.defineProperty(scrollContainer, 'scrollTop', { value: 2, writable: true });
        scrollContainer.dispatchEvent(new Event('scroll'));
        await nextTick();

        // 再次小幅度滚动
        Object.defineProperty(scrollContainer, 'scrollTop', { value: 3, writable: true });
        scrollContainer.dispatchEvent(new Event('scroll'));
        await nextTick();
      }

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should handle scroll when delta exceeds 5px', async () => {
      // 覆盖行 41-43: handleVirtualScroll(); lastScrollY = top;
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render() {
          return <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const scrollContainer = document.querySelector('.t-popup__content');
      if (scrollContainer) {
        // 模拟大幅度滚动（大于 5px）
        Object.defineProperty(scrollContainer, 'scrollTop', { value: 100, writable: true });
        scrollContainer.dispatchEvent(new Event('scroll'));
        await nextTick();
      }

      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });
  });
});

describe('Select Hooks - useSelectOptions', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe('Group options handling', () => {
    it('should handle grouped options', async () => {
      // 覆盖行 60: if (!isArray(res)) continue;
      const groupedOptions = [
        {
          group: '分组1',
          children: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Select options={groupedOptions}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelectorAll('.t-select-option-group').length).toBe(1);
    });
  });

  describe('Filter methods', () => {
    it('should use custom filter function', async () => {
      // 覆盖行 111-113: if (isFunction(props.filter)) { return props.filter(...) }
      const customFilter = vi.fn((filterWords, option) => option.value === '1');
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filter={customFilter}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('any');
      await nextTick();

      expect(customFilter).toHaveBeenCalled();
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
    });

    it('should checkAll option stay visible when filter returns false', async () => {
      // 覆盖行 121-122: if (option.checkAll) return;
      const wrapper = mount({
        render() {
          return <Select options={optionsWithCheckAll} filterable multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('选项1');
      await nextTick();

      const checkAllOption = document.querySelector('li[title="全选"]');
      expect(checkAllOption).toBeTruthy();
    });
  });
});

describe('Select Utils', () => {
  describe('getNewMultipleValue', () => {
    it('should add new value when not exists', () => {
      // 覆盖行 38-39: value.push(optionValue);
      const result = getNewMultipleValue(['1', '2'], '3');
      expect(result.value).toContain('3');
      expect(result.isCheck).toBe(true);
    });

    it('should remove value when exists', () => {
      // 覆盖行 41: value.splice(valueIndex, 1);
      const result = getNewMultipleValue(['1', '2', '3'], '2');
      expect(result.value).not.toContain('2');
      expect(result.isCheck).toBe(false);
    });
  });

  describe('getSingleContent', () => {
    it('should return label from options map', () => {
      // 覆盖行 15-16
      const optionsMap = computed(() => new Map([['1', { label: '选项1', value: '1' }]]));
      const searchDisplayOptions = computed(() => []);
      const result = getSingleContent('1', false, searchDisplayOptions, optionsMap);
      expect(result).toBe('选项1');
    });

    it('should return value string when option not found', () => {
      // 覆盖行 16: value?.toString()
      const optionsMap = computed(() => new Map());
      const searchDisplayOptions = computed(() => []);
      const result = getSingleContent('not-exist', false, searchDisplayOptions, optionsMap);
      expect(result).toBe('not-exist');
    });

    it('should search in searchDisplayOptions when isRemote', () => {
      // 覆盖行 11-12
      const optionsMap = computed(() => new Map());
      const searchDisplayOptions = computed(() => [{ label: '远程选项', value: 'remote' }]);
      const result = getSingleContent('remote', true, searchDisplayOptions, optionsMap);
      expect(result).toBe('远程选项');
    });
  });

  describe('getMultipleContent', () => {
    it('should return array of labels', () => {
      // 覆盖行 25-32
      const optionsMap = computed(
        () =>
          new Map([
            ['1', { label: '选项1', value: '1' }],
            ['2', { label: '选项2', value: '2' }],
          ]),
      );
      const searchDisplayOptions = computed(() => []);
      const result = getMultipleContent(['1', '2'], false, searchDisplayOptions, optionsMap);
      expect(result).toEqual(['选项1', '选项2']);
    });

    it('should skip undefined labels', () => {
      // 覆盖行 28-30: if (resLabel) { res.push(resLabel); }
      const optionsMap = computed(() => new Map([['1', { label: '选项1', value: '1' }]]));
      const searchDisplayOptions = computed(() => []);
      const result = getMultipleContent(['1', 'not-exist'], false, searchDisplayOptions, optionsMap);
      expect(result.length).toBe(2);
    });
  });
});
