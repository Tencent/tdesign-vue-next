import { nextTick } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Form, TagInput } from '@tdesign/components';
import tagInputProps from '../props';
import type { TdTagInputProps, TagInputValue } from '../type';

const DEFAULT_TAGS: TagInputValue = ['Vue', 'React', 'Svelte'];

describe('TagInput', () => {
  const wrappers: VueWrapper[] = [];

  const track = <T extends VueWrapper>(wrapper: T) => {
    wrappers.push(wrapper);
    return wrapper;
  };

  const render = (props: TdTagInputProps = {}, slots: Record<string, (...args: unknown[]) => unknown> = {}) =>
    track(
      mount(TagInput, {
        props,
        slots,
      }),
    );

  const getInput = (wrapper: VueWrapper) => wrapper.find<HTMLInputElement>('.t-input__inner');

  afterEach(() => {
    wrappers.splice(0).forEach((wrapper) => wrapper.unmount());
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':autoWidth[boolean]', async () => {
      const wrapper = render();
      expect(wrapper.classes()).not.toContain('t-input--auto-width');

      await wrapper.setProps({ autoWidth: true });
      expect(wrapper.classes()).toContain('t-input--auto-width');
    });

    it(':borderless[boolean]', async () => {
      const wrapper = render();
      expect(wrapper.find('.t-input--borderless').exists()).toBe(false);

      await wrapper.setProps({ borderless: true });
      expect(wrapper.find('.t-input--borderless').exists()).toBe(true);
    });

    it(':clearable[boolean]', async () => {
      const wrapper = render({ clearable: true });
      await wrapper.find('.t-input').trigger('mouseenter');
      expect(wrapper.findComponent(CloseCircleFilledIcon).exists()).toBe(false);

      const valueWrapper = render({ clearable: true, defaultValue: DEFAULT_TAGS });
      await valueWrapper.find('.t-input').trigger('mouseenter');
      expect(valueWrapper.find('.t-tag-input__suffix-clear').exists()).toBe(true);

      await valueWrapper.setProps({ disabled: true });
      expect(valueWrapper.find('.t-tag-input__suffix-clear').exists()).toBe(false);

      await valueWrapper.setProps({ disabled: false, readonly: true });
      expect(valueWrapper.find('.t-tag-input__suffix-clear').exists()).toBe(false);
    });

    it(':collapsedItems[function]', () => {
      const collapsedItems = vi.fn((_createElement, params) => (
        <span class="collapsed-function">{params.collapsedSelectedItems.join(',')}</span>
      ));
      const wrapper = render({ defaultValue: DEFAULT_TAGS, minCollapsedNum: 1, collapsedItems });

      expect(wrapper.find('.collapsed-function').text()).toBe('React,Svelte');
      expect(collapsedItems).toHaveBeenCalledTimes(1);
      expect(collapsedItems.mock.calls[0][1]).toMatchObject({
        value: DEFAULT_TAGS,
        collapsedSelectedItems: ['React', 'Svelte'],
        count: 2,
      });
    });

    it(':collapsedItems[slot]', () => {
      const collapsedItems = vi.fn(({ collapsedSelectedItems }: { collapsedSelectedItems: TagInputValue }) => (
        <span class="collapsed-slot">{collapsedSelectedItems.join('|')}</span>
      ));
      const wrapper = render({ defaultValue: DEFAULT_TAGS, minCollapsedNum: 1 }, { collapsedItems });

      expect(wrapper.find('.collapsed-slot').text()).toBe('React|Svelte');
      expect(collapsedItems).toHaveBeenCalledTimes(1);
    });

    it(':disabled[boolean]', async () => {
      const onClick = vi.fn();
      const wrapper = render({ disabled: true, onClick });

      expect(wrapper.find('.t-input').classes()).toContain('t-is-disabled');
      expect(getInput(wrapper).attributes('disabled')).toBeDefined();
      await wrapper.find('.t-input').trigger('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    it(':disabled[form]', () => {
      const wrapper = track(
        mount(() => (
          <Form disabled>
            <TagInput />
          </Form>
        )),
      );

      expect(wrapper.find('.t-input').classes()).toContain('t-is-disabled');
    });

    it(':dragSort[boolean]', () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, dragSort: true });
      const tags = wrapper.findAll('.t-tag');

      expect(wrapper.classes()).toContain('t-tag-input--drag-sort');
      expect(tags).toHaveLength(3);
      tags.forEach((tag) => expect(tag.attributes('draggable')).toBe('true'));
    });

    it(':excessTagsDisplayType[scroll/break-line]', async () => {
      const validator = tagInputProps.excessTagsDisplayType.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('scroll')).toBe(true);
      expect(validator('break-line')).toBe(true);
      // @ts-expect-error verify runtime validation for an unsupported value
      expect(validator('other')).toBe(false);

      const wrapper = render();
      expect(wrapper.classes()).toContain('t-tag-input--break-line');

      await wrapper.setProps({ excessTagsDisplayType: 'scroll' });
      expect(wrapper.classes()).not.toContain('t-tag-input--break-line');
    });

    it(':inputProps[object]', async () => {
      const onFocus = vi.fn();
      const wrapper = render({
        inputProps: {
          name: 'framework',
          maxlength: 8,
          autocomplete: 'off',
          label: 'Input label',
          onFocus,
        },
      });

      const input = getInput(wrapper);
      expect(input.attributes('name')).toBe('framework');
      expect(input.attributes('autocomplete')).toBe('off');
      expect(wrapper.find('.t-input__prefix').text()).toBe('Input label');
      await input.trigger('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it(':inputValue[string]', async () => {
      const wrapper = render({ inputValue: 'Vue' });
      expect(getInput(wrapper).element.value).toBe('Vue');

      await getInput(wrapper).setValue('React');
      expect(getInput(wrapper).element.value).toBe('Vue');

      await wrapper.setProps({ inputValue: 'Svelte' });
      expect(getInput(wrapper).element.value).toBe('Svelte');
    });

    it(':inputValue[number]', () => {
      const wrapper = render({ inputValue: 123 as unknown as string });
      expect(getInput(wrapper).element.value).toBe('123');
    });

    it(':defaultInputValue[string]', async () => {
      const wrapper = render({ defaultInputValue: 'Vue' });
      expect(getInput(wrapper).element.value).toBe('Vue');

      await getInput(wrapper).setValue('React');
      expect(getInput(wrapper).element.value).toBe('React');
    });

    it(':defaultInputValue[number]', () => {
      const wrapper = render({ defaultInputValue: 123 as unknown as string });
      expect(getInput(wrapper).element.value).toBe('123');
    });

    it(':label[string]', () => {
      const wrapper = render({ label: 'Framework' });
      expect(wrapper.find('.t-tag-input__prefix').text()).toBe('Framework');
    });

    it(':label[function]', () => {
      const wrapper = render({ label: () => <span class="label-function">Framework</span> });
      expect(wrapper.find('.label-function').text()).toBe('Framework');
    });

    it(':label[slot]', () => {
      const wrapper = render({}, { label: () => <span class="label-slot">Framework</span> });
      expect(wrapper.find('.label-slot').text()).toBe('Framework');
    });

    it(':max[number]', async () => {
      const onChange = vi.fn();
      const onEnter = vi.fn();
      const wrapper = render({ defaultValue: ['Vue'], max: 1, onChange, onEnter });

      await getInput(wrapper).setValue('React');
      await getInput(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' });
      expect(wrapper.findAll('.t-tag')).toHaveLength(1);
      expect(onChange).not.toHaveBeenCalled();
      expect(onEnter).toHaveBeenCalledWith(['Vue'], expect.objectContaining({ inputValue: 'React' }));
    });

    it(':minCollapsedNum[number]', async () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, minCollapsedNum: 1 });
      expect(wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(['Vue', '+2']);

      await wrapper.setProps({ minCollapsedNum: 0 });
      expect(wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(DEFAULT_TAGS);
    });

    it(':placeholder[string]', async () => {
      const wrapper = render({ placeholder: 'Add framework' });
      expect(getInput(wrapper).attributes('placeholder')).toBe('Add framework');

      const valueWrapper = render({ placeholder: 'Add framework', defaultValue: ['Vue'] });
      expect(getInput(valueWrapper).attributes('placeholder')).toBe('');
    });

    it(':prefixIcon[function]', () => {
      const wrapper = render({ prefixIcon: () => <span class="prefix-icon-function">P</span> });
      expect(wrapper.find('.prefix-icon-function').text()).toBe('P');
    });

    it(':prefixIcon[slot]', () => {
      const wrapper = render({}, { prefixIcon: () => <span class="prefix-icon-slot">P</span> });
      expect(wrapper.find('.prefix-icon-slot').text()).toBe('P');
    });

    it(':readonly[boolean]', () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, readonly: true });

      expect(wrapper.find('.t-input').classes()).toContain('t-is-readonly');
      expect(getInput(wrapper).classes()).toContain('t-input--soft-hidden');
      expect(getInput(wrapper).attributes('readonly')).toBeDefined();
      expect(wrapper.findAll('.t-tag__icon-close')).toHaveLength(0);
    });

    it(':readonly[form]', () => {
      const wrapper = track(
        mount(() => (
          <Form readonly>
            <TagInput defaultValue={DEFAULT_TAGS} />
          </Form>
        )),
      );

      expect(wrapper.find('.t-input').classes()).toContain('t-is-readonly');
      expect(wrapper.find('.t-input__inner').classes()).toContain('t-input--soft-hidden');
    });

    it(':readonly[inputProps]', () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, inputProps: { readonly: true } });
      expect(wrapper.find('.t-input__inner').classes()).toContain('t-input--soft-hidden');
    });

    it(':size[small/medium/large]', async () => {
      const validator = tagInputProps.size.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error verify runtime validation for an unsupported value
      expect(validator('other')).toBe(false);

      const wrapper = render({ size: 'small' });
      expect(wrapper.find('.t-input').classes()).toContain('t-size-s');

      await wrapper.setProps({ size: 'medium' });
      expect(wrapper.find('.t-input').classes()).not.toContain('t-size-s');
      expect(wrapper.find('.t-input').classes()).not.toContain('t-size-l');

      await wrapper.setProps({ size: 'large' });
      expect(wrapper.find('.t-input').classes()).toContain('t-size-l');
    });

    it(':status[default/success/warning/error]', async () => {
      const validator = tagInputProps.status.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      // @ts-expect-error verify runtime validation for an unsupported value
      expect(validator('other')).toBe(false);

      const wrapper = render({ status: 'success' });
      expect(wrapper.find('.t-input').classes()).toContain('t-is-success');

      await wrapper.setProps({ status: 'warning' });
      expect(wrapper.find('.t-input').classes()).toContain('t-is-warning');

      await wrapper.setProps({ status: 'error' });
      expect(wrapper.find('.t-input').classes()).toContain('t-is-error');

      await wrapper.setProps({ status: 'default' });
      expect(
        wrapper
          .find('.t-input')
          .classes()
          .some((name) => name.startsWith('t-is-default')),
      ).toBe(false);
    });

    it(':suffix[string]', () => {
      const wrapper = render({ suffix: 'items' });
      expect(wrapper.find('.t-input__suffix').text()).toBe('items');
    });

    it(':suffix[function]', () => {
      const wrapper = render({ suffix: () => <span class="suffix-function">items</span> });
      expect(wrapper.find('.suffix-function').text()).toBe('items');
    });

    it(':suffix[slot]', () => {
      const wrapper = render({}, { suffix: () => <span class="suffix-slot">items</span> });
      expect(wrapper.find('.suffix-slot').text()).toBe('items');
    });

    it(':suffixIcon[function]', () => {
      const wrapper = render({ suffixIcon: () => <span class="suffix-icon-function">S</span> });
      expect(wrapper.find('.suffix-icon-function').text()).toBe('S');
      expect(wrapper.classes()).toContain('t-tag-input__with-suffix-icon');
    });

    it(':suffixIcon[slot]', () => {
      const wrapper = render({}, { suffixIcon: () => <span class="suffix-icon-slot">S</span> });
      expect(wrapper.find('.suffix-icon-slot').text()).toBe('S');
    });

    it(':tag[string]', () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, tag: 'framework' });
      expect(wrapper.findAll('.t-tag').map((tag) => tag.text())).toEqual(['framework', 'framework', 'framework']);
    });

    it(':tag[function]', () => {
      const tag = vi.fn((_createElement, { value }) => <span class="tag-function">{value}</span>);
      const wrapper = render({ defaultValue: ['Vue'], tag });

      expect(wrapper.find('.tag-function').text()).toBe('Vue');
      expect(tag.mock.calls[0][1]).toEqual({ value: 'Vue' });
    });

    it(':tag[slot]', () => {
      const tag = vi.fn(({ value }: { value: string | number }) => <span class="tag-slot">{value}</span>);
      const wrapper = render({ defaultValue: ['Vue'] }, { tag });

      expect(wrapper.find('.tag-slot').text()).toBe('Vue');
      expect(tag).toHaveBeenCalledWith({ value: 'Vue' });
    });

    it(':tagProps[object]', () => {
      const wrapper = render({
        defaultValue: DEFAULT_TAGS,
        minCollapsedNum: 1,
        tagProps: { theme: 'warning', variant: 'outline' },
      });

      expect(wrapper.findAll('.t-tag--warning')).toHaveLength(2);
      expect(wrapper.findAll('.t-tag--outline')).toHaveLength(2);
    });

    it(':tips[string]', () => {
      const wrapper = render({ tips: 'Up to three tags' });
      expect(wrapper.find('.t-input__tips').text()).toBe('Up to three tags');
    });

    it(':tips[function]', () => {
      const wrapper = render({ tips: () => <span class="tips-function">Up to three tags</span> });
      expect(wrapper.find('.tips-function').text()).toBe('Up to three tags');
    });

    it(':tips[slot]', () => {
      const wrapper = render({}, { tips: () => <span class="tips-slot">Up to three tags</span> });

      // Current behavior: TagInput forwards the tips prop, but not the documented tips slot.
      expect(wrapper.find('.tips-slot').exists()).toBe(false);
      expect(wrapper.find('.t-input__tips').exists()).toBe(false);
    });

    it(':value[array]', async () => {
      const onChange = vi.fn();
      const wrapper = render({ value: ['Vue'], onChange });

      await wrapper.find('.t-tag__icon-close').trigger('click');
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'tag-remove', item: 'Vue' }));
      expect(wrapper.findAll('.t-tag')).toHaveLength(1);

      await wrapper.setProps({ value: [] });
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);
    });

    it(':modelValue[array]', async () => {
      const onUpdate = vi.fn();
      const wrapper = render({
        modelValue: ['Vue'],
        'onUpdate:modelValue': onUpdate,
      } as TdTagInputProps & { 'onUpdate:modelValue': typeof onUpdate });

      await wrapper.find('.t-tag__icon-close').trigger('click');
      expect(onUpdate).toHaveBeenCalledWith([]);
    });

    it(':defaultValue[array]', async () => {
      const wrapper = render({ defaultValue: ['Vue'] });
      expect(wrapper.findAll('.t-tag')).toHaveLength(1);

      await wrapper.find('.t-tag__icon-close').trigger('click');
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);
    });

    it(':valueDisplay[string]', () => {
      const wrapper = render({ defaultValue: DEFAULT_TAGS, valueDisplay: 'Selected frameworks' });
      expect(wrapper.find('.t-input__prefix').text()).toBe('Selected frameworks');
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);
    });

    it(':valueDisplay[function]', async () => {
      let close: ((index: number) => void) | undefined;
      const valueDisplay = vi.fn((_createElement, params) => {
        close = params.onClose;
        return <span class="value-display-function">{params.value.join(',')}</span>;
      });
      const onRemove = vi.fn();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, valueDisplay, onRemove });

      expect(wrapper.find('.value-display-function').text()).toBe('Vue,React,Svelte');
      close?.(1);
      await nextTick();
      expect(onRemove).toHaveBeenCalledWith(
        expect.objectContaining({ index: 1, item: 'React', trigger: 'tag-remove', value: ['Vue', 'Svelte'] }),
      );
    });

    it(':valueDisplay[slot]', () => {
      const valueDisplay = vi.fn(({ value }: { value: TagInputValue }) => (
        <span class="value-display-slot">{value.join('|')}</span>
      ));
      const wrapper = render({ defaultValue: DEFAULT_TAGS }, { valueDisplay });

      expect(wrapper.find('.value-display-slot').text()).toBe('Vue|React|Svelte');
      expect(valueDisplay).toHaveBeenCalledWith(expect.objectContaining({ value: DEFAULT_TAGS }));
    });
  });

  describe('events', () => {
    it(':onBlur', async () => {
      const onBlur = vi.fn();
      const onInputChange = vi.fn();
      const wrapper = render({ defaultValue: ['Vue'], onBlur, onInputChange });
      const input = getInput(wrapper);

      await input.setValue('React');
      await input.trigger('blur');

      expect(onBlur).toHaveBeenCalledWith(
        ['Vue'],
        expect.objectContaining({ inputValue: 'React', e: expect.objectContaining({ type: 'blur' }) }),
      );
      expect(onInputChange).toHaveBeenLastCalledWith('', expect.objectContaining({ trigger: 'blur' }));
      expect(input.element.value).toBe('');
    });

    it(':onChange[enter]', async () => {
      const onChange = vi.fn();
      const wrapper = render({ defaultValue: ['Vue'], onChange });
      const input = getInput(wrapper);

      await input.setValue('  React  ');
      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });

      expect(onChange).toHaveBeenCalledWith(
        ['Vue', 'React'],
        expect.objectContaining({ trigger: 'enter', index: 1, item: 'React' }),
      );
    });

    it(':onChange[tag-remove]', async () => {
      const onChange = vi.fn();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, onChange });

      await wrapper.findAll('.t-tag__icon-close')[1].trigger('click');
      expect(onChange).toHaveBeenCalledWith(
        ['Vue', 'Svelte'],
        expect.objectContaining({ trigger: 'tag-remove', index: 1, item: 'React' }),
      );
    });

    it(':onChange[backspace]', async () => {
      const onChange = vi.fn();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, onChange });

      await getInput(wrapper).trigger('keydown', { key: 'Backspace', code: 'Backspace' });
      expect(onChange).toHaveBeenCalledWith(
        ['Vue', 'React'],
        expect.objectContaining({ trigger: 'backspace', index: 2, item: 'Svelte' }),
      );
    });

    it(':onClear', async () => {
      const onChange = vi.fn();
      const onClear = vi.fn();
      const onInputChange = vi.fn();
      const wrapper = render({
        defaultValue: DEFAULT_TAGS,
        defaultInputValue: 'Solid',
        clearable: true,
        onChange,
        onClear,
        onInputChange,
      });

      await wrapper.find('.t-input').trigger('mouseenter');
      await wrapper.find('.t-tag-input__suffix-clear').trigger('click');

      expect(onClear).toHaveBeenCalledWith(expect.objectContaining({ e: expect.objectContaining({ type: 'click' }) }));
      expect(onChange).toHaveBeenCalledWith([], expect.objectContaining({ trigger: 'clear' }));
      expect(onInputChange).toHaveBeenLastCalledWith('', expect.objectContaining({ trigger: 'clear' }));
    });

    it(':onClick', async () => {
      const onClick = vi.fn();
      const wrapper = render({ onClick });
      const focus = vi.spyOn(getInput(wrapper).element, 'focus');

      await wrapper.find('.t-input').trigger('click');
      expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ e: expect.objectContaining({ type: 'click' }) }));
      expect(focus).toHaveBeenCalled();
    });

    it(':onDragSort', async () => {
      const onDragSort = vi.fn();
      const wrapper = render({ defaultValue: ['Vue', 'React'], dragSort: true, onDragSort });
      const [first, second] = wrapper.findAll('.t-tag');
      vi.spyOn(first.element, 'getBoundingClientRect').mockReturnValue({ x: 0, width: 20 } as DOMRect);
      vi.spyOn(second.element, 'getBoundingClientRect').mockReturnValue({ x: 20, width: 20 } as DOMRect);

      await first.trigger('dragstart', { clientX: 10 });
      await second.trigger('dragover', { clientX: 30 });

      // Current behavior: runtime omits newTags although TagInputDragSortContext declares it as required.
      expect(onDragSort).toHaveBeenCalledWith({ currentIndex: 0, current: 'Vue', targetIndex: 1, target: 'React' });
    });

    it(':onEnter', async () => {
      const onEnter = vi.fn();
      const wrapper = render({ defaultValue: ['Vue'], onEnter });
      const input = getInput(wrapper);

      await input.setValue('React');
      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });

      expect(onEnter).toHaveBeenCalledWith(
        ['Vue', 'React'],
        expect.objectContaining({ inputValue: 'React', e: expect.objectContaining({ defaultPrevented: true }) }),
      );
    });

    it(':onFocus', async () => {
      const onFocus = vi.fn();
      const wrapper = render({ defaultValue: ['Vue'], defaultInputValue: 'React', onFocus });
      const input = getInput(wrapper);

      await input.trigger('focus');
      await input.trigger('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onFocus).toHaveBeenCalledWith(
        ['Vue'],
        expect.objectContaining({ inputValue: 'React', e: expect.objectContaining({ type: 'focus' }) }),
      );

      await input.trigger('blur');
      await input.trigger('focus');
      expect(onFocus).toHaveBeenCalledTimes(2);
    });

    it(':onInputChange[input/enter]', async () => {
      const onInputChange = vi.fn();
      const wrapper = render({ onInputChange });
      const input = getInput(wrapper);

      await input.setValue('Vue');
      expect(onInputChange).toHaveBeenLastCalledWith('Vue', expect.objectContaining({ trigger: 'input' }));

      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });
      expect(onInputChange).toHaveBeenLastCalledWith('', expect.objectContaining({ trigger: 'enter' }));
    });

    it(':onMouseenter', async () => {
      const onMouseenter = vi.fn();
      const wrapper = render({ onMouseenter });

      await wrapper.find('.t-input').trigger('mouseenter');
      expect(onMouseenter).toHaveBeenCalledWith(
        expect.objectContaining({ e: expect.objectContaining({ type: 'mouseenter' }) }),
      );
    });

    it(':onMouseleave', async () => {
      const onMouseleave = vi.fn();
      const wrapper = render({ onMouseleave });

      await wrapper.find('.t-input').trigger('mouseleave');
      expect(onMouseleave).toHaveBeenCalledWith(
        expect.objectContaining({ e: expect.objectContaining({ type: 'mouseleave' }) }),
      );
    });

    it(':onPaste', async () => {
      const onPaste = vi.fn();
      const wrapper = render({ onPaste });

      await getInput(wrapper).trigger('paste', {
        clipboardData: { getData: () => 'Vue' },
      });
      expect(onPaste).toHaveBeenCalledWith(
        expect.objectContaining({ pasteValue: 'Vue', e: expect.objectContaining({ type: 'paste' }) }),
      );
    });

    it(':onRemove[tag-remove]', async () => {
      const onRemove = vi.fn();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, onRemove });

      await wrapper.findAll('.t-tag__icon-close')[1].trigger('click');
      expect(onRemove).toHaveBeenCalledWith(
        expect.objectContaining({
          value: ['Vue', 'Svelte'],
          index: 1,
          item: 'React',
          trigger: 'tag-remove',
        }),
      );
    });

    it(':onRemove[backspace]', async () => {
      const onRemove = vi.fn();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, onRemove });

      await getInput(wrapper).trigger('keydown', { key: 'Backspace', code: 'Backspace' });
      expect(onRemove).toHaveBeenCalledWith(
        expect.objectContaining({
          value: ['Vue', 'React'],
          index: 2,
          item: 'Svelte',
          trigger: 'backspace',
        }),
      );
    });

    it(':inputProps[event forwarding]', async () => {
      const onChange = vi.fn();
      const onCompositionstart = vi.fn();
      const onCompositionend = vi.fn();
      const wrapper = render({ inputProps: { onChange, onCompositionstart, onCompositionend } });
      const input = getInput(wrapper);

      await input.setValue('Vue');
      await input.trigger('compositionstart');
      await input.trigger('compositionend');

      expect(onChange).toHaveBeenCalled();
      expect(onCompositionstart).toHaveBeenCalledWith('Vue', expect.any(Object));
      expect(onCompositionend).toHaveBeenCalledWith('Vue', expect.any(Object));
    });

    it(':composition[enter]', async () => {
      const onEnter = vi.fn();
      const wrapper = render({ onEnter });
      const input = getInput(wrapper);

      await input.setValue('Vue');
      await input.trigger('compositionstart');
      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });
      expect(onEnter).not.toHaveBeenCalled();
      expect(wrapper.findAll('.t-tag')).toHaveLength(0);

      await input.trigger('compositionend');
      await input.trigger('keydown', { key: 'Enter', code: 'Enter' });
      expect(onEnter).toHaveBeenCalledTimes(1);
      expect(wrapper.findAll('.t-tag')).toHaveLength(1);
    });
  });

  describe('lifecycle', () => {
    it('handles an input stub without the expected input element', async () => {
      const wrapper = track(
        mount(TagInput, {
          props: { suffix: 'items' },
          global: { stubs: { TInput: true } },
        }),
      );

      await nextTick();
      await nextTick();
      expect(wrapper.find('t-input-stub').exists()).toBe(true);
    });

    it('updates and removes suffix width variables', async () => {
      let measuredWidth = 20;
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function mockRect(this: HTMLElement) {
        const width = this.matches('.t-input__suffix, .t-input__suffix-icon') ? measuredWidth : 0;
        return { width } as DOMRect;
      });
      const wrapper = render({ suffix: 'items', suffixIcon: () => <span>S</span> });
      await nextTick();
      await nextTick();
      const input = wrapper.find<HTMLElement>('.t-input').element;

      expect(input.style.getPropertyValue('--t-tag-input-suffix-width')).toBe('28px');
      expect(input.style.getPropertyValue('--t-tag-input-suffix-icon-width')).toBe('28px');

      measuredWidth = 0;
      await wrapper.setProps({ size: 'large' });
      await nextTick();
      expect(input.style.getPropertyValue('--t-tag-input-suffix-width')).toBe('');
      expect(input.style.getPropertyValue('--t-tag-input-suffix-icon-width')).toBe('');
    });

    it('toggles the scrollable prefix class', async () => {
      vi.useFakeTimers();
      const wrapper = render({ defaultValue: DEFAULT_TAGS, excessTagsDisplayType: 'scroll' });
      const prefix = wrapper.find<HTMLElement>('.t-input__prefix').element;
      prefix.scroll = vi.fn();
      Object.defineProperty(prefix, 'scrollWidth', { configurable: true, value: 300 });
      Object.defineProperty(prefix, 'clientWidth', { configurable: true, value: 100 });

      await wrapper.find('.t-input').trigger('mouseenter');
      await vi.runAllTimersAsync();
      await nextTick();
      expect(prefix.classList.contains('t-input__prefix--scrollable')).toBe(true);

      await wrapper.find('.t-input').trigger('mouseleave');
      await nextTick();
      expect(prefix.classList.contains('t-input__prefix--scrollable')).toBe(false);
    });

    it('does not toggle the scrollable class in break-line mode', async () => {
      vi.useFakeTimers();
      const wrapper = render({ defaultValue: DEFAULT_TAGS });
      const prefix = wrapper.find<HTMLElement>('.t-input__prefix').element;
      prefix.scroll = vi.fn();
      Object.defineProperty(prefix, 'scrollWidth', { configurable: true, value: 300 });
      Object.defineProperty(prefix, 'clientWidth', { configurable: true, value: 100 });

      await getInput(wrapper).setValue('Solid');
      await getInput(wrapper).trigger('keydown', { key: 'Enter', code: 'Enter' });
      await vi.runAllTimersAsync();
      await nextTick();

      expect(prefix.classList.contains('t-input__prefix--scrollable')).toBe(false);
    });
  });
});
