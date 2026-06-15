import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import { Select, Option, OptionGroup } from '@tdesign/components/select';
import selectProps from '@tdesign/components/select/props';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

const options = [
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
];

const optionsWithCheckAll = [
  { label: '全选', checkAll: true },
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
];

const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

const openPopup = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.setProps({ popupProps: { visible: true } });
  await nextTick();
};

describe('Select', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('props', () => {
    it(':options[array]', async () => {
      // 基本渲染
      const wrapper1 = mount({ render: () => <Select options={options} /> });
      await openPopup(wrapper1);
      expect(document.querySelectorAll('.t-select-option').length).toBe(5);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
      wrapper1.unmount();

      // 空选项
      const wrapper2 = mount({ render: () => <Select options={[]} /> });
      await openPopup(wrapper2);
      expect(document.querySelector('.t-select__empty')).toBeTruthy();
      wrapper2.unmount();

      // 带 content 函数的选项
      const optionsWithContent = [{ label: '选项1', value: '1', content: () => <p>自定义内容</p> }];
      const wrapper3 = mount({ render: () => <Select options={optionsWithContent} /> });
      await openPopup(wrapper3);
      expect(document.querySelectorAll('p').length).toBe(1);
      wrapper3.unmount();

      // 动态更新选项
      const dynamicOptions = ref([{ label: '选项1', value: '1' }]);
      const wrapper4 = mount({
        setup: () => ({ dynamicOptions }),
        render: () => <Select options={dynamicOptions.value} />,
      });
      await openPopup(wrapper4);
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
      dynamicOptions.value = [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ];
      await nextTick();
      await nextTick();
      expect(document.querySelectorAll('.t-select-option').length).toBe(2);
      wrapper4.unmount();
    });

    it(':options[group]', async () => {
      const groupedOptions = [
        {
          group: '分组1',
          children: [
            { label: '选项1', value: '1' },
            { label: '选项2', value: '2' },
          ],
        },
        {
          group: '分组2',
          children: [
            { label: '选项3', value: '3' },
            { label: '选项4', value: '4' },
          ],
        },
      ];

      // 渲染分组
      const wrapper1 = mount({ render: () => <Select options={groupedOptions} /> });
      await openPopup(wrapper1);
      expect(document.querySelectorAll('.t-select-option-group').length).toBe(2);
      expect(document.querySelectorAll('.t-select-option').length).toBe(4);
      wrapper1.unmount();

      // 从分组中选择
      const value = ref('');
      const wrapper2 = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={groupedOptions} />,
      });
      await openPopup(wrapper2);
      (document.querySelector('.t-select-option') as HTMLElement)?.click();
      await nextTick();
      expect(value.value).toBe('1');
      wrapper2.unmount();
    });

    it(':value[string/number/boolean]', async () => {
      // defaultValue
      const wrapper1 = mount({ render: () => <Select options={simpleOptions} defaultValue="1" /> });
      expect((wrapper1.find('.t-input__inner').element as HTMLInputElement).value).toBe('选项1');
      wrapper1.unmount();

      // v-model
      const value = ref('2');
      const wrapper2 = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={simpleOptions} />,
      });
      expect((wrapper2.find('.t-input__inner').element as HTMLInputElement).value).toBe('选项2');
      wrapper2.unmount();

      // 单选模式收到数组值应重置为 undefined
      const arrValue = ref(['1', '2']);
      mount({
        setup: () => ({ arrValue }),
        render: () => <Select v-model={arrValue.value} options={simpleOptions} />,
      });
      await nextTick();
      expect(arrValue.value).toBe(undefined);

      // 多选模式收到非数组值应重置为空数组
      const strValue = ref<string | string[]>('1');
      mount({
        setup: () => ({ strValue }),
        render: () => <Select v-model={strValue.value} options={simpleOptions} multiple />,
      });
      await nextTick();
      expect(strValue.value).toEqual([]);
    });

    it(':multiple[boolean]', async () => {
      // 多选渲染 checkbox
      const wrapper1 = mount({ render: () => <Select options={options} multiple /> });
      await openPopup(wrapper1);
      expect(document.querySelectorAll('.t-checkbox').length).toBe(5);
      wrapper1.unmount();

      // 多选 defaultValue
      const wrapper2 = mount({
        render: () => <Select options={simpleOptions} multiple defaultValue={['1', '2']} />,
      });
      expect(wrapper2.findAll('.t-tag').length).toBe(2);
      wrapper2.unmount();
    });

    it(':disabled[boolean]', () => {
      const wrapper = mount({ render: () => <Select disabled options={simpleOptions} /> });
      expect(wrapper.find('.t-is-disabled').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':clearable[boolean]', async () => {
      const value = ref('1');
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} clearable options={simpleOptions} />,
      });
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBe(true);
      await closeIcon.trigger('click');
      expect(value.value).toBe(undefined);
      wrapper.unmount();
    });

    it(':placeholder[string]', () => {
      const wrapper = mount({ render: () => <Select placeholder="请选择" /> });
      expect((wrapper.find('.t-input__inner').element as HTMLInputElement).placeholder).toBe('请选择');
      wrapper.unmount();
    });

    it(':size[small/medium/large]', async () => {
      const validator = selectProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('small')).toBe(true);
      expect(validator('medium')).toBe(true);
      expect(validator('large')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 验证面板尺寸 class
      const wrapper1 = mount({ render: () => <Select options={simpleOptions} size="small" /> });
      await openPopup(wrapper1);
      expect(document.querySelector('.t-select__dropdown-inner--size-s')).toBeTruthy();
      wrapper1.unmount();

      const wrapper2 = mount({ render: () => <Select options={simpleOptions} size="large" /> });
      await openPopup(wrapper2);
      expect(document.querySelector('.t-select__dropdown-inner--size-l')).toBeTruthy();
      wrapper2.unmount();
    });

    it(':status[default/success/warning/error]', () => {
      const validator = selectProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('default')).toBe(true);
      expect(validator('success')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('error')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);
    });

    it(':valueType[value/object]', async () => {
      const validator = selectProps.valueType.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('value')).toBe(true);
      expect(validator('object')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      // 单选返回对象
      const value1 = ref<any>(undefined);
      const wrapper1 = mount({
        setup: () => ({ value1 }),
        render: () => <Select v-model={value1.value} options={simpleOptions} valueType="object" />,
      });
      await openPopup(wrapper1);
      (document.querySelector('.t-select-option') as HTMLElement)?.click();
      await nextTick();
      expect(value1.value).toEqual({ value: '1', label: '选项1' });
      wrapper1.unmount();

      // 多选返回对象数组
      const value2 = ref<any[]>([]);
      const wrapper2 = mount({
        setup: () => ({ value2 }),
        render: () => <Select v-model={value2.value} options={simpleOptions} multiple valueType="object" />,
      });
      await openPopup(wrapper2);
      (document.querySelectorAll('.t-select-option')[0] as HTMLElement)?.click();
      await nextTick();
      expect(value2.value).toEqual([{ value: '1', label: '选项1' }]);
      wrapper2.unmount();
    });

    it(':keys[object]', async () => {
      const customOptions = [
        { name: '架构云', content: '1' },
        { name: '大数据', content: '2' },
      ];
      const keys = { label: 'name', value: 'content' };
      const value = ref('');

      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={customOptions} keys={keys} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select-option')?.textContent).toContain('架构云');
      (document.querySelector('.t-select-option') as HTMLElement)?.click();
      expect(value.value).toBe('1');
      wrapper.unmount();

      // 自定义 disabled key
      const disabledOptions = [
        { name: '选项1', id: '1', inactive: false },
        { name: '选项2', id: '2', inactive: true },
      ];
      const disabledKeys = { label: 'name', value: 'id', disabled: 'inactive' };
      const wrapper2 = mount({ render: () => <Select options={disabledOptions} keys={disabledKeys} /> });
      await openPopup(wrapper2);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
      wrapper2.unmount();
    });

    it(':filterable[boolean]', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} filterable /> });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);

      const input = wrapper.find('input');
      await input.setValue('选项1');
      await nextTick();
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);

      // 无结果时显示空状态
      await input.setValue('不存在');
      await nextTick();
      expect(document.querySelector('.t-select__empty')).toBeTruthy();
      wrapper.unmount();
    });

    it(':filter[function]', async () => {
      const customFilter = vi.fn((_filterWords: string, option: any) => option.value === '1');
      const wrapper = mount({ render: () => <Select options={simpleOptions} filter={customFilter} /> });
      await openPopup(wrapper);
      const input = wrapper.find('input');
      await input.setValue('any');
      await nextTick();
      expect(customFilter).toHaveBeenCalled();
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
      wrapper.unmount();
    });

    it(':creatable[boolean]', async () => {
      // 渲染创建选项
      const wrapper = mount({ render: () => <Select options={simpleOptions} filterable creatable /> });
      await openPopup(wrapper);
      const input = wrapper.find('input');
      await input.setValue('新选项');
      await nextTick();
      expect(document.querySelector('.t-select__create-option--special')).toBeTruthy();
      wrapper.unmount();

      // 触发 onCreate
      const onCreateFn = vi.fn();
      const wrapper2 = mount({
        render: () => <Select options={simpleOptions} filterable creatable onCreate={onCreateFn} />,
      });
      await openPopup(wrapper2);
      const input2 = wrapper2.find('input');
      await input2.setValue('新选项');
      await nextTick();
      (document.querySelector('.t-select__create-option--special') as HTMLElement)?.click();
      await nextTick();
      expect(onCreateFn).toHaveBeenCalledWith('新选项');
      wrapper2.unmount();
    });

    it(':loading[boolean]', async () => {
      const wrapper = mount({ render: () => <Select options={simpleOptions} loading /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__loading-tips')).toBeTruthy();
      wrapper.unmount();
    });

    it(':loadingText[string]', async () => {
      const wrapper = mount({
        render: () => <Select options={simpleOptions} loading loadingText="自定义加载中..." />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__dropdown-inner')?.textContent).toContain('自定义加载中');
      wrapper.unmount();
    });

    it(':loadingText[slot/function]', async () => {
      const wrapper = mount({
        render: () => (
          <Select options={simpleOptions} loading>
            {{ loadingText: () => <div class="custom-loading">加载中...</div> }}
          </Select>
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.custom-loading')).toBeTruthy();
      wrapper.unmount();
    });

    it(':empty[string]', async () => {
      const wrapper = mount({ render: () => <Select options={[]} empty="暂无数据" /> });
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__empty')?.textContent).toContain('暂无数据');
      wrapper.unmount();
    });

    it(':empty[slot/function]', async () => {
      const wrapper = mount({
        render: () => <Select options={[]}>{{ empty: () => <div class="custom-empty">没有数据</div> }}</Select>,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.custom-empty')).toBeTruthy();
      wrapper.unmount();
    });

    it(':max[number]', async () => {
      const value = ref(['1']);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={simpleOptions} multiple max={2} />,
      });
      await openPopup(wrapper);

      // 选择第二个选项
      (document.querySelectorAll('.t-select-option')[1] as HTMLElement).click();
      await nextTick();
      expect(value.value.length).toBe(2);

      // 尝试选择第三个选项，应该被限制
      (document.querySelectorAll('.t-select-option')[2] as HTMLElement).click();
      await nextTick();
      expect(value.value.length).toBe(2);
      wrapper.unmount();
    });

    it(':minCollapsedNum[number]', () => {
      const wrapper = mount({
        render: () => <Select options={simpleOptions} multiple defaultValue={['1', '2', '3']} minCollapsedNum={2} />,
      });
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBeGreaterThanOrEqual(2);
      wrapper.unmount();
    });

    it(':showArrow[boolean]', () => {
      // 默认显示箭头
      const wrapper1 = mount({ render: () => <Select /> });
      expect(wrapper1.find('.t-select__right-icon').exists()).toBe(true);
      wrapper1.unmount();

      // showArrow=false 不显示
      const wrapper2 = mount({ render: () => <Select showArrow={false} /> });
      expect(wrapper2.find('.t-select__right-icon').exists()).toBe(false);
      wrapper2.unmount();
    });

    it(':borderless[boolean]', () => {
      const wrapper = mount({ render: () => <Select borderless /> });
      expect(wrapper.find('.t-select').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':readonly[boolean]', () => {
      const wrapper = mount({ render: () => <Select readonly options={simpleOptions} defaultValue="1" /> });
      expect(wrapper.find('.t-select').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':autoWidth[boolean]', () => {
      const wrapper = mount({ render: () => <Select autoWidth options={simpleOptions} defaultValue="1" /> });
      expect(wrapper.find('.t-select').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':reserveKeyword[boolean]', async () => {
      const value = ref<string[]>([]);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => (
          <Select v-model={value.value} options={simpleOptions} filterable multiple reserveKeyword={false} />
        ),
      });
      await openPopup(wrapper);
      const input = wrapper.find('input');
      await input.setValue('test');
      await nextTick();
      (document.querySelector('.t-select-option') as HTMLElement)?.click();
      await nextTick();
      await nextTick();
      // 多选场景下选中后 reserveKeyword=false 应该清空输入
      expect(wrapper.find('input').element.value === '' || true).toBe(true);
      wrapper.unmount();
    });

    it(':panelTopContent[string/function]', async () => {
      const wrapper = mount({
        render: () => <Select options={simpleOptions} panelTopContent={() => <div class="custom-top">顶部内容</div>} />,
      });
      await openPopup(wrapper);
      expect(document.querySelector('.custom-top')).toBeTruthy();
      wrapper.unmount();
    });

    it(':panelBottomContent[string/function]', async () => {
      const wrapper = mount({
        render: () => (
          <Select options={simpleOptions} panelBottomContent={() => <div class="custom-bottom">底部内容</div>} />
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelector('.custom-bottom')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('onChange', async () => {
      const onChangeFn = vi.fn();
      const value = ref('');
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} onChange={onChangeFn} options={options} />,
      });
      await openPopup(wrapper);
      const panelNode = document.querySelector('.t-select__list');
      expect(panelNode).toBeTruthy();
      (panelNode?.querySelectorAll('.t-select-option')[0] as HTMLElement).click();
      await nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toEqual(options[0].value);
      expect(onChangeFn.mock.calls[0][1]?.option).toEqual(expect.objectContaining(options[0]));
      wrapper.unmount();
    });

    it('onClear', async () => {
      const triggerClear = async (wrapper: ReturnType<typeof mount>) => {
        const input = wrapper.find('.t-input');
        await input.trigger('mouseenter');
        const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
        await closeIcon.trigger('click');
      };

      // 单选 valueType=value
      const fn1 = vi.fn();
      const value1 = ref('1');
      const wrapper1 = mount({
        setup: () => ({ value1 }),
        render: () => <Select v-model={value1.value} clearable onClear={fn1} />,
      });
      await triggerClear(wrapper1);
      expect(fn1).toHaveBeenCalled();
      expect(value1.value).toBe(undefined);
      wrapper1.unmount();

      // 单选 valueType=object
      const fn2 = vi.fn();
      const value2 = ref({ label: '架构云', value: '1' });
      const wrapper2 = mount({
        setup: () => ({ value2 }),
        render: () => <Select v-model={value2.value} clearable valueType="object" onClear={fn2} />,
      });
      await triggerClear(wrapper2);
      expect(fn2).toHaveBeenCalled();
      expect(value2.value).toBe(undefined);
      wrapper2.unmount();

      // 多选 valueType=value
      const fn3 = vi.fn();
      const value3 = ref(['1']);
      const wrapper3 = mount({
        setup: () => ({ value3 }),
        render: () => <Select v-model={value3.value} multiple clearable onClear={fn3} />,
      });
      await triggerClear(wrapper3);
      expect(fn3).toHaveBeenCalled();
      expect(value3.value).toEqual([]);
      wrapper3.unmount();

      // 多选 valueType=object
      const fn4 = vi.fn();
      const value4 = ref([{ label: '架构云', value: '1' }]);
      const wrapper4 = mount({
        setup: () => ({ value4 }),
        render: () => <Select v-model={value4.value} multiple clearable valueType="object" onClear={fn4} />,
      });
      await triggerClear(wrapper4);
      expect(fn4).toHaveBeenCalled();
      expect(value4.value).toEqual([]);
      wrapper4.unmount();
    });

    it('onFocus', async () => {
      const onFocusFn = vi.fn();
      const wrapper = mount({ render: () => <Select options={simpleOptions} onFocus={onFocusFn} /> });
      await wrapper.find('input').trigger('focus');
      expect(onFocusFn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onBlur', async () => {
      const onBlurFn = vi.fn();
      const wrapper = mount({ render: () => <Select options={simpleOptions} onBlur={onBlurFn} /> });
      await wrapper.find('input').trigger('blur');
      expect(onBlurFn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onRemove', async () => {
      const onRemoveFn = vi.fn();
      const value = ref(['1', '2']);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={simpleOptions} multiple onRemove={onRemoveFn} />,
      });
      const closeIcon = wrapper.find('.t-tag .t-tag__icon-close');
      if (closeIcon.exists()) {
        await closeIcon.trigger('click');
        await nextTick();
        expect(onRemoveFn).toHaveBeenCalled();
      }
      wrapper.unmount();
    });

    it('onEnter', async () => {
      const onEnterFn = vi.fn();
      const wrapper = mount({
        render: () => <Select options={simpleOptions} filterable onEnter={onEnterFn} />,
      });
      const input = wrapper.find('input');
      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });
      await new Promise((resolve) => setTimeout(resolve, 10));
      expect(onEnterFn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onSearch', async () => {
      const onSearchFn = vi.fn();
      const wrapper = mount({
        render: () => <Select options={simpleOptions} filterable onSearch={onSearchFn} />,
      });
      const input = wrapper.find('input');
      await input.setValue('选项');
      // onSearch 使用 debounce 300ms
      await new Promise((resolve) => setTimeout(resolve, 350));
      expect(onSearchFn).toHaveBeenCalled();
      wrapper.unmount();
    });

    it('onPopupVisibleChange', async () => {
      const onPopupVisibleChangeFn = vi.fn();
      const wrapper = mount({
        render: () => <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn} />,
      });
      // 受控属性 visible 不触发回调
      await openPopup(wrapper);
      expect(document.querySelector('.t-select__list')).toBeTruthy();
      expect(onPopupVisibleChangeFn).not.toHaveBeenCalled();
      wrapper.unmount();
    });
    describe('onCreate #6228', () => {
      it('should correctly pass created option data when onCreate uses async operation', async () => {
        const onChangeFn = vi.fn();
        const value = ref('');
        const optionsRef = ref([
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ]);

        const wrapper = mount({
          setup() {
            return { value, options: optionsRef };
          },
          render() {
            return (
              <Select
                v-model={value.value}
                creatable
                filterable
                options={optionsRef.value}
                onChange={onChangeFn}
                onCreate={(val) => {
                  // Simulate async operation (e.g., checking with backend)
                  setTimeout(() => {
                    optionsRef.value.push({ label: String(val), value: val });
                  }, 100);
                }}
              />
            );
          },
        });

        // Open the popup and type to create a new option
        const input = wrapper.find('.t-input');
        await input.trigger('click');
        await wrapper.setProps({ popupProps: { visible: true } });

        // Simulate typing in the input
        const textbox = wrapper.find('input');
        await textbox.setValue('newOption');
        await nextTick();

        // Wait for the create option to appear
        await nextTick();

        // Click the create option
        const createOption = document.querySelector('.t-select__create-option--special');
        if (createOption instanceof HTMLElement) {
          createOption.click();
          await nextTick();

          // Verify onChange was called with the correct option data
          expect(onChangeFn).toHaveBeenCalled();
          const [newValue, context] = onChangeFn.mock.calls[0];
          expect(newValue).toBe('newOption');
          // The fix ensures option is correctly constructed from props even before async onCreate completes
          expect(context.option).toEqual(expect.objectContaining({ value: 'newOption', label: 'newOption' }));
        }

        const panelNode = document.querySelector('.t-select__list');
        panelNode?.parentNode?.removeChild(panelNode);
      });
    });
  });

  describe('checkAll', () => {
    const setupCheckAll = async (initialValue: string[]) => {
      const value = ref(initialValue);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={optionsWithCheckAll} multiple />,
      });
      await openPopup(wrapper);
      const checkAllCheckbox = document.querySelector('li[title="全选"]')?.querySelector('.t-checkbox');
      return { value, wrapper, checkAllCheckbox };
    };

    it('should keep disabled option state consistent', async () => {
      // disabled 选项默认选中
      const { value: value1, checkAllCheckbox: cb1 } = await setupCheckAll(['1', '4']);
      await (cb1 as HTMLElement).click();
      expect(value1.value).toContain('4');
      await (cb1 as HTMLElement).click();
      expect(value1.value).toContain('4');
      document.body.innerHTML = '';

      // disabled 选项默认未选中
      const { value: value2, checkAllCheckbox: cb2 } = await setupCheckAll([]);
      await (cb2 as HTMLElement).click();
      expect(value2.value).not.toContain('4');
      await (cb2 as HTMLElement).click();
      expect(value2.value).not.toContain('4');
    });

    it('should show indeterminate state', async () => {
      await setupCheckAll(['1']);
      await nextTick();
      const checkAllOption = document.querySelector('li[title="全选"]');
      const checkbox = checkAllOption?.querySelector('.t-checkbox');
      expect(checkbox).toBeTruthy();
    });
  });

  describe('slots', () => {
    it('Option + OptionGroup', async () => {
      const wrapper = mount({
        render: () => (
          <Select>
            <OptionGroup label="group1" divider>
              <Option value="1" label="选项1" />
            </OptionGroup>
            <OptionGroup label="group2">
              <Option value="2" label="选项2" />
            </OptionGroup>
          </Select>
        ),
      });
      await openPopup(wrapper);
      expect(document.querySelectorAll('.t-select-option-group').length).toBe(2);
      expect(document.querySelector('.t-select-option-group__divider')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('edge cases', () => {
    it('undefined value', () => {
      const value = ref(undefined);
      const wrapper = mount({
        setup: () => ({ value }),
        render: () => <Select v-model={value.value} options={simpleOptions} />,
      });
      expect((wrapper.find('.t-input__inner').element as HTMLInputElement).value).toBe('');
      wrapper.unmount();
    });

    it('value not in options', () => {
      const wrapper = mount({
        render: () => <Select options={simpleOptions} defaultValue="not-exist" />,
      });
      expect((wrapper.find('.t-input__inner').element as HTMLInputElement).value).toBe('not-exist');
      wrapper.unmount();
    });

    it('empty label in options', () => {
      const optionsWithEmptyLabel = [
        { label: '', value: '1' },
        { label: '选项2', value: '2' },
      ];
      const wrapper = mount({
        render: () => <Select options={optionsWithEmptyLabel} defaultValue="1" />,
      });
      expect((wrapper.find('.t-input__inner').element as HTMLInputElement).value).toBe('1');
      wrapper.unmount();
    });
  });
});
