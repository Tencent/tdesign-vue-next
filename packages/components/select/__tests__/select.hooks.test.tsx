import { ref, nextTick, computed } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Select } from '@tdesign/components/select';
import { getNewMultipleValue, getSingleContent, getMultipleContent } from '../utils';
import type { useKeyboardControlType } from '../hooks/useKeyboardControl';
import type { SelectOption, TdOptionProps } from '../type';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

const optionsWithDisabled = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2', disabled: true },
  { label: '选项3', value: '3' },
];

const optionsWithCheckAll = [
  { label: '全选', checkAll: true },
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
];

const openPopup = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.setProps({ popupProps: { visible: true } });
  await nextTick();
};

const createKeyboardControlContext = (
  overrides: Partial<useKeyboardControlType> = {},
): useKeyboardControlType & {
  scrollToMock: ReturnType<typeof vi.fn>;
} => {
  const scrollToMock = vi.fn();
  const mockPopupContent = { scrollTo: scrollToMock } as unknown as HTMLElement;
  const mockSelectPanelRef = {
    isVirtual: false,
    innerRef: { querySelector: () => ({ clientHeight: 32 }) } as unknown as HTMLDivElement,
  };

  const defaults: useKeyboardControlType = {
    displayOptions: computed((): SelectOption[] => simpleOptions),
    optionsList: computed((): TdOptionProps[] => simpleOptions),
    innerPopupVisible: ref(true),
    setInnerPopupVisible: vi.fn(),
    selectPanelRef: ref(mockSelectPanelRef),
    isFilterable: computed((): boolean => false),
    isRemoteSearch: computed((): boolean => false),
    getSelectedOptions: vi.fn().mockReturnValue([{ label: '选项1', value: '1' }]),
    setInnerValue: vi.fn(),
    onCheckAllChange: vi.fn(),
    isCheckAll: computed((): boolean => false),
    innerValue: ref([]),
    popupContentRef: computed((): HTMLElement => mockPopupContent),
    multiple: false,
    max: 0,
  };

  return { ...defaults, ...overrides, scrollToMock };
};

