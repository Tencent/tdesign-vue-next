import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { TagInput } from '@tdesign/components';
import { getTagInputValueMount, getTagInputDefaultMount } from './mount';
import { simulateInputChange, simulateInputEnter } from '@tdesign/internal-tests/utils';
import { CloseCircleFilledIcon, AppIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { nextTick, ref } from 'vue';

describe('TagInput Component', () => {
  it('props.clearable: empty TagInput does not need clearIcon', async () => {
    const wrapper = mount(<TagInput clearable={true}></TagInput>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.clearable: show clearIcon on mouse enter', async () => {
    const wrapper = getTagInputValueMount({ clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeTruthy();
  });

  it('props.clearable: clear all tags on click clearIcon', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getTagInputValueMount({ clearable: true }, { onClear: onClearFn1, onChange: onChangeFn1 });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-tag-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
    expect(onChangeFn1.mock.calls[0][1].e.type).toBe('click');
  });

  it('props.clearable: disabled TagInput can not show clear icon', async () => {
    const wrapper = getTagInputValueMount({ disabled: true, clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.clearable: readonly TagInput can not show clear icon', async () => {
    const wrapper = getTagInputValueMount({ readonly: true, clearable: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.collapsedItems works fine', () => {
    const wrapper = getTagInputValueMount({
      collapsedItems: () => <span class="custom-node">TNode</span>,
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.collapsedItems works fine', () => {
    const wrapper = getTagInputValueMount({
      'v-slots': { collapsedItems: () => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.collapsed-items works fine', () => {
    const wrapper = getTagInputValueMount({
      'v-slots': { 'collapsed-items': () => <span class="custom-node">TNode</span> },
      minCollapsedNum: 3,
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.disabled works fine', () => {
    // disabled default value is
    const wrapper1 = mount(<TagInput></TagInput>).find('.t-input');
    expect(wrapper1.classes('t-is-disabled')).toBeFalsy();
    // disabled = true
    const wrapper2 = mount(<TagInput disabled={true}></TagInput>).find('.t-input');
    expect(wrapper2.classes('t-is-disabled')).toBeTruthy();
    // disabled = false
    const wrapper3 = mount(<TagInput disabled={false}></TagInput>).find('.t-input');
    expect(wrapper3.classes('t-is-disabled')).toBeFalsy();
  });

  it('props.disabled: disabled TagInput does not need clearIcon', async () => {
    const wrapper = getTagInputValueMount({ disabled: true });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag-input__suffix-clear').exists()).toBeFalsy();
  });

  it('props.disabled: disabled TagInput can not trigger focus event', async () => {
    const onFocusFn = vi.fn();
    const wrapper = mount(<TagInput disabled={true} onFocus={onFocusFn}></TagInput>);
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const excessTagsDisplayTypeClassNameList = [{ 't-tag-input--break-line': false }, 't-tag-input--break-line'];
  ['scroll', 'break-line'].forEach((item, index) => {
    it(`props.excessTagsDisplayType is equal to ${item}`, () => {
      const wrapper = getTagInputValueMount({ excessTagsDisplayType: item });
      if (typeof excessTagsDisplayTypeClassNameList[index] === 'string') {
        expect(wrapper.classes(excessTagsDisplayTypeClassNameList[index])).toBeTruthy();
      } else if (typeof excessTagsDisplayTypeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(excessTagsDisplayTypeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it(`props.inputProps is equal to {size: 'small'}`, () => {
    const wrapper = mount(<TagInput inputProps={{ size: 'small' }}></TagInput>);
    const domWrapper = wrapper.find('.t-input');
    expect(domWrapper.classes('t-size-s')).toBeTruthy();
  });

  it(`props.inputValue is equal to input value text`, () => {
    const wrapper = mount(<TagInput inputValue={'input value text'}></TagInput>);
    const domWrapper = wrapper.find('input');
    expect(domWrapper.element.value).toBe('input value text');
  });

  it('props.label works fine', () => {
    const wrapper = mount(<TagInput label={() => <span class="custom-node">TNode</span>}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.label works fine', () => {
    const wrapper = mount(<TagInput v-slots={{ label: () => <span class="custom-node">TNode</span> }}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.max: could type only three tags', async () => {
    const wrapper = getTagInputDefaultMount({ max: 1 });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag3');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
    const inputDom3 = wrapper.find('input').element;
    simulateInputChange(inputDom3, 'Tag5');
    await wrapper.vm.$nextTick();
    const inputDom4 = wrapper.find('input').element;
    simulateInputEnter(inputDom4);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('props.minCollapsedNum works fine. `{".t-tag":4}` should exist', () => {
    const wrapper = getTagInputValueMount({ minCollapsedNum: 3 });
    expect(wrapper.findAll('.t-tag').length).toBe(4);
  });

  it('props.placeholder works fine', () => {
    const wrapper = mount(<TagInput placeholder={'This is TagInput placeholder'}></TagInput>).find('input');
    expect(wrapper.attributes('placeholder')).toBe('This is TagInput placeholder');
  });

  it('props.readonly works fine', () => {
    // readonly default value is false
    const wrapper1 = mount(<TagInput></TagInput>).find('.t-input');
    expect(wrapper1.classes('t-is-readonly')).toBeFalsy();
    // readonly = true
    const wrapper2 = mount(<TagInput readonly={true}></TagInput>).find('.t-input');
    expect(wrapper2.classes('t-is-readonly')).toBeTruthy();
    // readonly = false
    const wrapper3 = mount(<TagInput readonly={false}></TagInput>).find('.t-input');
    expect(wrapper3.classes('t-is-readonly')).toBeFalsy();
  });

  it('props.readonly: readonly TagInput does not need clearIcon', async () => {
    const on0Fn = vi.fn();
    const wrapper = getTagInputValueMount({ readonly: true }, { on0: on0Fn });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
  });

  it('props.readonly: readonly TagInput can not trigger focus event', async () => {
    const onFocusFn = vi.fn();
    const wrapper = mount(<TagInput readonly={true} onFocus={onFocusFn}></TagInput>);
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).not.toHaveBeenCalled();
  });

  const sizeClassNameList = ['t-size-s', { 't-size-m': false }, 't-size-l'];
  ['small', 'medium', 'large'].forEach((item, index) => {
    it(`props.size is equal to ${item}`, () => {
      const wrapper = mount(<TagInput size={item}></TagInput>).find('.t-input');
      if (typeof sizeClassNameList[index] === 'string') {
        expect(wrapper.classes(sizeClassNameList[index])).toBeTruthy();
      } else if (typeof sizeClassNameList[index] === 'object') {
        const classNameKey = Object.keys(sizeClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  const statusClassNameList = [{ 't-is-default': false }, 't-is-success', 't-is-warning', 't-is-error'];
  ['default', 'success', 'warning', 'error'].forEach((item, index) => {
    it(`props.status is equal to ${item}`, () => {
      const wrapper = mount(<TagInput status={item}></TagInput>).find('.t-input');
      if (typeof statusClassNameList[index] === 'string') {
        expect(wrapper.classes(statusClassNameList[index])).toBeTruthy();
      } else if (typeof statusClassNameList[index] === 'object') {
        const classNameKey = Object.keys(statusClassNameList[index])[0];
        expect(wrapper.classes(classNameKey)).toBeFalsy();
      }
    });
  });

  it('props.suffix works fine', () => {
    const wrapper = mount(<TagInput suffix={() => <span class="custom-node">TNode</span>}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffix works fine', () => {
    const wrapper = mount(<TagInput v-slots={{ suffix: () => <span class="custom-node">TNode</span> }}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.suffixIcon works fine', () => {
    const wrapper = mount(<TagInput suffixIcon={() => <span class="custom-node">TNode</span>}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.suffixIcon works fine', () => {
    const wrapper = mount(<TagInput v-slots={{ suffixIcon: () => <span class="custom-node">TNode</span> }}></TagInput>);
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.suffix-icon works fine', () => {
    const wrapper = mount(
      <TagInput v-slots={{ 'suffix-icon': () => <span class="custom-node">TNode</span> }}></TagInput>,
    );
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag works fine', () => {
    const wrapper = getTagInputValueMount({
      tag: () => <span class="custom-node">TNode</span>,
      value: ['tdesign-vue'],
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.tag works fine', () => {
    const wrapper = getTagInputValueMount({
      'v-slots': { tag: () => <span class="custom-node">TNode</span> },
      value: ['tdesign-vue'],
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.tag is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount({ tag: fn, value: ['tdesign-vue'] });
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].value).toBe('tdesign-vue');
  });
  it('slots.tag: a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount({ 'v-slots': { tag: fn }, value: ['tdesign-vue'] });

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].value).toBe('tdesign-vue');
  });

  it('props.tagProps is equal { theme: warning }', () => {
    const wrapper = getTagInputValueMount({ tagProps: { theme: 'warning' }, multiple: true });
    expect(wrapper.findAll('.t-tag--warning').length).toBe(5);
  });

  it('props.tagProps should effect minCollapseNum tag', () => {
    const wrapper = getTagInputValueMount({
      tagProps: { theme: 'warning' },
      multiple: true,
      minCollapsedNum: 2,
      value: ['tdesign-vue', 'tdesign-vue-next', 'tdesign-react'],
    });
    // tagProps 需要作用到 minCollapseNum 的 tag 上，2 个正常展示的tag 和 1 个折叠的 tag 都会被 tagProps 影响
    expect(wrapper.findAll('.t-tag--warning').length).toBe(3);
  });

  it('props.tips is equal this is a tip', () => {
    const wrapper = mount(<TagInput tips={'this is a tip'}></TagInput>);
    expect(wrapper.findAll('.t-input__tips').length).toBe(1);
  });

  it('props.value: controlled value test: only props can change count of tags', async () => {
    const wrapper = getTagInputDefaultMount({ value: [] });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag1');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.t-tag').exists()).toBeFalsy();
  });

  it('props.value: uncontrolled value test: count of tags can be changed inner TagInput', async () => {
    const wrapper = getTagInputDefaultMount(TagInput);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag2');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('props.valueDisplay works fine', () => {
    const wrapper = getTagInputValueMount({ valueDisplay: () => <span class="custom-node">TNode</span> });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('slots.valueDisplay works fine', () => {
    const wrapper = getTagInputValueMount({
      'v-slots': { valueDisplay: () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });
  it('slots.value-display works fine', () => {
    const wrapper = getTagInputValueMount({
      'v-slots': { 'value-display': () => <span class="custom-node">TNode</span> },
    });
    expect(wrapper.find('.custom-node').exists()).toBeTruthy();
  });

  it('props.valueDisplay is a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount({ valueDisplay: fn });
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][1].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
  });
  it('slots.valueDisplay: a function with params', () => {
    const fn = vi.fn();
    getTagInputValueMount({ 'v-slots': { valueDisplay: fn } });

    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
  });

  it('events.blur: trigger blur event and clear inputValue on blur', async () => {
    const onBlurFn2 = vi.fn();
    const onInputChangeFn2 = vi.fn();
    const wrapper = mount(<TagInput onBlur={onBlurFn2} onInputChange={onInputChangeFn2}></TagInput>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'tag1');
    await wrapper.vm.$nextTick();
    wrapper.find('input').trigger('blur');
    await wrapper.vm.$nextTick();
    const attrDom2 = wrapper.find('input');
    expect(attrDom2.element.value).toBe('');
    expect(onBlurFn2).toHaveBeenCalled();
    expect(onBlurFn2.mock.calls[0][0]).toEqual([]);
    expect(onBlurFn2.mock.calls[0][1].e.type).toBe('blur');
    expect(onBlurFn2.mock.calls[0][1].inputValue).toBe('tag1');
    expect(onInputChangeFn2).toHaveBeenCalled();
    expect(onInputChangeFn2.mock.calls[1][0]).toBe('');
    expect(onInputChangeFn2.mock.calls[1][1].e.type).toBe('blur');
    expect(onInputChangeFn2.mock.calls[1][1].trigger).toBe('blur');
  });

  it('events.clear: click clear icon, then clear all tags', async () => {
    const onClearFn1 = vi.fn();
    const onChangeFn1 = vi.fn();
    const wrapper = getTagInputValueMount({ clearable: true }, { onClear: onClearFn1, onChange: onChangeFn1 });
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    wrapper.find('.t-tag-input__suffix-clear').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onClearFn1).toHaveBeenCalled();
    expect(onClearFn1.mock.calls[0][0].e.type).toBe('click');
    expect(onChangeFn1).toHaveBeenCalled();
    expect(onChangeFn1.mock.calls[0][0]).toEqual([]);
    expect(onChangeFn1.mock.calls[0][1].trigger).toBe('clear');
  });

  it('events.click works fine', async () => {
    const fn = vi.fn();
    const wrapper = mount(<TagInput onClick={fn}></TagInput>);
    wrapper.find('.t-input').trigger('click');
    await wrapper.vm.$nextTick();
    expect(fn).toHaveBeenCalled();
    expect(fn.mock.calls[0][0].e.type).toBe('click');
  });

  it('events.enter works fine', async () => {
    const onEnterFn = vi.fn();
    const wrapper = getTagInputDefaultMount({ value: ['tag'] }, { onEnter: onEnterFn });
    const inputDom = wrapper.find('input').element;
    simulateInputEnter(inputDom);
    await wrapper.vm.$nextTick();
    expect(onEnterFn).toHaveBeenCalled();
    expect(onEnterFn.mock.calls[0][0]).toEqual(['tag']);
    expect(onEnterFn.mock.calls[0][1].e.type).toBe('keydown');
    expect(onEnterFn.mock.calls[0][1].inputValue).toBe('');
  });

  it('events.enter works fine', async () => {
    const wrapper = mount(<TagInput></TagInput>);
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    const inputDom1 = wrapper.find('input').element;
    simulateInputChange(inputDom1, 'Tag');
    await wrapper.vm.$nextTick();
    const inputDom2 = wrapper.find('input').element;
    simulateInputEnter(inputDom2);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.t-tag').length).toBe(1);
  });

  it('events.focus works fine', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getTagInputDefaultMount({}, { onFocus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('');
  });

  it('events.focus: expect focus not change inputValue', async () => {
    const onFocusFn = vi.fn();
    const wrapper = getTagInputDefaultMount({ inputValue: 'tag' }, { onFocus: onFocusFn });
    wrapper.find('input').trigger('focus');
    await wrapper.vm.$nextTick();
    expect(onFocusFn).toHaveBeenCalled();
    expect(onFocusFn.mock.calls[0][0]).toEqual([]);
    expect(onFocusFn.mock.calls[0][1].e.type).toBe('focus');
    expect(onFocusFn.mock.calls[0][1].inputValue).toBe('tag');
  });

  it('events.mouseenter works fine', async () => {
    const onMouseenterFn = vi.fn();
    const wrapper = mount(<TagInput onMouseenter={onMouseenterFn}></TagInput>);
    wrapper.find('.t-input').trigger('mouseenter');
    await wrapper.vm.$nextTick();
    expect(onMouseenterFn).toHaveBeenCalled();
    expect(onMouseenterFn.mock.calls[0][0].e.type).toBe('mouseenter');
  });

  it('events.mouseleave works fine', async () => {
    const onMouseleaveFn = vi.fn();
    const wrapper = mount(<TagInput onMouseleave={onMouseleaveFn}></TagInput>);
    wrapper.find('.t-input').trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(onMouseleaveFn).toHaveBeenCalled();
    expect(onMouseleaveFn.mock.calls[0][0].e.type).toBe('mouseleave');
  });

  it('events.paste works fine', async () => {
    const onPasteFn = vi.fn();
    const wrapper = mount(<TagInput onPaste={onPasteFn}></TagInput>);
    wrapper.find('input').trigger('paste');
    await wrapper.vm.$nextTick();
    expect(onPasteFn).toHaveBeenCalled();
    expect(onPasteFn.mock.calls[0][0].e.type).toBe('paste');
  });

  it('events.remove: remove last tag on keydown Backspace', async () => {
    const onRemoveFn = vi.fn();
    const wrapper = getTagInputValueMount({}, { onRemove: onRemoveFn });
    wrapper.find('input').trigger('keydown.backspace');
    await wrapper.vm.$nextTick();
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-vue',
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(4);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('backspace');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-mobile-react');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('keydown');
  });

  it('events.remove: remove any tag on click tag close icon', async () => {
    const onRemoveFn = vi.fn();
    const wrapper = getTagInputValueMount({}, { onRemove: onRemoveFn });
    wrapper.find('.t-tag__icon-close').trigger('click');
    await wrapper.vm.$nextTick();
    expect(onRemoveFn).toHaveBeenCalled();
    expect(onRemoveFn.mock.calls[0][0].value).toEqual([
      'tdesign-react',
      'tdesign-miniprogram',
      'tdesign-mobile-vue',
      'tdesign-mobile-react',
    ]);
    expect(onRemoveFn.mock.calls[0][0].index).toBe(0);
    expect(onRemoveFn.mock.calls[0][0].trigger).toBe('tag-remove');
    expect(onRemoveFn.mock.calls[0][0].item).toBe('tdesign-vue');
    expect(onRemoveFn.mock.calls[0][0].e.type).toBe('click');
  });
});

describe('TagInput', () => {
  describe(':props', () => {
    it(':value', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':defaultValue', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput defaultValue={tags.value} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
    });

    it(':autoWidth', () => {
      const wrapper = mount(() => <TagInput autoWidth />);
      expect(wrapper.classes()).toContain('t-input--auto-width');
    });

    it(':clearable', async () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} clearable />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      expect(closeIcon.exists()).toBeTruthy();
    });

    it(':disabled', () => {
      const wrapper = mount(() => <TagInput disabled />);
      const input = wrapper.find('.t-input');
      expect(input.classes()).toContain('t-is-disabled');
    });

    it(':dragSort', () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} dragSort />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList[0].element.getAttribute('draggable')).toBeTruthy();
      expect(tagList[1].element.getAttribute('draggable')).toBeTruthy();
    });

    it(':excessTagsDisplayType', () => {
      const tags = ref(['Vue', 'React', 'Vue', 'React', 'Vue', 'React', 'Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} />);
      const wrap = wrapper.find('.t-input__wrap');
      expect(wrap.classes()).toContain('t-tag-input--break-line');
    });

    it(':inputProps', () => {
      const wrapper = mount(() => <TagInput inputProps={{ label: 'label' }} />);
      const label = wrapper.find('.t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':inputValue', () => {
      const wrapper = mount(() => <TagInput inputValue="123" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe('123');
    });

    it(':defaultInputValue', () => {
      const wrapper = mount(() => <TagInput defaultInputValue="123" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.exists()).toBeTruthy();
      expect(input.element.value).toBe('123');
    });

    it(':label', () => {
      const wrapper = mount(() => <TagInput label="label" />);
      const label = wrapper.find('.t-input__prefix');
      expect(label.exists()).toBeTruthy();
      expect(label.text()).toBe('label');
    });

    it(':placeholder', () => {
      const wrapper = mount(() => <TagInput placeholder="请输入" />);
      const input = wrapper.find('.t-input__inner');
      expect(input.element.getAttribute('placeholder')).toBe('请输入');
    });

    it(':readonly', async () => {
      const value = ref('123');
      const tags = ref(['Vue', 'React', 'Vue', 'React', 'Vue', 'React', 'Vue', 'React']);

      const wrapper = mount(() => <TagInput readonly inputValue={value.value} />);
      const input = wrapper.find('.t-input__inner');
      value.value = '123123';
      expect(input.element.value).toBe('123');

      // readonly = false and able backspace
      const onRemoveFnOn = vi.fn();
      const wrapper1 = mount(() => <TagInput v-model={tags.value} onRemove={onRemoveFnOn} />);
      wrapper1.find('input').trigger('keydown.backspace');
      await wrapper1.vm.$nextTick();
      expect(onRemoveFnOn).toHaveBeenCalled();

      // readonly = true and prevent backspace
      const onRemoveFnUn = vi.fn();
      const wrapper2 = mount(() => <TagInput readonly v-model={tags.value} />);
      wrapper2.find('input').trigger('keydown.backspace');
      await wrapper2.vm.$nextTick();
      expect(onRemoveFnUn).not.toHaveBeenCalled();
    });

    it(':size', () => {
      const sizeList = ['small', 'large'];
      sizeList.forEach((size) => {
        const wrapper = mount(() => <TagInput size={size} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-size-${size.slice(0, 1)}`);
      });
    });

    it(':status', () => {
      const statusList = ['success', 'warning', 'error'];
      statusList.forEach((status) => {
        const wrapper = mount(() => <TagInput status={status} />);
        const input = wrapper.find('.t-input');
        expect(input.classes()).toContain(`t-is-${status}`);
      });
    });

    it(':suffix', () => {
      const wrapper = mount(() => <TagInput suffix="suffix" />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.text()).toBe('suffix');
    });

    it(':suffixIcon', () => {
      const slots = {
        suffixIcon: () => <AppIcon />,
      };
      const wrapper = mount(() => <TagInput v-slots={slots} />);
      const suffix = wrapper.find('.t-input__suffix');
      expect(suffix.exists()).toBeTruthy();
      expect(suffix.findComponent(AppIcon)).toBeTruthy();
    });

    it(':prefixIcon', () => {
      const slots = {
        prefixIcon: () => <AppIcon />,
      };
      const wrapper = mount(() => <TagInput v-slots={slots} />);
      const prefix = wrapper.find('.t-input__prefix');
      expect(prefix.exists()).toBeTruthy();
      expect(prefix.findComponent(AppIcon)).toBeTruthy();
    });

    it(':tips', () => {
      const wrapper = mount(() => <TagInput tips="tips" />);
      const tips = wrapper.find('.t-input__tips');
      expect(tips.exists()).toBeTruthy();
      expect(tips.text()).toBe('tips');
    });

    it(':tagProps', () => {
      const wrapper = mount(() => <TagInput tagProps={{ theme: 'success' }} />);
      const tags = wrapper.findAll('.t-tag');
      tags.forEach((tag) => {
        expect(tag.classes()).toContain('t-is--success');
      });
    });

    it(':minCollapsedNum', async () => {
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} minCollapsedNum={1} />);
      const tagList = wrapper.findAll('.t-tag');
      expect(tagList.length).toBe(2);
      expect(tagList[0].text()).toBe('Vue');
      expect(tagList[1].text()).toBe('+1');
    });
  });

  describe(':events', () => {
    it(':onBlur', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onBlur={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('blur');
      expect(fn).toBeCalled();
    });

    it(':onFocus', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onFocus={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('focus');
      expect(fn).toBeCalled();
    });

    it(':onClear', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} clearable onClear={fn} />);
      const input = wrapper.find('.t-input');
      input.trigger('mouseenter');
      await nextTick();
      const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
      await closeIcon.trigger('click');
      expect(fn).toBeCalled();
      expect(tags.value).toEqual([]);
    });

    it(':onMouseenter', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onMouseenter={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseenter');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onMouseleave', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onMouseleave={fn} />);
      const input = wrapper.find('.t-input');
      await input.trigger('mouseleave');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onPaste', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <TagInput onPaste={fn} />);
      const input = wrapper.find('.t-input input');
      await input.trigger('paste');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onRemove', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} onRemove={fn} />);
      const tagList = wrapper.findAll('.t-tag');
      const closeBtn = tagList[1].findComponent(CloseIcon);
      await closeBtn.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onChange', async () => {
      const fn = vi.fn();
      const tags = ref(['Vue', 'React']);
      const wrapper = mount(() => <TagInput v-model={tags.value} onChange={fn} />);
      const tagList = wrapper.findAll('.t-tag');
      const closeBtn = tagList[1].findComponent(CloseIcon);
      await closeBtn.trigger('click');
      await nextTick();
      expect(fn).toBeCalled();
    });

    it(':onInputChange', async () => {
      const tags = ref(['Vue', 'React']);
      const data = ref('');
      const value = ref('');
      const handleChange = (val) => {
        value.value = val;
      };
      await nextTick();
      const wrapper = mount(() => (
        <TagInput v-model={tags.value} inputValue={data.value} onInputChange={handleChange} />
      ));
      const el = wrapper.find('.t-input__wrap input').element;
      const simulateEvent = (text, event) => {
        el.value = text;
        el.dispatchEvent(new Event(event));
      };
      simulateEvent('2', 'input');
      await nextTick();
      expect(value.value).toBe('2');
    });
  });
});
