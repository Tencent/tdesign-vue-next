import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect } from 'vitest';
import { Select, OptionGroup, Option } from '@/src/select/index.ts';
import { Popup } from '@/src/popup/index.ts';
import { Tag } from '@/src/tag/index.ts';
import { Button } from '@/src/button/index.ts';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

const options = [
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
      expect(document.querySelectorAll('.t-select-option').length).toBe(6);
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
      expect(document.querySelectorAll('.t-checkbox').length).toBe(6);
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

    it(':collapsedItems', async () => {
      let visible = ref(false);

      const collapsedItems = (h, { collapsedSelectedItems, onClose }) => {
        if (!(collapsedSelectedItems instanceof Array)) return null;
        const count = collapsedSelectedItems.length;
        if (count <= 0) return null;
        return (
          <Popup visible={visible.value}>
            {{
              content: () =>
                collapsedSelectedItems.map((item, index) => (
                  <Button
                    key={item.value}
                    style={{ marginRight: '4px' }}
                    onClose={(context) => onClose({ e: context.e, index: 1 + index })}
                  >
                    {item.label}
                  </Button>
                )),
              default: () => <Tag>Function - More({count})</Tag>,
            }}
          </Popup>
        );
      };

      const currentOptions = [
        { label: '架构云', value: '1' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
      ];
      const currentValues = ['1', '2'];

      const wrapper = mount(
        {
          render() {
            return (
              <Select
                value={currentValues}
                options={currentOptions}
                minCollapsedNum={1}
                multiple
                collapsedItems={collapsedItems}
              ></Select>
            );
          },
        },
        {
          attachTo: document.body,
        },
      );

      const tags = wrapper.findAll('.t-tag');
      // 默认
      expect(tags.length).toBe(2);
      expect(tags[0].text()).toBe('架构云');
      expect(tags[1].text()).toBe('Function - More(1)');

      // collapsedItems popup 展示
      // 这里使用 triggerEvent 无法触发 mouseenter 事件展开 select popup
      visible.value = true;
      await wrapper.vm.$nextTick();
      const buttons = document.querySelectorAll('.t-button');
      expect(buttons.length).toBe(1);

      // 清理测试数据
      document.body.innerHTML = '';
    });

    it(':collapsedItems click', async () => {
      const visible = ref(false);
      const minCollapsedNum = 1;

      const collapsedItems = (h, { collapsedSelectedItems }) => {
        if (!(collapsedSelectedItems instanceof Array)) return null;
        const count = collapsedSelectedItems.length;
        if (count <= 0) return null;
        return (
          <Popup
            visible={visible.value}
            v-slots={{
              content: () => (
                <>
                  {collapsedSelectedItems.map((item, index) => (
                    <Button
                      key={item.value}
                      style={{ marginRight: '4px' }}
                      onClose={(context) => onClose({ e: context.e, index: minCollapsedNum + index })}
                    >
                      {item.label}
                    </Button>
                  ))}
                </>
              ),
            }}
          >
            <Tag>Function - More({count})</Tag>,
          </Popup>
        );
      };

      const currentOptions = [
        { label: '架构云', value: '1' },
        { label: '大数据', value: '2' },
        { label: '区块链', value: '3' },
      ];
      let selectedOptions = [];
      const onChange = (_value, context) => {
        selectedOptions = context.selectedOptions;
      };

      const wrapper = mount(
        {
          render() {
            return (
              <Select
                class="multiple-select"
                options={currentOptions}
                popupProps={{ attach: 'multiple-select' }}
                minCollapsedNum={minCollapsedNum}
                multiple
                collapsedItems={collapsedItems}
                onChange={onChange}
              ></Select>
            );
          },
        },
        {
          attachTo: document.body,
        },
      );

      // 默认
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(0);

      //  第一次选择
      // 目前无法通过 triggerEvent 触发 mouseenter 事件展开 select popup
      await wrapper.setProps({ popupProps: { attach: 'multiple-select', visible: true } });
      await wrapper.vm.$nextTick();
      const groupNode1 = wrapper.findAll('.t-select-option');
      expect(groupNode1.length).toBe(3);

      await groupNode1[0].trigger('click');
      await wrapper.vm.$nextTick();
      const tags1 = wrapper.findAll('.t-tag');
      expect(tags1.length).toBe(1);
      expect(tags1[0].text()).toBe(currentOptions[0].label);

      //  第二次选择(选择options的第三个数据-区块链)
      await wrapper.setProps({ popupProps: { attach: 'multiple-select', visible: true } });
      await wrapper.vm.$nextTick();
      const groupNode2 = wrapper.findAll('.t-select-option');
      expect(groupNode2.length).toBe(3);

      await groupNode2[2].trigger('click');
      await wrapper.vm.$nextTick();
      const tags2 = wrapper.findAll('.t-tag');
      expect(tags2.length).toBe(2);
      expect(tags2[0].text()).toBe(currentOptions[0].label);
      expect(tags2[1].text()).toBe(`Function - More(${selectedOptions.length - minCollapsedNum})`);
      // 这里使用 triggerEvent 无法触发 mouseenter 事件展开 select popup
      visible.value = true;
      await wrapper.vm.$nextTick();
      const buttons1 = document.querySelectorAll('.t-button');
      expect(buttons1.length).toBe(1);
      expect(buttons1[0].textContent).toBe('区块链');

      //  第三次选择(选择options的第二个数据-大数据)
      await wrapper.setProps({ popupProps: { attach: 'multiple-select', visible: true } });
      await wrapper.vm.$nextTick();
      const groupNode3 = wrapper.findAll('.t-select-option');
      expect(groupNode3.length).toBe(3);

      await groupNode3[1].trigger('click');
      await wrapper.vm.$nextTick();
      const tags3 = wrapper.findAll('.t-tag');
      expect(tags3.length).toBe(2);
      expect(tags3[0].text()).toBe(currentOptions[0].label);
      expect(tags3[1].text()).toBe(`Function - More(${selectedOptions.length - minCollapsedNum})`);
      // 这里使用 triggerEvent 无法触发 mouseenter 事件展开 select popup
      visible.value = true;
      await wrapper.vm.$nextTick();
      const buttons2 = document.querySelectorAll('.t-button');
      expect(buttons2.length).toBe(2);
      expect(buttons2[0].textContent).toBe('区块链');
      expect(buttons2[1].textContent).toBe('大数据');

      // 清理测试数据
      document.body.innerHTML = '';
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
});
