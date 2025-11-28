// @ts-nocheck
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect } from 'vitest';
import { Select, OptionGroup, Option } from '@tdesign/components/select';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

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

describe('Select', () => {
  describe(':base', () => {
    it(':render single', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-select__list');
      expect(document.querySelectorAll('.t-select-option').length).toBe(7);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
      expect(document.querySelectorAll('p').length).toBe(1);
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':render multiple', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-select__list');
      expect(document.querySelectorAll('.t-checkbox').length).toBe(7);
      panelNode.parentNode.removeChild(panelNode);
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
      // TODO: remove skip when multiple select clear icon class bug fixed
      it.skip('[multiple=true][valueType="value"]', async () => {
        const fn = vi.fn();
        const value = ref(['1']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe([]);
      });
      // TODO: remove skip when multiple select clear icon class bug fixed
      it.skip('[multiple=true][valueType="object"]', async () => {
        const fn = vi.fn();
        const value = ref([{ label: '架构云', value: '1' }]);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe([]);
      });
    });
    // TODO: rename describe name
    describe('onChange #5779', () => {
      it('should trigger onChange with correct data', async () => {
        const onChangeFn = vi.fn();
        const value = ref('');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} onChange={onChangeFn} options={options} />;
          },
        });

        const input = wrapper.find('.t-input');
        await input.trigger('click');
        await wrapper.setProps({ popupProps: { visible: true } });

        const panelNode = document.querySelector('.t-select__list');
        // 点击普通选项（跳过第一个全选特殊项）
        const secondOption = panelNode.querySelectorAll('.t-select-option')[1];
        secondOption.click();

        // 等待Vue响应式更新
        await nextTick();

        // 验证onChange回调参数
        expect(onChangeFn).toHaveBeenCalled();
        expect(onChangeFn.mock.calls[0][0]).toEqual(options[1].value); // 验证选中的值
        expect(onChangeFn.mock.calls[0][1]?.option).toEqual(expect.objectContaining(options[1])); // 验证选中的选项对象

        panelNode.parentNode.removeChild(panelNode);
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
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');

      await wrapper.setProps({ popupProps: { visible: true } });
      const panelNode = document.querySelector('.t-select__list');

      // 验证第一个选项的name
      const firstOption = panelNode.querySelectorAll('.t-select-option')?.[0];
      expect(firstOption.textContent).toContain('架构云');

      firstOption.click();

      // 验证选中的值是否为1
      expect(value.value).toBe('1');

      panelNode.parentNode.removeChild(panelNode);
    });
  });
});

describe('Select Option', () => {
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

      const panelNode = document.querySelector('.t-select__list');
      const groupNode = document.querySelectorAll('.t-select-option-group');
      expect(groupNode.length).toBe(3);
      groupNode.forEach((item) => {
        const option = item.querySelectorAll('.t-select-option');
        expect(option.length).toBe(3);
      });
      panelNode.parentNode.removeChild(panelNode);
    });
  });
});
describe('Select CheckAll with Disabled Option', () => {
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
    const checkAllCheckbox = document.querySelector('li[title="全选"] .t-checkbox');

    return {
      value,
      wrapper,
      checkAllCheckbox,
      cleanup: () => {
        const panelNode = document.querySelector('.t-select__list');
        panelNode.parentNode.removeChild(panelNode);
      },
    };
  };

  it('should keep disabled option state consistent regardless of checkAll', async () => {
    // 测试 disabled 选项默认选中
    let { value, checkAllCheckbox, cleanup } = await setupTest(['1', '4']);
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    cleanup();

    // 测试 disabled 选项默认未选中
    ({ value, checkAllCheckbox, cleanup } = await setupTest([]));
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
    cleanup();
  });
});

describe('Select Creatable with Async onCreate', () => {
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
    if (createOption) {
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
    if (panelNode) panelNode.parentNode.removeChild(panelNode);
  });
});
