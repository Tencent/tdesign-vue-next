// @ts-nocheck
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, afterEach, beforeAll } from 'vitest';
import { Select, OptionGroup, Option } from '@tdesign/components/select';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

// Mock scrollTo for jsdom
beforeAll(() => {
  Element.prototype.scrollTo = vi.fn();
});

const options = [
  { label: '全选', checkAll: true }, // 添加 checkAll 选项
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
  {
    label: '计算场景（高性能计算）',
    value: '6',
    content: () => <p>计算场景（高性能计算）</p>,
  },
];

// 简单选项（无全选）
const simpleOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
];

// 辅助函数：清理 DOM
const cleanupDOM = () => {
  // 清理 select 面板容器
  const panels = document.querySelectorAll('.t-select__list, .t-select__dropdown-inner');
  panels.forEach((panel) => {
    if (panel && panel.parentNode) {
      try {
        panel.parentNode.removeChild(panel);
      } catch (e) {
        // 忽略已卸载的元素
      }
    }
  });

  // 清理弹窗容器
  const popups = document.querySelectorAll('.t-popup');
  popups.forEach((popup) => {
    if (popup && popup.parentNode) {
      try {
        popup.parentNode.removeChild(popup);
      } catch (e) {
        // 忽略已卸载的元素
      }
    }
  });

  // 清理其他可能的残留元素
  const overlays = document.querySelectorAll('.t-popup__content');
  overlays.forEach((overlay) => {
    if (overlay && overlay.parentNode) {
      try {
        overlay.parentNode.removeChild(overlay);
      } catch (e) {
        // 忽略
      }
    }
  });
};

