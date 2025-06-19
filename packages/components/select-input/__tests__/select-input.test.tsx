import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { SelectInput } from '@tdesign/components/select-input';
import { getSelectInputMultipleMount } from './mount';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

describe('SelectInput Component', () => {
  it(`props.allowInput is equal to true`, () => {
    const wrapper = mount(<SelectInput allowInput={true}></SelectInput>);
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('t-is-readonly')).toBeFalsy();
  });

  it('props.borderless works fine', () => {
    // borderless default value is false
    const wrapper1 = mount(<SelectInput></SelectInput>);
    expect(wrapper1.classes('t-select-input--borderless')).toBeFalsy();
    // borderless = true
    const wrapper2 = mount(<SelectInput borderless={true}></SelectInput>);
    expect(wrapper2.classes('t-select-input--borderless')).toBeTruthy();
    // borderless = false
    const wrapper3 = mount(<SelectInput borderless={false}></SelectInput>);
    expect(wrapper3.classes('t-select-input--borderless')).toBeFalsy();
  });

  it('props.clearable: empty value can not show clear icon', async () => {
    const wrapper = mount(<SelectInput clearable={true}></SelectInput>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.clearable: show clear icon on mouse enter in single select input', async () => {
    const wrapper = mount(<SelectInput value={'tdesign'} clearable={true}></SelectInput>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
  });

  it('props.clearable: show clear icon on mouse enter in multiple select input', async () => {
    const wrapper = mount(<SelectInput value={['tdesign']} multiple={true} clearable={true}></SelectInput>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeTruthy();
  });

  it('props.collapsedItems works fine', () => {
    const wrapper = getSelectInputMultipleMount(SelectInput, {
      collapsedItems: () => <span class="custom-node">TNode</span>,
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.collapsedItems works fine', () => {
    const wrapper = getSelectInputMultipleMount(SelectInput, {
      'v-slots': { collapsedItems: () => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.collapsed-items works fine', () => {
    const wrapper = getSelectInputMultipleMount(SelectInput, {
      'v-slots': { 'collapsed-items': () => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.collapsedItems is a function with params', () => {
    const fn = vi.fn();
    getSelectInputMultipleMount(SelectInput, { collapsedItems: fn, minCollapsedNum: 3 });
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].count).toBe(2);
  });
  it('slots.collapsedItems: a function with params', () => {
    const fn = vi.fn();
    getSelectInputMultipleMount(SelectInput, { 'v-slots': { collapsedItems: fn }, minCollapsedNum: 3 });

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].count).toBe(2);
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<SelectInput></SelectInput>).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<SelectInput disabled={true}></SelectInput>).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount(<SelectInput disabled={false}></SelectInput>).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.label works fine', () => {
    const wrapper = mount(<SelectInput label={() => <span class="custom-node">TNode</span>}></SelectInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.label works fine', () => {
    const wrapper = mount(
      <SelectInput v-slots={{ label: () => <span class="custom-node">TNode</span> }}></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.loading works fine. `".t-loading"` should exist', () => {
    const wrapper = mount(<SelectInput loading={true}></SelectInput>);
    expect(wrapper.find('.t-loading').exists()).toBeTruthy();
  });

  it('props.multiple: SelectInput contains element `.t-tag-input`', () => {
    // multiple default value is false
    const wrapper = mount(<SelectInput></SelectInput>);
    expect(wrapper.find('.t-tag-input').exists()).toBeFalsy();
    // multiple = false
    const wrapper1 = mount(<SelectInput multiple={false}></SelectInput>);
    expect(wrapper1.find('.t-tag-input').exists()).toBeFalsy();
    // multiple = true
    const wrapper2 = mount(<SelectInput multiple={true}></SelectInput>);
    expect(wrapper2.find('.t-tag-input').exists()).toBeTruthy();
  });

  it.skip('props.panel works fine', async () => {
    const wrapper = mount(<SelectInput panel={() => <span class="custom-node">TNode</span>}></SelectInput>);
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
  });

  it.skip('slots.panel works fine', async () => {
    const wrapper = mount(
      <SelectInput v-slots={{ panel: () => <span class="custom-node">TNode</span> }}></SelectInput>,
    );
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    const customNodeDom = document.querySelector('.custom-node');
    expect(customNodeDom).toBeTruthy();
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount(<SelectInput placeholder={'This is SelectInput placeholder'}></SelectInput>).find('input');
    expect(wrapper.attributes('placeholder')).toBe('This is SelectInput placeholder');
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = mount(<SelectInput status={item}></SelectInput>).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount(<SelectInput suffix={() => <span class="custom-node">TNode</span>}></SelectInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount(
      <SelectInput v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.suffixIcon works fine', () => {
    const wrapper = mount(<SelectInput suffixIcon={() => <span class="custom-node">TNode</span>}></SelectInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffixIcon works fine', () => {
    const wrapper = mount(
      <SelectInput v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.suffix-icon works fine', () => {
    const wrapper = mount(
      <SelectInput v-slots={{ 'suffix-icon': () => <span class="custom-node">TNode</span> }}></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag works fine', () => {
    const wrapper = mount(
      <SelectInput
        tag={() => <span class="custom-node">TNode</span>}
        multiple={true}
        value={['tdesign-vue']}
      ></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.tag works fine', () => {
    const wrapper = mount(
      <SelectInput
        v-slots={{ tag: () => <span class="custom-node">TNode</span> }}
        multiple={true}
        value={['tdesign-vue']}
      ></SelectInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag is a function with params', () => {
    const fn = vi.fn();
    mount(<SelectInput tag={fn} multiple={true} value={['tdesign-vue']}></SelectInput>);
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].value).toBe('tdesign-vue');
  });
  it('slots.tag: a function with params', () => {
    const fn = vi.fn();
    mount(<SelectInput v-slots={{ tag: fn }} multiple={true} value={['tdesign-vue']}></SelectInput>);

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].value).toBe('tdesign-vue');
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount(<SelectInput tips={'this is a tip'}></SelectInput>);
    expect(wrapper.findAll('.t-input__tips').length).toBe(1);
  });
});

describe('SelectInput', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
    it('allowInput', () => {
      [true, false].forEach((allowInput) => {
        const props = {
          allowInput,
          value: 'tdesign',
        };
        const wrapper = mount(SelectInput, { props });
        expect(wrapper.vm.allowInput).toBe(allowInput);
      });
    });
    it('autoWidth', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          autoWidth: true,
        },
      });
      const el = wrapper.find('.t-input__wrap');
      const classes = el.classes();
      expect(classes).contains('t-input--auto-width');
    });
    it('borderless', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          borderless: true,
        },
      });
      const classes = wrapper.find('.t-select-input').classes();
      expect(classes).contains('t-select-input--borderless');
    });
    it('clearable', async () => {
      const wrapper = mount(SelectInput, {
        props: {
          inputValue: 'tdesign',
          allowInput: true,
          clearable: true,
          value: 'tdesign',
        },
      });
      const el = wrapper.find('.t-input');
      await el.trigger('mouseenter');
      expect(wrapper.find('.t-input__clear').exists()).toBeTruthy();
    });
    it('placeholder', async () => {
      const placeholder = '请选择';
      const wrapper = mount(SelectInput, {
        props: {
          placeholder: placeholder,
          value: 'tdesign',
        },
      });
      const el = wrapper.find('.t-input__inner');
      expect(el.attributes('placeholder')).toBe(placeholder);
    });
    it('disabled', async () => {
      const disabled = true;
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          disabled,
        },
      });
      const el = wrapper.find('.t-is-disabled');
      expect(el.classes()).contains('t-is-disabled');
    });
    it('inputValue', async () => {
      const text = 'TDesign';
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          inputValue: 'inputValue',
          value: 'tdesign',
          'on-input-change': (e) => {
            wrapper.setProps({ inputValue: e });
          },
        },
      });
      const el = wrapper.find('input');
      await el.setValue(text);
      expect(wrapper.props('inputValue')).toBe(text);
    });
    it('multiple', async () => {
      const value = [
        { label: 'tdesign-vue', value: 1 },
        { label: 'tdesign-react', value: 2 },
        { label: 'tdesign-miniprogram', value: 3 },
      ];
      const wrapper = mount(() => <SelectInput value={value} multiple />);
      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(value.length);
    });
    it('status', async () => {
      const statusList = [
        { status: 'default', tips: '这是普通状态的文本提示' },
        { status: 'success', tips: '校验通过的文本提示' },
        { status: 'warning', tips: '校验不通过的文本提示' },
        { status: 'error', tips: '校验存在严重问题的文本提示' },
      ];
      statusList.forEach((item) => {
        const wrapper = mount(() => {
          return <SelectInput value="tdesginer" {...item} />;
        });
        const tips = wrapper.find('.t-input__tips');
        expect(tips.classes()).contains(`t-tips`);
        expect(tips.classes()).contains(`t-is-${item.status}`);
      });
    });
  });

  describe(':event', () => {
    it('onFocus onBlur', async () => {
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          value: 'tdesign',
          inputValue: 'inputValue',
          'on-input-change': (e) => {
            wrapper.setProps({ inputValue: e });
          },
          'on-focus': onFocus,
          'on-blur': onBlur,
        },
      });
      const el = wrapper.find('.t-input__inner');
      await el.trigger('focus');
      await el.trigger('blur');
      //   await el.setValue(text);
      expect(onBlur).toBeCalled();
      expect(onFocus).toBeCalled();
    });
    it('onClear', async () => {
      const onClear = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          clearable: true,
          value: { label: 'tdesign-vue', value: 1 },
          'on-clear': onClear,
        },
      });
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      await wrapper.vm.$nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClear).toBeCalled();
    });
    it('onEnter', async () => {
      const onEnter = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          allowInput: true,
          value: { label: 'tdesign-vue', value: 1 },
          'on-enter': onEnter,
        },
      });
      const input = wrapper.find('.t-input__inner');
      await input.setValue('tdesign-vue-next');
      await wrapper.vm.$nextTick();
      await input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnter).toBeCalled();
    });
    it('on-popup-visible-change', async () => {
      const onChange = vi.fn();
      const slots = {
        panel: () => (
          <div class="red_panel" style="background: red; height: 100px; width: 100px">
            panel
          </div>
        ),
      };
      const wrapper = mount(() => (
        <SelectInput value={{ label: 'tdesign-vue', value: 1 }} v-slots={slots} on-popup-visible-change={onChange} />
      ));
      const input = wrapper.find('.t-input__wrap');
      await input.trigger('mouseenter');
      await input.trigger('click');
      await new Promise(setTimeout);
      expect(onChange).toBeCalled();
    });
  });

  describe(':slot', () => {
    test('panel', async () => {
      const text = 'panel';
      const slots = {
        panel: () => (
          <div class="red_panel" style="background: red; height: 100px; width: 100px">
            {text}
          </div>
        ),
      };
      const wrapper = mount(() => (
        <SelectInput value={{ label: 'tdesign-vue', value: 1 }} v-slots={slots} popupVisible={true} />
      ));
      await new Promise(setTimeout);
      expect(document.querySelector('.red_panel').textContent).toEqual(text);
    });
  });
});
