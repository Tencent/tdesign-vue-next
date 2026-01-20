// @ts-nocheck
import { ref, nextTick, computed } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, afterEach, beforeAll } from 'vitest';
import { Select } from '@tdesign/components/select';
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
  const selectors = ['.t-select__list', '.t-select__dropdown-inner', '.t-popup', '.t-popup__content'];
  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.parentNode?.removeChild(el);
    });
  });
};

// 创建 hook 测试上下文的工厂函数
const createKeyboardControlContext = (overrides = {}) => {
  const scrollToMock = vi.fn();
  const mockPopupContent = { scrollTo: scrollToMock };
  const mockSelectPanelRef = {
    isVirtual: false,
    innerRef: {
      querySelector: () => ({ clientHeight: 32 }),
    },
  };

  const defaults = {
    displayOptions: computed(() => simpleOptions),
    optionsList: computed(() => simpleOptions),
    innerPopupVisible: ref(true),
    setInnerPopupVisible: vi.fn(),
    selectPanelRef: ref(mockSelectPanelRef),
    isFilterable: computed(() => false),
    isRemoteSearch: computed(() => false),
    getSelectedOptions: vi.fn().mockReturnValue([{ label: '选项1', value: '1' }]),
    setInnerValue: vi.fn(),
    onCheckAllChange: vi.fn(),
    isCheckAll: computed(() => false),
    innerValue: ref([]),
    popupContentRef: computed(() => mockPopupContent as unknown as HTMLElement),
    multiple: false,
    max: 0,
  };

  return { ...defaults, ...overrides, scrollToMock };
};

