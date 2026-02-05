// @ts-nocheck
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { Input } from '@tdesign/components/input';
import { simulateInputChange } from '@tdesign/internal-tests/utils';
import { nextTick } from 'vue';

describe('Input Component', () => {
  describe('props.align', () => {
    const alignClassNameList = [{ 't-align-left': false }, 't-align-center', 't-align-right'];
    ['left', 'center', 'right'].forEach((item, index) => {
      it(`props.align is equal to ${item}`, () => {
        const wrapper = mount(<Input align={item}></Input>).find('.t-input');
        if (typeof alignClassNameList[index] === 'string') {
          expect(wrapper.classes(alignClassNameList[index])).toBeTruthy();
        } else if (typeof alignClassNameList[index] === 'object') {
          const classNameKey = Object.keys(alignClassNameList[index])[0];
          expect(wrapper.classes(classNameKey)).toBeFalsy();
        }
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it('props.align default value is left', () => {
      const wrapper = mount(<Input></Input>).find('.t-input');
      expect(wrapper.classes('t-align-center')).toBeFalsy();
      expect(wrapper.classes('t-align-right')).toBeFalsy();
    });
  });

  describe('props.allowInputOverMax', () => {
    it('props.allowInputOverMax works fine', async () => {
      const wrapper = mount(<Input value="Hello" maxlength={5} allowInputOverMax={true}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      const attrDom = wrapper.find('input');
      expect(attrDom.element.value).toBe('Hello');
    });

    it('props.allowInputOverMax default value is false', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input defaultValue="" maxlength={5} onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
    });

    it('props.allowInputOverMax with maxcharacter', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(
        <Input value="测试" maxcharacter={4} allowInputOverMax={true} onChange={onChangeFn}></Input>,
      );
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, '测试文本长度');
      await wrapper.vm.$nextTick();
      expect(inputDom.value).toBe('测试');
    });
  });

  describe('props.autoWidth', () => {
    it('props.autoWidth works fine', () => {
      const wrapper = mount(<Input autoWidth></Input>);
      expect(wrapper.find('.t-input--auto-width').exists()).toBeTruthy();
    });

    it('props.autoWidth default value is false', () => {
      const wrapper = mount(<Input></Input>);
      expect(wrapper.find('.t-input--auto-width').exists()).toBeFalsy();
    });

    it('props.autoWidth renders span for width calculation', () => {
      const wrapper = mount(<Input autoWidth value="test"></Input>);
      expect(wrapper.find('.t-input__input-pre').exists()).toBeTruthy();
    });
  });

  describe('props.autocomplete', () => {
    it('props.autocomplete works fine', () => {
      const wrapper = mount(<Input autocomplete="https://tdesign.tencent.com/"></Input>).find('input');
      expect(wrapper.attributes('autocomplete')).toBe('https://tdesign.tencent.com/');
    });

    it('props.autocomplete with different values', () => {
      const values = ['on', 'off', 'name', 'email'];
      values.forEach((val) => {
        const wrapper = mount(<Input autocomplete={val}></Input>).find('input');
        expect(wrapper.attributes('autocomplete')).toBe(val);
      });
    });
  });

  describe('props.autofocus', () => {
    it(`props.autofocus is equal to false`, () => {
      const wrapper = mount(<Input autofocus={false}></Input>);
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('autofocus')).toBeUndefined();
    });

    it(`props.autofocus is equal to true`, () => {
      const wrapper = mount(<Input autofocus={true}></Input>);
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('autofocus')).toBeDefined();
    });

    it('props.autofocus default value is false', () => {
      const wrapper = mount(<Input></Input>);
      const domWrapper = wrapper.find('input');
      expect(domWrapper.attributes('autofocus')).toBeUndefined();
    });
  });

  describe('props.borderless', () => {
    it('props.borderless works fine', () => {
      const wrapper = mount(<Input borderless></Input>);
      expect(wrapper.find('.t-input--borderless').exists()).toBeTruthy();
    });

    it('props.borderless default value is false', () => {
      const wrapper = mount(<Input></Input>);
      expect(wrapper.find('.t-input--borderless').exists()).toBeFalsy();
    });
  });

  describe('props.clearable', () => {
    it('props.clearable: clear icon should exist on input mouseenter', async () => {
      const wrapper = mount(<Input value="Default Keyword" clearable={true}></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    });

    it('props.clearable: click clear icon could clear input value to be empty', async () => {
      const onClearFn1 = vi.fn();
      const onChangeFn1 = vi.fn();
      const wrapper = mount(
        <Input value="Default Keyword" clearable={true} onClear={onClearFn1} onChange={onChangeFn1}></Input>,
      );
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClearFn1).toHaveBeenCalled(1);
      expect(onClearFn1.mock.calls[0][0].e.stopPropagation).toBeTruthy();
      expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
      expect(onChangeFn1).toHaveBeenCalled(1);
      expect(onChangeFn1.mock.calls[0][0]).toBe('');
      expect(onChangeFn1.mock.calls[0][1].e.stopPropagation).toBeTruthy();
      expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
    });

    it('props.clearable: type=password, browseIcon and clearableIcon works fine', async () => {
      const wrapper = mount(<Input type="password" value="this is my password" clearable={true}></Input>);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    });

    it('props.clearable default value is false', async () => {
      const wrapper = mount(<Input value="Default Keyword"></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
    });

    it('props.clearable: clear icon should not show when disabled', async () => {
      const wrapper = mount(<Input value="Default Keyword" clearable={true} disabled></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
    });

    it('props.clearable: clear icon should not show when readonly', async () => {
      const wrapper = mount(<Input value="Default Keyword" clearable={true} readonly></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
    });

    it('props.clearable: type=number should return undefined when cleared', async () => {
      const onClearFn = vi.fn();
      const onChangeFn = vi.fn();
      const wrapper = mount(
        <Input type="number" value={123} clearable={true} onClear={onClearFn} onChange={onChangeFn}></Input>,
      );
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn.mock.calls[0][0]).toBe(undefined);
    });
  });

  describe('props.disabled', () => {
    it('props.disabled works fine', () => {
      // disabled default value is
      const wrapper1 = mount(<Input></Input>).find('.t-input');
      expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
      // disabled = true
      const wrapper2 = mount(<Input disabled={true}></Input>).find('.t-input');
      expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
      // disabled = false
      const wrapper3 = mount(<Input disabled={false}></Input>).find('.t-input');
      expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
    });

    it('props.disabled: input element should have disabled attribute', () => {
      const wrapper = mount(<Input disabled={true}></Input>);
      expect(wrapper.find('input').attributes('disabled')).toBeDefined();
    });

    it('props.disabled: password toggle should not work when disabled', async () => {
      const wrapper = mount(<Input type="password" disabled={true}></Input>);
      const browseIcon = wrapper.find('.t-icon-browse-off');
      expect(browseIcon.exists()).toBeTruthy();
      await browseIcon.trigger('click');
      await wrapper.vm.$nextTick();
      // 图标应该不会改变
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      expect(wrapper.find('.t-icon-browse').exists()).toBeFalsy();
    });

    it('props.disabled: events should not trigger when disabled', async () => {
      const onKeydownFn = vi.fn();
      const onKeyupFn = vi.fn();
      const onKeypressFn = vi.fn();
      const wrapper = mount(
        <Input disabled={true} onKeydown={onKeydownFn} onKeyup={onKeyupFn} onKeypress={onKeypressFn}></Input>,
      );
      await wrapper.find('input').trigger('keydown');
      await wrapper.find('input').trigger('keyup');
      await wrapper.find('input').trigger('keypress');
      expect(onKeydownFn).not.toHaveBeenCalled();
      expect(onKeyupFn).not.toHaveBeenCalled();
      expect(onKeypressFn).not.toHaveBeenCalled();
    });
  });

  describe('props.format', () => {
    it('props.format: focus and blur states have different value', async () => {
      const wrapper = mount(<Input format={(val) => `${val} 元`} value="100"></Input>);
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      const attrDom = wrapper.find('input');
      expect(attrDom.element.value).toBe('100');
      wrapper.find('input').trigger('blur');
      await wrapper.vm.$nextTick();
      const attrDom1 = wrapper.find('input');
      expect(attrDom1.element.value).toBe('100 元');
    });

    it('props.format: initial value should be formatted', async () => {
      const wrapper = mount(<Input format={(val) => `$${val}`} defaultValue="100"></Input>);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).toBe('$100');
    });

    it('props.format: should work with defaultValue', async () => {
      const wrapper = mount(<Input format={(val) => val?.toUpperCase()} defaultValue="hello"></Input>);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').element.value).toBe('HELLO');
    });
  });

  describe('props.inputClass', () => {
    it(`props.inputClass is equal to name1 name2`, () => {
      const wrapper = mount(<Input inputClass="name1 name2"></Input>);
      const domWrapper = wrapper.find('.t-input');
      expect(domWrapper.classes('name1')).toBeTruthy();
      expect(domWrapper.classes('name2')).toBeTruthy();
    });

    it(`props.inputClass is equal to ['name1', 'name2']`, () => {
      const wrapper = mount(<Input inputClass={['name1', 'name2']}></Input>);
      const domWrapper = wrapper.find('.t-input');
      expect(domWrapper.classes('name1')).toBeTruthy();
      expect(domWrapper.classes('name2')).toBeTruthy();
    });

    it(`props.inputClass is equal to { name1: true, name2: false }`, () => {
      const wrapper = mount(<Input inputClass={{ name1: true, name2: false }}></Input>);
      const domWrapper = wrapper.find('.t-input');
      expect(domWrapper.classes('name1')).toBeTruthy();
      expect(domWrapper.classes('name2')).toBeFalsy();
    });
  });

  describe('props.label', () => {
    it('props.label works fine with string', () => {
      const wrapper = mount(<Input label="Label:"></Input>);
      expect(wrapper.find('.t-input__prefix').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix').text()).toBe('Label:');
    });

    it('props.label works fine with TNode', () => {
      const wrapper = mount(<Input label={() => <span class="custom-node">TNode</span>}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('slots.label works fine', () => {
      const wrapper = mount(<Input v-slots={{ label: () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('props.maxcharacter', () => {
    it('props.maxcharacter: length of value is over than maxcharacter', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="你好 TDesign" maxcharacter={4} onChange={onChangeFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled(1);
      expect(onChangeFn.mock.calls[0][0]).toBe('你好');
      expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
    });

    it('props.maxcharacter: Chinese character counts as 2', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="你好" maxcharacter={4} onChange={onChangeFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onChangeFn).not.toHaveBeenCalled();
      expect(wrapper.find('input').element.value).toBe('你好');
    });

    it('props.maxcharacter: mixed Chinese and English', async () => {
      const onChangeFn = vi.fn();
      // 你(2) + 好(2) + a(1) = 5 > 4
      const wrapper = mount(<Input value="你好a" maxcharacter={4} onChange={onChangeFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe('你好');
    });
  });

  describe('props.maxlength', () => {
    it('props.maxlength: length of value is over than maxlength', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="Hello TDesign" maxlength={5} onChange={onChangeFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled(1);
      expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
      expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
    });

    it('props.maxlength: should not set native maxlength attribute', () => {
      const wrapper = mount(<Input maxlength={10}></Input>);
      expect(wrapper.find('input').attributes('maxlength')).toBeUndefined();
    });

    it('props.maxlength: with string type', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="Hello TDesign" maxlength="5" onChange={onChangeFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe('Hello');
    });
  });

  describe('props.name', () => {
    it('props.name works fine', () => {
      const wrapper = mount(<Input name="input-name"></Input>).find('input');
      expect(wrapper.attributes('name')).toBe('input-name');
    });

    it('props.name default value is empty string', () => {
      const wrapper = mount(<Input></Input>).find('input');
      expect(wrapper.attributes('name')).toBeUndefined();
    });
  });

  describe('props.placeholder', () => {
    it('props.placeholder works fine', () => {
      const wrapper = mount(<Input placeholder="this is input placeholder"></Input>).find('input');
      expect(wrapper.attributes('placeholder')).toBe('this is input placeholder');
    });

    it('props.placeholder: supports Chinese', () => {
      const wrapper = mount(<Input placeholder="请输入内容"></Input>).find('input');
      expect(wrapper.attributes('placeholder')).toBe('请输入内容');
    });
  });

  describe('props.prefixIcon', () => {
    it('props.prefixIcon works fine', () => {
      const wrapper = mount(<Input prefixIcon={() => <span class="custom-node">TNode</span>}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
    });

    it('slots.prefixIcon works fine', () => {
      const wrapper = mount(<Input v-slots={{ prefixIcon: () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
    });

    it('slots.prefix-icon works fine', () => {
      const wrapper = mount(<Input v-slots={{ 'prefix-icon': () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__prefix-icon').exists()).toBeTruthy();
    });
  });

  describe('props.readonly', () => {
    it('props.readonly works fine', () => {
      // readonly default value is false
      const wrapper1 = mount(<Input></Input>).find('.t-input');
      expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
      // readonly = true
      const wrapper2 = mount(<Input readonly={true}></Input>).find('.t-input');
      expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
      // readonly = false
      const wrapper3 = mount(<Input readonly={false}></Input>).find('.t-input');
      expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
    });

    it('props.readonly: input element should have readonly attribute', () => {
      const wrapper = mount(<Input readonly={true}></Input>);
      expect(wrapper.find('input').attributes('readonly')).toBeDefined();
    });

    it('props.readonly: should have unselectable attribute', () => {
      const wrapper = mount(<Input readonly={true}></Input>);
      expect(wrapper.find('input').attributes('unselectable')).toBe('on');
    });
  });

  describe('props.showClearIconOnEmpty', () => {
    it('props.showClearIconOnEmpty works fine', async () => {
      const wrapper = mount(<Input showClearIconOnEmpty={true}></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    });

    it('props.showClearIconOnEmpty: default value is false', async () => {
      const wrapper = mount(<Input></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
    });

    it('props.showClearIconOnEmpty: should show even when value is empty', async () => {
      const wrapper = mount(<Input showClearIconOnEmpty={true} value=""></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-input__suffix-clear').exists()).toBeTruthy();
    });
  });

  describe('props.showLimitNumber', () => {
    it('props.showLimitNumber works fine. `{".t-input__limit-number":{"text":"2/5"}}` should exist', () => {
      const wrapper = mount(<Input showLimitNumber={true} maxlength={5} value="TD"></Input>);
      expect(wrapper.find('.t-input__limit-number').text()).toBe('2/5');
    });

    it('props.showLimitNumber: default value is false', () => {
      const wrapper = mount(<Input maxlength={5} value="TD"></Input>);
      expect(wrapper.find('.t-input__limit-number').exists()).toBeFalsy();
    });

    it('props.showLimitNumber: with maxcharacter', () => {
      const wrapper = mount(<Input showLimitNumber={true} maxcharacter={10} value="你好"></Input>);
      expect(wrapper.find('.t-input__limit-number').text()).toBe('4/10');
    });

    it('props.showLimitNumber: shows 0/n when empty', () => {
      const wrapper = mount(<Input showLimitNumber={true} maxlength={10}></Input>);
      expect(wrapper.find('.t-input__limit-number').text()).toBe('0/10');
    });

    it('props.showLimitNumber: disabled state should have disabled class', () => {
      const wrapper = mount(<Input showLimitNumber={true} maxlength={5} value="TD" disabled></Input>);
      expect(wrapper.find('.t-input__limit-number').classes('t-is-disabled')).toBeTruthy();
    });
  });

  describe('props.size', () => {
    const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
    ['small', 'medium', 'large'].forEach((item, index) => {
      it(`props.size is equal to ${item}`, () => {
        const wrapper = mount(<Input size={item}></Input>).find('.t-input');
        if (typeof sizeClassNameList[index] === 'string') {
          expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
        } else if (typeof sizeClassNameList[index] === 'object') {
          const classNameKey = Object.keys(sizeClassNameList[index])[0];
          expect(wrapper.classes(classNameKey)).toBeFalsy();
        }
      });
    });

    it('props.size default value is medium', () => {
      const wrapper = mount(<Input></Input>).find('.t-input');
      expect(wrapper.classes('t-size-s')).toBeFalsy();
      expect(wrapper.classes('t-size-l')).toBeFalsy();
    });
  });

  describe('props.spellCheck', () => {
    it('props.spellCheck works fine', () => {
      const wrapper = mount(<Input spellCheck={true}></Input>);
      expect(wrapper.find('input').attributes('spellcheck')).toBe('true');
    });

    it('props.spellCheck = false', () => {
      const wrapper = mount(<Input spellCheck={false}></Input>);
      expect(wrapper.find('input').attributes('spellcheck')).toBe('false');
    });
  });

  describe('props.status', () => {
    const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
    ['default', 'success', 'warning', 'error'].forEach((item, index) => {
      it(`props.status is equal to ${item}`, () => {
        const wrapper = mount(<Input status={item}></Input>).find('.t-input');
        if (typeof statusClassNameList[index] === 'string') {
          expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
        } else if (typeof statusClassNameList[index] === 'object') {
          const classNameKey = Object.keys(statusClassNameList[index])[0];
          expect(wrapper.classes(classNameKey)).toBeFalsy();
        }
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    it('props.status default value is default', () => {
      const wrapper = mount(<Input></Input>).find('.t-input');
      expect(wrapper.classes('t-is-success')).toBeFalsy();
      expect(wrapper.classes('t-is-warning')).toBeFalsy();
      expect(wrapper.classes('t-is-error')).toBeFalsy();
    });
  });

  describe('props.suffix', () => {
    it('props.suffix works fine with string', () => {
      const wrapper = mount(<Input suffix="suffix"></Input>);
      expect(wrapper.find('.t-input__suffix').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix').text()).toBe('suffix');
    });

    it('props.suffix works fine with TNode', () => {
      const wrapper = mount(<Input suffix={() => <span class="custom-node">TNode</span>}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('slots.suffix works fine', () => {
      const wrapper = mount(<Input v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('props.suffixIcon', () => {
    it('props.suffixIcon works fine', () => {
      const wrapper = mount(<Input suffixIcon={() => <span class="custom-node">TNode</span>}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('slots.suffixIcon works fine', () => {
      const wrapper = mount(<Input v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('slots.suffix-icon works fine', () => {
      const wrapper = mount(<Input v-slots={{ 'suffix-icon': () => <span class="custom-node">TNode</span> }}></Input>);
      expect(wrapper.find('.custom-node').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__suffix-icon').exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('props.tips', () => {
    it('props.tips is equal this is a tip', () => {
      const wrapper = mount(<Input tips="this is a tip"></Input>);
      expect(wrapper.findAll('.t-input__tips').length).toBe(1);
      expect(wrapper.find('.t-input__tips').text()).toBe('this is a tip');
    });

    it('props.tips with TNode', () => {
      const wrapper = mount(<Input tips={() => <span class="custom-tips">Custom Tips</span>}></Input>);
      expect(wrapper.find('.custom-tips').exists()).toBeTruthy();
    });

    it('props.tips: style changes with status', () => {
      const statuses = ['default', 'success', 'warning', 'error'];
      statuses.forEach((status) => {
        const wrapper = mount(<Input tips="tip" status={status}></Input>);
        expect(wrapper.find('.t-input__tips').classes(`t-is-${status}`)).toBeTruthy();
      });
    });
  });

  describe('props.type', () => {
    const attributeValues = ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'];
    ['text', 'number', 'url', 'tel', 'password', 'search', 'submit', 'hidden'].forEach((item, index) => {
      it(`props.type is equal to ${item}`, () => {
        const wrapper = mount(<Input type={item}></Input>).find('input');
        expect(wrapper.attributes('type')).toBe(attributeValues[index]);
      });
    });

    it('props.type default value is text', () => {
      const wrapper = mount(<Input></Input>).find('input');
      expect(wrapper.attributes('type')).toBe('text');
    });

    it('props.type is equal password', () => {
      const wrapper = mount(<Input type="password"></Input>);
      expect(wrapper.findAll('.t-icon-browse-off').length).toBe(1);
    });

    it('props.type: password could be visible by click browse icon', async () => {
      const wrapper = mount(<Input type="password"></Input>);
      wrapper.find('.t-icon-browse-off').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse').exists()).toBeTruthy();
      const attrDom = wrapper.find('input');
      expect(attrDom.attributes('type')).toBe('text');
      wrapper.find('.t-icon-browse').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      const attrDom1 = wrapper.find('input');
      expect(attrDom1.attributes('type')).toBe('password');
    });

    it('props.type=hidden: should hide the input wrapper', () => {
      const wrapper = mount(<Input type="hidden"></Input>);
      // type=hidden 时，wrapper 应该被隐藏
      expect(wrapper.find('.t-input__wrap').isVisible()).toBeFalsy();
    });

    it('props.type=number: should return number value', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input type="number" onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, '123');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][0]).toBe(123);
    });
  });

  describe('props.value and props.defaultValue', () => {
    it('props.value works fine', () => {
      const wrapper = mount(<Input value="test value"></Input>);
      expect(wrapper.find('input').element.value).toBe('test value');
    });

    it('props.defaultValue works fine', () => {
      const wrapper = mount(<Input defaultValue="default value"></Input>);
      expect(wrapper.find('input').element.value).toBe('default value');
    });

    it('props.value: controlled mode', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="controlled" onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'new value');
      await wrapper.vm.$nextTick();
      // 受控模式下，值不会改变
      expect(wrapper.find('input').element.value).toBe('controlled');
      expect(onChangeFn).toHaveBeenCalled();
    });

    it('props.defaultValue: uncontrolled mode', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input defaultValue="uncontrolled" onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'new value');
      await wrapper.vm.$nextTick();
      // 非受控模式下，值会改变
      expect(wrapper.find('input').element.value).toBe('new value');
      expect(onChangeFn).toHaveBeenCalled();
    });

    it('props.value: supports number type', () => {
      const wrapper = mount(<Input value={123} type="number"></Input>);
      expect(wrapper.find('input').element.value).toBe('123');
    });
  });

  describe('events', () => {
    it('events.blur works fine', async () => {
      const onFocusFn = vi.fn();
      const onBlurFn1 = vi.fn();
      const wrapper = mount(<Input value="initial-input-value" onFocus={onFocusFn} onBlur={onBlurFn1}></Input>);
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      expect(onFocusFn).toHaveBeenCalled(1);
      expect(onFocusFn.mock.calls[0][0]).toBe('initial-input-value');
      expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
      wrapper.find('input').trigger('blur');
      await wrapper.vm.$nextTick();
      expect(onBlurFn1).toHaveBeenCalled(1);
      expect(onBlurFn1.mock.calls[0][0]).toBe('initial-input-value');
      expect(onBlurFn1.mock.calls[0][1].e.type).toBe('blur');
    });

    it('events.change: empty value could trigger change event', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'initial value');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled(1);
      expect(onChangeFn.mock.calls[0][0]).toBe('initial value');
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
    });

    it('events.change: controlled value test', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="TDesign" onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      const attrDom = wrapper.find('input');
      expect(attrDom.element.value).toBe('TDesign');
      expect(onChangeFn).toHaveBeenCalled(1);
      expect(onChangeFn.mock.calls[0][0]).toBe('Hello TDesign');
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
    });

    it('events.change: uncontrolled value test', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input defaultValue="Hello" onChange={onChangeFn}></Input>);
      const inputDom = wrapper.find('input').element;
      simulateInputChange(inputDom, 'Hello TDesign');
      await wrapper.vm.$nextTick();
      expect(onChangeFn).toHaveBeenCalled(1);
      expect(onChangeFn.mock.calls[0][0]).toBe('Hello TDesign');
      expect(onChangeFn.mock.calls[0][1].e.type).toBe('input');
    });

    it('events.change: trigger=initial when value exceeds limit', async () => {
      const onChangeFn = vi.fn();
      mount(<Input value="Hello World" maxlength={5} onChange={onChangeFn}></Input>);
      await nextTick();
      expect(onChangeFn).toHaveBeenCalled();
      expect(onChangeFn.mock.calls[0][1].trigger).toBe('initial');
    });

    it('events.change: trigger=clear when cleared', async () => {
      const onChangeFn = vi.fn();
      const wrapper = mount(<Input value="test" clearable onChange={onChangeFn}></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onChangeFn.mock.calls[0][1].trigger).toBe('clear');
    });

    it('events.clear works fine', async () => {
      const onClearFn = vi.fn();
      const wrapper = mount(<Input value="test" clearable onClear={onClearFn}></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      wrapper.find('.t-input__suffix-clear').trigger('click');
      await wrapper.vm.$nextTick();
      expect(onClearFn).toHaveBeenCalled();
      expect(onClearFn.mock.calls[0][0].e.type).toBe('click');
    });

    it('events.click works fine', async () => {
      const fn = vi.fn();
      const wrapper = mount(<Input onClick={fn}></Input>);
      wrapper.find('.t-input').trigger('click');
      await wrapper.vm.$nextTick();
      expect(fn).toHaveBeenCalled(1);
      expect(fn.mock.calls[0][0].e.type).toBe('click');
    });

    it('events.compositionend works fine', async () => {
      const onCompositionendFn = vi.fn();
      const wrapper = mount(<Input value="输入结束" onCompositionend={onCompositionendFn}></Input>);
      wrapper.find('input').trigger('compositionend');
      await wrapper.vm.$nextTick();
      expect(onCompositionendFn).toHaveBeenCalled(1);
      expect(onCompositionendFn.mock.calls[0][0]).toBe('输入结束');
      expect(onCompositionendFn.mock.calls[0][1].e.type).toBe('compositionend');
    });

    it('events.compositionstart works fine', async () => {
      const onCompositionstartFn = vi.fn();
      const wrapper = mount(<Input value="输入开始" onCompositionstart={onCompositionstartFn}></Input>);
      wrapper.find('input').trigger('compositionstart');
      await wrapper.vm.$nextTick();
      expect(onCompositionstartFn).toHaveBeenCalled(1);
      expect(onCompositionstartFn.mock.calls[0][0]).toBe('输入开始');
      expect(onCompositionstartFn.mock.calls[0][1].e.type).toBe('compositionstart');
    });

    it('events.enter works fine', async () => {
      const onEnterFn1 = vi.fn();
      const wrapper = mount(<Input value="text" onEnter={onEnterFn1}></Input>);
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      wrapper.find('input').trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn1).toHaveBeenCalled(1);
      expect(onEnterFn1.mock.calls[0][0]).toBe('text');
      expect(onEnterFn1.mock.calls[0][1].e.type).toBe('keydown');
    });

    it('events.enter should not trigger during IME composition', async () => {
      const onEnterFn = vi.fn();
      const wrapper = mount(<Input value="text" onEnter={onEnterFn}></Input>);
      const input = wrapper.find('input');

      // 模拟中文输入法开始
      input.trigger('compositionstart');
      await wrapper.vm.$nextTick();

      // 在输入法激活状态下按回车键，不应该触发 onEnter 事件
      input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn).not.toHaveBeenCalled();

      // 模拟中文输入法结束
      input.trigger('compositionend');
      await wrapper.vm.$nextTick();

      // 输入法结束后按回车键，应该正常触发 onEnter 事件
      input.trigger('keydown.enter');
      await wrapper.vm.$nextTick();
      expect(onEnterFn).toHaveBeenCalled(1);
      expect(onEnterFn.mock.calls[0][0]).toBe('text');
      expect(onEnterFn.mock.calls[0][1].e.type).toBe('keydown');
    });

    it('events.focus works fine', async () => {
      const onFocusFn = vi.fn();
      const wrapper = mount(<Input onFocus={onFocusFn}></Input>);
      wrapper.find('input').trigger('focus');
      await wrapper.vm.$nextTick();
      expect(onFocusFn).toHaveBeenCalled(1);
      expect(onFocusFn.mock.calls[0][0]).toBe(undefined);
      expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    });

    it('events.keydown works fine', async () => {
      const onKeydownFn = vi.fn();
      const wrapper = mount(<Input value="text" onKeydown={onKeydownFn}></Input>);
      wrapper.find('input').trigger('keydown');
      await wrapper.vm.$nextTick();
      expect(onKeydownFn).toHaveBeenCalled(1);
      expect(onKeydownFn.mock.calls[0][0]).toBe('text');
      expect(onKeydownFn.mock.calls[0][1].e.type).toBe('keydown');
    });

    it('events.keypress works fine', async () => {
      const onKeypressFn = vi.fn();
      const wrapper = mount(<Input value="text" onKeypress={onKeypressFn}></Input>);
      wrapper.find('input').trigger('keypress');
      await wrapper.vm.$nextTick();
      expect(onKeypressFn).toHaveBeenCalled(1);
      expect(onKeypressFn.mock.calls[0][0]).toBe('text');
      expect(onKeypressFn.mock.calls[0][1].e.type).toBe('keypress');
    });

    it('events.keyup works fine', async () => {
      const onKeyupFn = vi.fn();
      const wrapper = mount(<Input value="text" onKeyup={onKeyupFn}></Input>);
      wrapper.find('input').trigger('keyup');
      await wrapper.vm.$nextTick();
      expect(onKeyupFn).toHaveBeenCalled(1);
      expect(onKeyupFn.mock.calls[0][0]).toBe('text');
      expect(onKeyupFn.mock.calls[0][1].e.type).toBe('keyup');
    });

    it('events.mouseenter works fine', async () => {
      const onMouseenterFn = vi.fn();
      const wrapper = mount(<Input onMouseenter={onMouseenterFn}></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      expect(onMouseenterFn).toHaveBeenCalled(1);
      expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
    });

    it('events.mouseleave works fine', async () => {
      const onMouseleaveFn = vi.fn();
      const wrapper = mount(<Input onMouseleave={onMouseleaveFn}></Input>);
      wrapper.find('.t-input').trigger('mouseleave');
      await wrapper.vm.$nextTick();
      expect(onMouseleaveFn).toHaveBeenCalled(1);
      expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
    });

    it('events.paste works fine', async () => {
      const onPasteFn = vi.fn();
      const wrapper = mount(<Input onPaste={onPasteFn}></Input>);
      wrapper.find('input').trigger('paste');
      await wrapper.vm.$nextTick();
      expect(onPasteFn).toHaveBeenCalled(1);
      expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
    });

    it('events.validate works fine', async () => {
      const onValidateFn = vi.fn();
      const wrapper = mount(<Input value="Hello World" maxlength={5} onValidate={onValidateFn}></Input>);
      await wrapper.vm.$nextTick();
      expect(onValidateFn).toHaveBeenCalled(1);
      expect(onValidateFn.mock.calls[0][0].error).toBe('exceed-maximum');
    });

    it('events.wheel works fine', async () => {
      const onWheelFn = vi.fn();
      const wrapper = mount(<Input onWheel={onWheelFn}></Input>);
      wrapper.find('input').trigger('wheel');
      await wrapper.vm.$nextTick();
      expect(onWheelFn).toHaveBeenCalled(1);
      expect(onWheelFn.mock.calls[0][0].e.type).toBe('wheel');
    });
  });

  // 注意：exposed methods、focus state、composition input 等 hooks 相关测试已移至 input.hooks.test.tsx

  describe('edge cases and additional coverage', () => {
    it('should handle showInput=false prop', () => {
      const wrapper = mount(<Input showInput={false}></Input>);
      const input = wrapper.find('input');
      expect(input.classes()).toContain('t-input--soft-hidden');
    });

    it('should handle passwordIcon when type=password and clearable', async () => {
      const wrapper = mount(<Input type="password" value="password" clearable></Input>);
      wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.vm.$nextTick();
      // 应该同时显示密码图标和清除图标
      expect(wrapper.find('.t-icon-browse-off').exists()).toBeTruthy();
      expect(wrapper.find('.t-input__clear').exists()).toBeTruthy();
    });

    it('should handle validator edge cases for props', () => {
      // 测试 align 验证器
      const alignWrapper = mount(<Input align={null as any}></Input>);
      expect(alignWrapper.exists()).toBeTruthy();

      // 测试 size 验证器
      const sizeWrapper = mount(<Input size={null as any}></Input>);
      expect(sizeWrapper.exists()).toBeTruthy();

      // 测试 status 验证器
      const statusWrapper = mount(<Input status={null as any}></Input>);
      expect(statusWrapper.exists()).toBeTruthy();

      // 测试 type 验证器
      const typeWrapper = mount(<Input type={null as any}></Input>);
      expect(typeWrapper.exists()).toBeTruthy();
    });

    it('should handle onRootClick when input is not the target', async () => {
      const wrapper = mount(<Input></Input>);
      const rootElement = wrapper.find('.t-input');

      // 模拟点击非 input 元素
      const clickEvent = new MouseEvent('click', {
        target: rootElement.element,
      } as any);

      rootElement.element.dispatchEvent(clickEvent);
      await wrapper.vm.$nextTick();
    });

    it('should handle globalConfig placeholder', () => {
      // 测试全局配置的 placeholder
      const wrapper = mount(<Input></Input>);
      const input = wrapper.find('input');
      // 由于没有设置 placeholder，应该使用全局配置的默认值
      expect(input.attributes('placeholder')).toBeDefined();
    });

    it('should handle input value with 0', () => {
      const wrapper = mount(<Input type="number" value={0}></Input>);
      expect(wrapper.find('input').element.value).toBe('0');
    });

    it('should handle tips with different status', () => {
      const statuses = ['default', 'success', 'warning', 'error'];
      statuses.forEach((status) => {
        const wrapper = mount(<Input tips="test tip" status={status}></Input>);
        const tipsElement = wrapper.find('.t-input__tips');
        expect(tipsElement.classes()).toContain(`t-is-${status}`);
      });
    });
  });
});