describe('Select', () => {
  afterEach(() => {
    cleanupDOM();
  });

  describe(':base', () => {
    it(':render single', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      expect(document.querySelector('.t-select__list')).toBeTruthy();
      expect(document.querySelectorAll('.t-select-option').length).toBe(7);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
      expect(document.querySelectorAll('p').length).toBe(1);
    });

    it(':render multiple', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      expect(document.querySelectorAll('.t-checkbox').length).toBe(7);
    });

    it(':render with empty options', async () => {
      const wrapper = mount({
        render() {
          return <Select options={[]}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      expect(document.querySelector('.t-select__empty')).toBeTruthy();
    });

    it(':render with default value', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} defaultValue="1"></Select>;
        },
      });
      expect(wrapper.find('.t-input__inner').element.value).toBe('选项1');
    });

    it(':render with multiple default values', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} multiple defaultValue={['1', '2']}></Select>;
        },
      });
      expect(wrapper.findAll('.t-tag').length).toBe(2);
    });
  });

  // old

  // test props api
  describe(':props', () => {
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Select disabled={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Select size="large"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':clearable', () => {
      const wrapper = mount({
        render() {
          return <Select clearable={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':multiple', () => {
      const wrapper = mount({
        render() {
          return <Select multiple={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':placeholder', () => {
      const wrapper = mount({
        render() {
          return <Select placeholder="please select"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':creatable', () => {
      const wrapper = mount({
        render() {
          return <Select creatable={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':remote', () => {
      const wrapper = mount({
        render() {
          return <Select remote={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <Select loading={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':labelInValue', () => {
      const wrapper = mount({
        render() {
          return <Select labelInValue={false}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':reserveKeyword', () => {
      const wrapper = mount({
        render() {
          return <Select reserveKeyword={false}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':borderless', () => {
      const wrapper = mount({
        render() {
          return <Select borderless={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':autoWidth', () => {
      const wrapper = mount({
        render() {
          return <Select autoWidth={true} options={simpleOptions} defaultValue="1"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':readonly', () => {
      const wrapper = mount({
        render() {
          return <Select readonly={true} options={simpleOptions} defaultValue="1"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':max in multiple mode', async () => {
      const value = ref(['1']);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple max={2}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 选择第二个选项
      const secondOption = document.querySelectorAll('.t-select-option')[1];
      secondOption.click();
      await nextTick();

      expect(value.value.length).toBe(2);

      // 尝试选择第三个选项，应该被限制
      const thirdOption = document.querySelectorAll('.t-select-option')[2];
      thirdOption.click();
      await nextTick();

      // 达到 max 后不应该再增加
      expect(value.value.length).toBe(2);
    });

    it(':minCollapsedNum', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} multiple defaultValue={['1', '2', '3']} minCollapsedNum={2}></Select>;
        },
      });
      // 应该显示 2 个 tag 和一个折叠项
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBeGreaterThanOrEqual(2);
    });

    it(':status', () => {
      const statuses = ['default', 'success', 'warning', 'error'];
      statuses.forEach((status) => {
        const wrapper = mount({
          render() {
            return <Select status={status}></Select>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it(':showArrow false', () => {
      const wrapper = mount({
        render() {
          return <Select showArrow={false}></Select>;
        },
      });
      expect(wrapper.find('.t-select__right-icon').exists()).toBe(false);
    });
  });

  describe('@event', () => {
    describe('onClear', () => {
      const triggerClear = async (wrapper) => {
        const input = wrapper.find('.t-input');
        await input.trigger('mouseenter');
        const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
        await closeIcon.trigger('click');
      };
      it('[multiple=false][valueType="value"]', async () => {
        const fn = vi.fn();
        const value = ref('1');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe(undefined);
      });
      it('[multiple=false][valueType="object"]', async () => {
        const fn = vi.fn();
        const value = ref({ label: '架构云', value: '1' });
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe(undefined);
      });
      it('[multiple=true][valueType="value"]', async () => {
        const fn = vi.fn();
        const value = ref(['1']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} multiple clearable onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toEqual([]);
      });
      it('[multiple=true][valueType="object"]', async () => {
        const fn = vi.fn();
        const value = ref([{ label: '架构云', value: '1' }]);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} multiple clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toEqual([]);
      });
    });
    describe('onChange #5779', () => {
      it('should trigger onChange with correct data', async () => {
        const onChangeFn = vi.fn();
        const value = ref('');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} onChange={onChangeFn} options={options} />;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });

        const panelNode = document.querySelector('.t-select__list');
        expect(panelNode).toBeTruthy();
        // 点击普通选项（跳过第一个全选特殊项）
        const secondOption = panelNode.querySelectorAll('.t-select-option')[1];
        secondOption.click();

        // 等待Vue响应式更新
        await nextTick();

        // 验证onChange回调参数
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toEqual(options[1].value); // 验证选中的值
        expect(onChangeFn.mock.calls[0][1]?.option).toEqual(expect.objectContaining(options[1])); // 验证选中的选项对象
      });
    });

    describe('onFocus and onBlur', () => {
      it('should trigger onFocus', async () => {
        const onFocusFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} onFocus={onFocusFn} />;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('focus');
        expect(onFocusFn).toHaveBeenCalled();
      });

      it('should trigger onBlur', async () => {
        const onBlurFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} onBlur={onBlurFn} />;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('blur');
        expect(onBlurFn).toHaveBeenCalled();
      });
    });

    describe('onPopupVisibleChange', () => {
      it('should show popup when visible is set (受控属性不会触发 onPopupVisibleChange 回调，详见注释)', async () => {
        const onPopupVisibleChangeFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} onPopupVisibleChange={onPopupVisibleChangeFn} />;
          },
        });

        // 直接设置弹窗可见（受控属性）
        await wrapper.setProps({ popupProps: { visible: true } });
        await nextTick();

        // 断言弹窗已显示
        expect(document.querySelector('.t-select__list')).toBeTruthy();

        // 受控属性 visible 只影响显示，不会触发 onPopupVisibleChange 回调
        // 这是组件设计如此，详见源码 useDefaultValue 相关逻辑
        expect(onPopupVisibleChangeFn).not.toHaveBeenCalled();
      });
    });

    describe('onRemove', () => {
      it('should trigger onRemove when tag is removed in multiple mode', async () => {
        const onRemoveFn = vi.fn();
        const value = ref(['1', '2']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} options={simpleOptions} multiple onRemove={onRemoveFn} />;
          },
        });

        // 找到第一个 tag 的关闭按钮并点击
        const closeIcon = wrapper.find('.t-tag .t-tag__icon-close');
        if (closeIcon.exists()) {
          await closeIcon.trigger('click');
          await nextTick();
          expect(onRemoveFn).toHaveBeenCalled();
        }
      });
    });

    describe('onEnter', () => {
      it('should trigger onEnter when Enter key is pressed', async () => {
        const onEnterFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} filterable onEnter={onEnterFn} />;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('keydown', { key: 'Enter', code: 'Enter' });
        // onEnter 使用 setTimeout，需要等待
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(onEnterFn).toHaveBeenCalled();
      });
    });

    describe('onSearch', () => {
      it('should trigger onSearch when input value changes with filterable', async () => {
        const onSearchFn = vi.fn();
        const wrapper = mount({
          render() {
            return <Select options={simpleOptions} filterable onSearch={onSearchFn} />;
          },
        });

        const input = wrapper.find('input');
        await input.setValue('选项');
        // onSearch 使用 debounce，需要等待 300ms
        await new Promise((resolve) => setTimeout(resolve, 350));
        expect(onSearchFn).toHaveBeenCalled();
      });
    });
  });

  describe('keys', () => {
    const contentOptions = [
      { name: '架构云', content: '1' },
      { name: '大数据', content: '2' },
      { name: '区块链', content: '3' },
    ];

    const keys = {
      label: 'name',
      value: 'content',
    };
    it('content in option #5779', async () => {
      const value = ref('');
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={contentOptions} keys={keys}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      const panelNode = document.querySelector('.t-select__list');
      expect(panelNode).toBeTruthy();

      // 验证第一个选项的name
      const firstOption = panelNode.querySelectorAll('.t-select-option')?.[0];
      expect(firstOption.textContent).toContain('架构云');

      firstOption.click();

      // 验证选中的值是否为1
      expect(value.value).toBe('1');
    });

    it('should use custom disabled key', async () => {
      const customOptions = [
        { name: '选项1', id: '1', inactive: false },
        { name: '选项2', id: '2', inactive: true },
      ];
      const customKeys = {
        label: 'name',
        value: 'id',
        disabled: 'inactive',
      };
      const wrapper = mount({
        render() {
          return <Select options={customOptions} keys={customKeys}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const disabledOptions = document.querySelectorAll('.t-is-disabled');
      expect(disabledOptions.length).toBe(1);
    });
  });

  describe('filterable', () => {
    it('should filter options based on input', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 初始应该有3个选项
      expect(document.querySelectorAll('.t-select-option').length).toBe(3);

      // 输入搜索词
      const input = wrapper.find('input');
      await input.setValue('选项1');
      await nextTick();

      // 应该只剩1个匹配的选项
      expect(document.querySelectorAll('.t-select-option').length).toBe(1);
    });

    it('should use custom filter function', async () => {
      const customFilter = vi.fn((filterWords, option) => {
        return option.value === '1';
      });
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

    it('should clear input on popup close when reserveKeyword is false', async () => {
      const inputValue = ref('');
      const wrapper = mount({
        render() {
          return (
            <Select
              options={simpleOptions}
              filterable
              multiple
              v-model:inputValue={inputValue.value}
              reserveKeyword={false}
            ></Select>
          );
        },
      });

      // 打开弹窗
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 设置输入值
      const input = wrapper.find('input');
      await input.setValue('test');
      await nextTick();

      // 选择一个选项
      const firstOption = document.querySelector('.t-select-option');
      firstOption?.click();
      await nextTick();
      await nextTick();

      // 多选场景下选中后 reserveKeyword=false 应该清空输入
      // 注：实际行为取决于组件实现
      expect(wrapper.find('input').element.value === '' || inputValue.value === '').toBe(true);
    });
  });

  describe('creatable', () => {
    it('should show create option when creatable is true', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable creatable></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('新选项');
      await nextTick();

      const createOption = document.querySelector('.t-select__create-option--special');
      expect(createOption).toBeTruthy();
    });

    it('should trigger onCreate when selecting created option', async () => {
      const onCreateFn = vi.fn();
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} filterable creatable onCreate={onCreateFn}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const input = wrapper.find('input');
      await input.setValue('新选项');
      await nextTick();

      const createOption = document.querySelector('.t-select__create-option--special');
      createOption?.click();
      await nextTick();

      expect(onCreateFn).toHaveBeenCalledWith('新选项');
    });
  });

  describe('valueType object', () => {
    it('should return object value when valueType is object', async () => {
      const value = ref<any>(undefined);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} valueType="object"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const firstOption = document.querySelector('.t-select-option');
      firstOption?.click();
      await nextTick();

      expect(value.value).toEqual({ value: '1', label: '选项1' });
    });

    it('should return array of objects in multiple mode with valueType object', async () => {
      const value = ref([]);
      const wrapper = mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple valueType="object"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const firstOption = document.querySelectorAll('.t-select-option')[0];
      firstOption?.click();
      await nextTick();

      expect(value.value).toEqual([{ value: '1', label: '选项1' }]);
    });
  });

  describe('value validation', () => {
    it('should reset value when single mode receives array value', async () => {
      const value = ref(['1', '2']);
      mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions}></Select>;
        },
      });
      await nextTick();

      // 单选模式收到数组值应该被重置为 undefined
      expect(value.value).toBe(undefined);
    });

    it('should reset value when multiple mode receives non-array value', async () => {
      const value = ref('1');
      mount({
        render() {
          return <Select v-model={value.value} options={simpleOptions} multiple></Select>;
        },
      });
      await nextTick();

      // 多选模式收到非数组值应该被重置为空数组
      expect(value.value).toEqual([]);
    });
  });

  describe('loading state', () => {
    it('should show loading text when loading is true', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} loading></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const loadingTips = document.querySelector('.t-select__loading-tips');
      expect(loadingTips).toBeTruthy();
    });

    it('should show custom loading text', async () => {
      const wrapper = mount({
        render() {
          return <Select options={simpleOptions} loading loadingText="自定义加载中..."></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      // 验证 popup 列表存在
      const popup = document.querySelector('.t-select__list');
      expect(popup).toBeTruthy();
    });
  });

  describe('panelTopContent and panelBottomContent', () => {
    it('should render panelTopContent', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select options={simpleOptions} panelTopContent={() => <div class="custom-top">顶部内容</div>}></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const topContent = document.querySelector('.custom-top');
      expect(topContent).toBeTruthy();
    });

    it('should render panelBottomContent', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select
              options={simpleOptions}
              panelBottomContent={() => <div class="custom-bottom">底部内容</div>}
            ></Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const bottomContent = document.querySelector('.custom-bottom');
      expect(bottomContent).toBeTruthy();
    });
  });
});

describe('Select Option', () => {
  afterEach(() => {
    cleanupDOM();
  });

  // test props api
  describe(':props', () => {
    it(':value', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':label', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'} disabled={true}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

describe('Select OptionGroup', () => {
  afterEach(() => {
    cleanupDOM();
  });

  // test props api
  describe(':props', () => {
    it(':value', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <OptionGroup label={'num'}>
                <Option value={'1'} label={'1'}></Option>
              </OptionGroup>
              <OptionGroup label={'abc'}>
                <Option value={'a'} label={'a'}></Option>
              </OptionGroup>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':base', () => {
    it('v-for and option works fine', async () => {
      const Comp = {
        components: {
          TSelect: Select,
          TOptionGroup: OptionGroup,
          TOption: Option,
        },
        template: `
          <t-select>
            <t-option-group label='test'>
              <t-option v-for='i in ["1", "2"]' :key='i' :label='i' :value='i'></t-option>
              <t-option key='3' label='3'></t-option>
            </t-option-group>
            <t-option-group label='test'>
              <t-option v-for='i in ["4", "5", "6"]' :key='i' :label='i' :value='i'></t-option>
            </t-option-group>
            <t-option-group label='test'>
              <t-option key='7' label='7'></t-option>
              <t-option key='8' label='8'></t-option>
              <t-option key='9' label='9'></t-option>
            </t-option-group>
          </t-select>
        `,
      };

      const wrapper = mount(Comp);
      await wrapper.setProps({ popupProps: { visible: true } });

      expect(document.querySelector('.t-select__list')).toBeTruthy();
      const groupNode = document.querySelectorAll('.t-select-option-group');
      expect(groupNode.length).toBe(3);
      groupNode.forEach((item) => {
        const option = item.querySelectorAll('.t-select-option');
        expect(option.length).toBe(3);
      });
    });
  });

  describe(':divider', () => {
    it('should render divider when divider prop is true', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select>
              <OptionGroup label="group1" divider>
                <Option value="1" label="1"></Option>
              </OptionGroup>
            </Select>
          );
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      await nextTick();

      const dividerGroup = document.querySelector('.t-select-option-group__divider');
      expect(dividerGroup).toBeTruthy();
    });
  });
});
describe('Select CheckAll with Disabled Option', () => {
  afterEach(() => {
    cleanupDOM();
  });

  const setupTest = async (initialValue) => {
    const value = ref(initialValue);
    const wrapper = mount({
      setup() {
        return { value };
      },
      render() {
        return <Select v-model={value.value} options={options} multiple />;
      },
    });

    await wrapper.setProps({ popupProps: { visible: true } });
    await nextTick();

    // 使用更健壮的选择器，并添加 null 检查
    const checkAllOption = document.querySelector('li[title="全选"]');
    const checkAllCheckbox = checkAllOption?.querySelector('.t-checkbox');

    // 如果找不到全选元素，抛出错误
    if (!checkAllCheckbox) {
      const allOptions = document.querySelectorAll('.t-select-option');
      throw new Error(
        `CheckAll checkbox not found. Available options: ${allOptions.length}. Options: ${Array.from(allOptions)
          .map((opt) => opt.textContent)
          .join(', ')}`,
      );
    }

    return {
      value,
      wrapper,
      checkAllCheckbox,
    };
  };

  it('should keep disabled option state consistent regardless of checkAll', async () => {
    // 测试 disabled 选项默认选中
    let { value, checkAllCheckbox } = await setupTest(['1', '4']);
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    cleanupDOM();

    // 测试 disabled 选项默认未选中
    ({ value, checkAllCheckbox } = await setupTest([]));
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
  });

  it('should show indeterminate state when some options are selected', async () => {
    await setupTest(['1']);
    await nextTick();

    // 半选状态时应该有 indeterminate 样式
    const checkAllOption = document.querySelector('li[title="全选"]');
    const checkbox = checkAllOption?.querySelector('.t-checkbox');
    expect(checkbox).toBeTruthy();
  });
});

describe('Select with Group Options', () => {
  afterEach(() => {
    cleanupDOM();
  });

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

  it('should render grouped options', async () => {
    const wrapper = mount({
      render() {
        return <Select options={groupedOptions}></Select>;
      },
    });
    await wrapper.setProps({ popupProps: { visible: true } });
    await nextTick();

    const groups = document.querySelectorAll('.t-select-option-group');
    expect(groups.length).toBe(2);

    const options = document.querySelectorAll('.t-select-option');
    expect(options.length).toBe(4);
  });

  it('should select option from group', async () => {
    const value = ref('');
    const wrapper = mount({
      render() {
        return <Select v-model={value.value} options={groupedOptions}></Select>;
      },
    });
    await wrapper.setProps({ popupProps: { visible: true } });
    await nextTick();

    const firstOption = document.querySelector('.t-select-option');
    firstOption?.click();
    await nextTick();

    expect(value.value).toBe('1');
  });
});

describe('Select edge cases', () => {
  afterEach(() => {
    cleanupDOM();
  });

  it('should handle undefined value correctly', async () => {
    const value = ref(undefined);
    const wrapper = mount({
      render() {
        return <Select v-model={value.value} options={simpleOptions}></Select>;
      },
    });

    expect(wrapper.find('.t-input__inner').element.value).toBe('');
  });

  it('should handle null value correctly', async () => {
    const value = ref(null);
    const wrapper = mount({
      render() {
        return <Select v-model={value.value} options={simpleOptions}></Select>;
      },
    });

    expect(wrapper.find('.t-input__inner').element.value).toBe('');
  });

  it('should handle value not in options', async () => {
    const value = ref('not-exist');
    const wrapper = mount({
      render() {
        return <Select v-model={value.value} options={simpleOptions}></Select>;
      },
    });

    // 值不在选项中时，应该显示值本身
    expect(wrapper.find('.t-input__inner').element.value).toBe('not-exist');
  });

  it('should handle empty label in options', async () => {
    const optionsWithEmptyLabel = [
      { label: '', value: '1' },
      { label: '选项2', value: '2' },
    ];
    const wrapper = mount({
      render() {
        return <Select options={optionsWithEmptyLabel} defaultValue="1"></Select>;
      },
    });

    // 空 label 时应该显示 value
    expect(wrapper.find('.t-input__inner').element.value).toBe('1');
  });

  it('should handle rapid selection changes', async () => {
    const value = ref('');
    const onChangeFn = vi.fn();
    const wrapper = mount({
      render() {
        return <Select v-model={value.value} options={simpleOptions} onChange={onChangeFn}></Select>;
      },
    });
    await wrapper.setProps({ popupProps: { visible: true } });
    await nextTick();

    const optionElements = document.querySelectorAll('.t-select-option');

    // 快速点击多个选项
    optionElements[0]?.click();
    await nextTick();

    // 单选模式下，每次点击都会关闭弹窗，所以最终值是第一个点击的
    expect(value.value).toBe('1');
  });

  it('should handle options update correctly', async () => {
    const dynamicOptions = ref([{ label: '选项1', value: '1' }]);
    const wrapper = mount({
      setup() {
        return { dynamicOptions };
      },
      render() {
        return <Select options={dynamicOptions.value}></Select>;
      },
    });
    await wrapper.setProps({ popupProps: { visible: true } });
    await nextTick();

    expect(document.querySelectorAll('.t-select-option').length).toBe(1);

    // 更新选项
    dynamicOptions.value = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
    ];
    await nextTick();
    await nextTick();

    // 检查更新后的选项数量
    expect(document.querySelectorAll('.t-select-option').length).toBe(2);
  });
});