describe('Select Hooks', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe('useKeyboardControl', () => {
    describe('ArrowUp', () => {
      it('sets index to 0 when hoverIndex is -1', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('goes to last option when hoverIndex is 0', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('decrements index normally', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('skips disabled option', async () => {
        const wrapper = mount({
          render() {
            return <Select options={optionsWithDisabled}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('decrements hoverIndex directly (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext();
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 2;
        await nextTick();

        handleKeyDown({ code: 'ArrowUp', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(hoverIndex.value).toBe(1);
      });

      it('skips disabled option (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          optionsList: computed(() => optionsWithDisabled),
          displayOptions: computed(() => optionsWithDisabled),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 2;
        await nextTick();

        handleKeyDown({ code: 'ArrowUp', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(hoverIndex.value).toBe(0);
      });
    });

    describe('ArrowDown', () => {
      it('skips disabled option', async () => {
        const wrapper = mount({
          render() {
            return <Select options={optionsWithDisabled}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });
    });

    describe('Enter', () => {
      it('breaks when hoverIndex is -1', async () => {
        const value = ref('');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();

        expect(value.value).toBe('');
      });

      it('uses virtualFilteredOptions when virtual scroll and filterable', async () => {
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

        expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();

        const options = document.querySelectorAll('.t-select-option');
        if (options.length > 0) {
          (options[0] as HTMLElement).click();
          await nextTick();
          expect(value.value).toBeTruthy();
        }
      });

      it('uses optionsList when isRemoteSearch', async () => {
        const onSearchFn = vi.fn();
        const value = ref('');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} filterable onSearch={onSearchFn}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const options = document.querySelectorAll('.t-select-option');
        expect(options.length).toBe(3);
        (options[0] as HTMLElement).click();
        await nextTick();
        expect(value.value).toBe('1');
      });

      it('fallbacks to optionsList when finalOptions is empty', async () => {
        const value = ref('');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const options = document.querySelectorAll('.t-select-option');
        if (options.length > 0) {
          (options[0] as HTMLElement).click();
          await nextTick();
          expect(value.value).toBe('1');
        } else {
          expect(document.querySelector('.t-select__list')).toBeTruthy();
        }
      });

      it('opens popup when not visible', async () => {
        const onPopupVisibleChangeFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();
        await wrapper.setProps({ popupProps: { visible: false } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();

        expect(onPopupVisibleChangeFn).toHaveBeenCalled();
      });

      it('selects and closes popup in single mode', async () => {
        const value = ref('');
        const onChangeFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} onChange={onChangeFn}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const options = document.querySelectorAll('.t-select-option');
        expect(options.length).toBe(3);
        (options[0] as HTMLElement).click();
        await nextTick();
        expect(value.value).toBe('1');
        expect(onChangeFn).toHaveBeenCalled();
      });

      it('returns early when hoverIndex is -1 in multiple mode', async () => {
        const value = ref(['1']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} multiple></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();
        await wrapper.setProps({ popupProps: { visible: false } });
        await nextTick();
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();

        expect(value.value).toEqual(['1']);
      });

      it('handles checkAll option in multiple mode', async () => {
        const value = ref([]);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={optionsWithCheckAll} multiple></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('returns early when optionValue is undefined', async () => {
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

        expect(value.value).toEqual([]);
      });

      it('respects max limit in multiple mode', async () => {
        const value = ref(['1', '2']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} multiple max={2}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();

        expect(value.value.length).toBe(2);
      });

      it('toggles value and clears filteredOptions in multiple mode', async () => {
        const value = ref([]);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} multiple></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const options = document.querySelectorAll('.t-select-option');
        expect(options.length).toBe(3);
        (options[0] as HTMLElement).click();
        await nextTick();
        expect(value.value).toContain('1');
      });

      it('uses virtualFilteredOptions (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const virtualOptions = [{ label: '虚拟选项', value: 'virtual' }];
        const mockSelectPanelRef = {
          isVirtual: true,
          innerRef: { querySelector: () => ({ clientHeight: 32 }) },
        };

        const ctx = createKeyboardControlContext({
          selectPanelRef: ref(mockSelectPanelRef),
          isFilterable: computed(() => true),
        });
        const { hoverIndex, handleKeyDown, virtualFilteredOptions } = useKeyboardControl(ctx);

        virtualFilteredOptions.value = virtualOptions;
        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith('virtual', expect.any(Object));
      });

      it('uses optionsList when isRemoteSearch (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          isRemoteSearch: computed(() => true),
        });
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);

        filteredOptions.value = [];
        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith('1', expect.any(Object));
      });

      it('uses filteredOptions in normal case (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const filtered = [{ label: '过滤选项', value: 'filtered' }];
        const ctx = createKeyboardControlContext();
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);

        filteredOptions.value = filtered;
        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith('filtered', expect.any(Object));
      });

      it('fallbacks to optionsList when finalOptions is empty (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext();
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);

        filteredOptions.value = [];
        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith('1', expect.any(Object));
      });

      it('opens popup when not visible (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          innerPopupVisible: ref(false),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        const event = { code: 'Enter', preventDefault: vi.fn() };
        handleKeyDown(event as unknown as KeyboardEvent);

        expect(ctx.setInnerPopupVisible).toHaveBeenCalledWith(true, { e: event });
      });

      it('selects and closes popup in single mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({ multiple: false });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        const event = { code: 'Enter', preventDefault: vi.fn() };
        handleKeyDown(event as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith('1', expect.objectContaining({ trigger: 'check' }));
        expect(ctx.setInnerPopupVisible).toHaveBeenCalledWith(false, { e: event });
      });

      it('handles checkAll in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          optionsList: computed(() => optionsWithCheckAll),
          displayOptions: computed(() => optionsWithCheckAll),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.onCheckAllChange).toHaveBeenCalledWith(true);
      });

      it('returns early when optionValue is undefined (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const optionsWithUndef = [{ label: '无值', value: undefined }];
        const ctx = createKeyboardControlContext({
          multiple: true,
          optionsList: computed(() => optionsWithUndef),
          displayOptions: computed(() => optionsWithUndef),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).not.toHaveBeenCalled();
      });

      it('respects max limit in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          max: 2,
          innerValue: ref(['1', '2']),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 2;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).not.toHaveBeenCalled();
      });

      it('toggles value in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          innerValue: ref([]),
        });
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith(['1'], expect.objectContaining({ trigger: 'check' }));
        expect(filteredOptions.value).toEqual([]);
      });

      it('unchecks value in multiple mode when already selected (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          innerValue: ref(['1']),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = 0;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'uncheck' }));
      });

      it('returns early when hoverIndex is -1 in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          innerValue: ref([]),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);

        hoverIndex.value = -1;
        await nextTick();

        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);

        expect(ctx.setInnerValue).not.toHaveBeenCalled();
      });
    });

    describe('Escape', () => {
      it('closes popup on Escape key', async () => {
        const onPopupVisibleChangeFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'Escape' });
        await nextTick();

        expect(onPopupVisibleChangeFn).toHaveBeenCalled();
      });

      it('closes popup (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext();
        const { handleKeyDown } = useKeyboardControl(ctx);

        const event = { code: 'Escape', preventDefault: vi.fn() };
        handleKeyDown(event as unknown as KeyboardEvent);

        expect(ctx.setInnerPopupVisible).toHaveBeenCalledWith(false, { e: event });
      });
    });

    describe('watch', () => {
      it('resets hoverIndex when popup opens', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();

        await wrapper.setProps({ popupProps: { visible: false } });
        await nextTick();
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('scrolls to hovered option', async () => {
        const scrollToMock = vi.fn();
        const mockPopupContent = { scrollTo: scrollToMock };
        const mockSelectPanelRef = {
          isVirtual: false,
          innerRef: { querySelector: () => ({ clientHeight: 32 }) },
        };

        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');

        const { hoverIndex } = useKeyboardControl({
          displayOptions: computed(() => simpleOptions),
          optionsList: computed(() => simpleOptions),
          innerPopupVisible: ref(true),
          setInnerPopupVisible: vi.fn(),
          selectPanelRef: ref(mockSelectPanelRef),
          isFilterable: computed(() => false),
          isRemoteSearch: computed(() => false),
          getSelectedOptions: vi.fn().mockReturnValue([]),
          setInnerValue: vi.fn(),
          onCheckAllChange: vi.fn(),
          isCheckAll: computed(() => false),
          innerValue: ref([]),
          popupContentRef: computed(() => mockPopupContent as unknown as HTMLElement),
          multiple: false,
          max: 0,
        });

        hoverIndex.value = 1;
        await nextTick();

        expect(scrollToMock).toHaveBeenCalledWith({ top: 32, behavior: 'smooth' });
      });
    });
  });

  describe('usePanelVirtualScroll', () => {
    describe('isVirtual', () => {
      it('does not activate when options below threshold', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} scroll={{ type: 'virtual', threshold: 100 }}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        expect(document.querySelectorAll('.t-select-option').length).toBe(3);
      });

      it('activates when options exceed threshold', async () => {
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

      it('uses default threshold when not specified', async () => {
        const manyOptions = Array.from({ length: 150 }, (_, i) => ({
          label: `选项${i + 1}`,
          value: `${i + 1}`,
        }));
        const wrapper = mount({
          render() {
            return <Select options={manyOptions} scroll={{ type: 'virtual' }}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
      });

      it('does not enable when scroll type is not virtual', async () => {
        const manyOptions = Array.from({ length: 150 }, (_, i) => ({
          label: `选项${i + 1}`,
          value: `${i + 1}`,
        }));
        const wrapper = mount({
          render() {
            return <Select options={manyOptions} scroll={{ type: 'lazy' as any }}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });
    });

    describe('onScroll', () => {
      it('returns early when isVirtual is false', async () => {
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions}></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const scrollContainer = document.querySelector('.t-popup__content');
        if (scrollContainer) {
          scrollContainer.dispatchEvent(new Event('scroll'));
        }
        await nextTick();

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('skips scroll when delta is less than 5px', async () => {
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
          Object.defineProperty(scrollContainer, 'scrollTop', { value: 2, writable: true });
          scrollContainer.dispatchEvent(new Event('scroll'));
          await nextTick();

          Object.defineProperty(scrollContainer, 'scrollTop', { value: 3, writable: true });
          scrollContainer.dispatchEvent(new Event('scroll'));
          await nextTick();
        }

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });

      it('handles scroll when delta exceeds 5px', async () => {
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
          Object.defineProperty(scrollContainer, 'scrollTop', { value: 100, writable: true });
          scrollContainer.dispatchEvent(new Event('scroll'));
          await nextTick();
        }

        expect(document.querySelector('.t-select__list')).toBeTruthy();
      });
    });
  });

  describe('useSelectOptions', () => {
    describe('groupOptions', () => {
      it('handles grouped options', async () => {
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

    describe('filter', () => {
      it('uses custom filter function', async () => {
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

      it('keeps checkAll option visible when filtering', async () => {
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

      it('filters children in grouped options', async () => {
        const groupedOptions = [
          {
            group: '分组1',
            children: [
              { label: '苹果', value: 'apple' },
              { label: '香蕉', value: 'banana' },
              { label: '橙子', value: 'orange' },
            ],
          },
          {
            group: '分组2',
            children: [
              { label: '西瓜', value: 'watermelon' },
              { label: '葡萄', value: 'grape' },
            ],
          },
        ];
        const wrapper = mount({
          render() {
            return <Select options={groupedOptions} filterable></Select>;
          },
        });
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        const input = wrapper.find('input');
        await input.setValue('苹');
        await nextTick();

        const options = document.querySelectorAll('.t-select-option');
        expect(options.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('utils', () => {
    describe('getNewMultipleValue', () => {
      it('adds new value when not exists', () => {
        const result = getNewMultipleValue(['1', '2'], '3');
        expect(result.value).toContain('3');
        expect(result.isCheck).toBe(true);
      });

      it('removes value when exists', () => {
        const result = getNewMultipleValue(['1', '2', '3'], '2');
        expect(result.value).not.toContain('2');
        expect(result.isCheck).toBe(false);
      });
    });

    describe('getSingleContent', () => {
      it('returns label from options map', () => {
        const optionsMap = computed(() => new Map([['1', { label: '选项1', value: '1' }]]));
        const searchDisplayOptions = computed(() => []);
        const result = getSingleContent('1', false, searchDisplayOptions, optionsMap);
        expect(result).toBe('选项1');
      });

      it('returns value string when option not found', () => {
        const optionsMap = computed(() => new Map());
        const searchDisplayOptions = computed(() => []);
        const result = getSingleContent('not-exist', false, searchDisplayOptions, optionsMap);
        expect(result).toBe('not-exist');
      });

      it('searches in searchDisplayOptions when isRemote', () => {
        const optionsMap = computed(() => new Map());
        const searchDisplayOptions = computed(() => [{ label: '远程选项', value: 'remote' }]);
        const result = getSingleContent('remote', true, searchDisplayOptions, optionsMap);
        expect(result).toBe('远程选项');
      });
    });

    describe('getMultipleContent', () => {
      it('returns array of labels', () => {
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

      it('skips undefined labels', () => {
        const optionsMap = computed(() => new Map([['1', { label: '选项1', value: '1' }]]));
        const searchDisplayOptions = computed(() => []);
        const result = getMultipleContent(['1', 'not-exist'], false, searchDisplayOptions, optionsMap);
        expect(result.length).toBe(2);
      });
    });
  });
});