describe('Select Hooks', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('useKeyboardControl', () => {
    describe('ArrowUp', () => {
      it('sets index and navigates', async () => {
        const wrapper = mount({ render: () => <Select options={simpleOptions} /> });
        await openPopup(wrapper);
        const input = wrapper.find('input');

        // hoverIndex=-1 时按 ArrowUp
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();

        // 循环到最后一个
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();

        // 正常递减
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();
        wrapper.unmount();
      });

      it('skips disabled option', async () => {
        const wrapper = mount({ render: () => <Select options={optionsWithDisabled} /> });
        await openPopup(wrapper);
        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowUp' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();
        wrapper.unmount();
      });

      it('decrements hoverIndex (unit)', async () => {
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
          optionsList: computed((): any[] => optionsWithDisabled),
          displayOptions: computed((): any[] => optionsWithDisabled),
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
        const wrapper = mount({ render: () => <Select options={optionsWithDisabled} /> });
        await openPopup(wrapper);
        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();
        wrapper.unmount();
      });
    });

    describe('Enter', () => {
      it('breaks when hoverIndex is -1', async () => {
        const value = ref('');
        const wrapper = mount({
          setup: () => ({ value }),
          render: () => <Select v-model={value.value} options={simpleOptions} />,
        });
        await openPopup(wrapper);
        await wrapper.find('input').trigger('keydown', { code: 'Enter' });
        await nextTick();
        expect(value.value).toBe('');
        wrapper.unmount();
      });

      it('selects and closes popup in single mode', async () => {
        const value = ref('');
        const onChangeFn = vi.fn();
        const wrapper = mount({
          setup: () => ({ value }),
          render: () => <Select v-model={value.value} options={simpleOptions} onChange={onChangeFn} />,
        });
        await openPopup(wrapper);
        (document.querySelectorAll('.t-select-option')[0] as HTMLElement).click();
        await nextTick();
        expect(value.value).toBe('1');
        expect(onChangeFn).toHaveBeenCalled();
        wrapper.unmount();
      });

      it('toggles value in multiple mode', async () => {
        const value = ref<string[]>([]);
        const wrapper = mount({
          setup: () => ({ value }),
          render: () => <Select v-model={value.value} options={simpleOptions} multiple />,
        });
        await openPopup(wrapper);
        (document.querySelectorAll('.t-select-option')[0] as HTMLElement).click();
        await nextTick();
        expect(value.value).toContain('1');
        wrapper.unmount();
      });

      it('handles checkAll in multiple mode', async () => {
        const value = ref<string[]>([]);
        const wrapper = mount({
          setup: () => ({ value }),
          render: () => <Select v-model={value.value} options={optionsWithCheckAll} multiple />,
        });
        await openPopup(wrapper);
        const input = wrapper.find('input');
        await input.trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        await input.trigger('keydown', { code: 'Enter' });
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();
        wrapper.unmount();
      });

      it('respects max limit in multiple mode', async () => {
        const value = ref(['1', '2']);
        const wrapper = mount({
          setup: () => ({ value }),
          render: () => <Select v-model={value.value} options={simpleOptions} multiple max={2} />,
        });
        await openPopup(wrapper);
        // 直接点击第三个选项，应被 max 限制
        (document.querySelectorAll('.t-select-option')[2] as HTMLElement).click();
        await nextTick();
        expect(value.value.length).toBe(2);
        expect(value.value).not.toContain('3');
        wrapper.unmount();
      });

      it('opens popup when not visible (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({ innerPopupVisible: ref(false) });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);
        hoverIndex.value = 0;
        await nextTick();
        const event = { code: 'Enter', preventDefault: vi.fn() };
        handleKeyDown(event as unknown as KeyboardEvent);
        expect(ctx.setInnerPopupVisible).toHaveBeenCalledWith(true, { e: event });
      });

      it('selects in single mode (unit)', async () => {
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

      it('uses virtualFilteredOptions (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const virtualOptions = [{ label: '虚拟选项', value: 'virtual' }];
        const mockSelectPanelRef = {
          isVirtual: true,
          innerRef: { querySelector: () => ({ clientHeight: 32 }) } as unknown as HTMLDivElement,
        };
        const ctx = createKeyboardControlContext({
          selectPanelRef: ref(mockSelectPanelRef),
          isFilterable: computed((): boolean => true),
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
        const ctx = createKeyboardControlContext({ isRemoteSearch: computed((): boolean => true) });
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);
        filteredOptions.value = [];
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).toHaveBeenCalledWith('1', expect.any(Object));
      });

      it('fallbacks to optionsList when empty (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext();
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);
        filteredOptions.value = [];
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).toHaveBeenCalledWith('1', expect.any(Object));
      });

      it('handles checkAll in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({
          multiple: true,
          optionsList: computed((): any[] => optionsWithCheckAll),
          displayOptions: computed((): any[] => optionsWithCheckAll),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.onCheckAllChange).toHaveBeenCalledWith(true);
      });

      it('returns early when optionValue is undefined (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const optionsWithUndef: any[] = [{ label: '无值', value: undefined }];
        const ctx = createKeyboardControlContext({
          multiple: true,
          optionsList: computed((): any[] => optionsWithUndef),
          displayOptions: computed((): any[] => optionsWithUndef),
        });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).not.toHaveBeenCalled();
      });

      it('respects max limit (unit)', async () => {
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
        const ctx = createKeyboardControlContext({ multiple: true, innerValue: ref([]) });
        const { hoverIndex, handleKeyDown, filteredOptions } = useKeyboardControl(ctx);
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).toHaveBeenCalledWith(['1'], expect.objectContaining({ trigger: 'check' }));
        expect(filteredOptions.value).toEqual([]);
      });

      it('unchecks in multiple mode (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({ multiple: true, innerValue: ref(['1']) });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);
        hoverIndex.value = 0;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'uncheck' }));
      });

      it('returns early when hoverIndex is -1 in multiple (unit)', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext({ multiple: true, innerValue: ref([]) });
        const { hoverIndex, handleKeyDown } = useKeyboardControl(ctx);
        hoverIndex.value = -1;
        await nextTick();
        handleKeyDown({ code: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent);
        expect(ctx.setInnerValue).not.toHaveBeenCalled();
      });
    });

    describe('Escape', () => {
      it('closes popup', async () => {
        const onPopupVisibleChangeFn = vi.fn();
        const wrapper = mount({
          render: () => <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn} />,
        });
        await openPopup(wrapper);
        await wrapper.find('input').trigger('keydown', { code: 'Escape' });
        await nextTick();
        expect(onPopupVisibleChangeFn).toHaveBeenCalled();
        wrapper.unmount();
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

    describe('watcher', () => {
      it('resets hoverIndex when popup opens', async () => {
        const visible = ref(false);
        const wrapper = mount({
          setup: () => ({ visible }),
          render: () => <Select options={simpleOptions} popupProps={{ visible: visible.value }} />,
        });
        visible.value = true;
        await nextTick();
        await wrapper.find('input').trigger('keydown', { code: 'ArrowDown' });
        await nextTick();
        visible.value = false;
        await nextTick();
        visible.value = true;
        await nextTick();
        expect(document.querySelector('.t-select__list')).toBeTruthy();
        wrapper.unmount();
      });

      it('scrolls to hovered option', async () => {
        const { useKeyboardControl } = await import('../hooks/useKeyboardControl');
        const ctx = createKeyboardControlContext();
        const { hoverIndex } = useKeyboardControl(ctx);
        hoverIndex.value = 1;
        await nextTick();
        expect(ctx.scrollToMock).toHaveBeenCalledWith({ top: 32, behavior: 'smooth' });
      });
    });
  });

  describe('usePanelVirtualScroll', () => {
    it('does not activate when options below threshold', async () => {
      const wrapper = mount({
        render: () => <Select options={simpleOptions} scroll={{ type: 'virtual', threshold: 100 }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);
      wrapper.unmount();
    });

    it('activates when options exceed threshold', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render: () => <Select options={manyOptions} scroll={{ type: 'virtual', threshold: 100 }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
      wrapper.unmount();
    });

    it('uses default threshold', async () => {
      const manyOptions = Array.from({ length: 150 }, (_, i) => ({
        label: `选项${i + 1}`,
        value: `${i + 1}`,
      }));
      const wrapper = mount({
        render: () => <Select options={manyOptions} scroll={{ type: 'virtual' }} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__dropdown-inner')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('useSelectOptions', () => {
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
      const wrapper = mount({ render: () => <Select options={groupedOptions} /> });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-select-option-group').length).toBe(1);
      wrapper.unmount();
    });

    it('uses custom filter', async () => {
      const customFilter = vi.fn((_: string, option: any) => option.value === '1');
      const wrapper = mount({ render: () => <Select options={simpleOptions} filter={customFilter} /> });
      await openPopup(wrapper);
      await wrapper.find('input').setValue('any');
      await nextTick();
      expect(customFilter).toHaveBeenCalled();
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
      wrapper.unmount();
    });

    it('keeps checkAll option when filtering', async () => {
      const wrapper = mount({
        render: () => <Select options={optionsWithCheckAll} filterable multiple />,
      });
      await openPopup(wrapper);
      await wrapper.find('input').setValue('选项1');
      await nextTick();
      expect(document.querySelector('li[title="全选"]')).toBeTruthy();
      wrapper.unmount();
    });

    it('filters grouped option children', async () => {
      const groupedOptions = [
        {
          group: '分组1',
          children: [
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
          ],
        },
      ];
      const wrapper = mount({ render: () => <Select options={groupedOptions} filterable /> });
      await openPopup(wrapper);
      await wrapper.find('input').setValue('苹');
      await nextTick();
      expect(document.querySelectorAll('.t-select-option').length).toBeGreaterThanOrEqual(1);
      wrapper.unmount();
    });
  });

  describe('utils', () => {
    describe('getNewMultipleValue', () => {
      it('adds new value', () => {
        const result = getNewMultipleValue(['1', '2'], '3');
        expect(result.value).toContain('3');
        expect(result.isCheck).toBe(true);
      });

      it('removes existing value', () => {
        const result = getNewMultipleValue(['1', '2', '3'], '2');
        expect(result.value).not.toContain('2');
        expect(result.isCheck).toBe(false);
      });
    });

    describe('getSingleContent', () => {
      it('returns label from options map', () => {
        const optionsMap = computed((): Map<string, any> => new Map([['1', { label: '选项1', value: '1' }]]));
        const searchDisplayOptions = computed((): any[] => []);
        expect(getSingleContent('1', false, searchDisplayOptions, optionsMap)).toBe('选项1');
      });

      it('returns value string when not found', () => {
        const optionsMap = computed((): Map<string, any> => new Map());
        const searchDisplayOptions = computed((): any[] => []);
        expect(getSingleContent('not-exist', false, searchDisplayOptions, optionsMap)).toBe('not-exist');
      });

      it('searches in remote options', () => {
        const optionsMap = computed((): Map<string, any> => new Map());
        const searchDisplayOptions = computed((): any[] => [{ label: '远程选项', value: 'remote' }]);
        expect(getSingleContent('remote', true, searchDisplayOptions, optionsMap)).toBe('远程选项');
      });
    });

    describe('getMultipleContent', () => {
      it('returns array of labels', () => {
        const optionsMap = computed(
          (): Map<string, any> =>
            new Map([
              ['1', { label: '选项1', value: '1' }],
              ['2', { label: '选项2', value: '2' }],
            ]),
        );
        const searchDisplayOptions = computed((): any[] => []);
        expect(getMultipleContent(['1', '2'], false, searchDisplayOptions, optionsMap)).toEqual(['选项1', '选项2']);
      });

      it('includes value fallback for missing labels', () => {
        const optionsMap = computed((): Map<string, any> => new Map([['1', { label: '选项1', value: '1' }]]));
        const searchDisplayOptions = computed((): any[] => []);
        const result = getMultipleContent(['1', 'not-exist'], false, searchDisplayOptions, optionsMap);
        expect(result.length).toBe(2);
      });
    });
  });
});
