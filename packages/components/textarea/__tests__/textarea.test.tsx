import { mount, type VueWrapper } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Textarea, { type TextareaProps, type TextareaValue } from '@tdesign/components/textarea';
import textareaProps from '@tdesign/components/textarea/props';
import { FormItemInjectionKey } from '@tdesign/components/form/constants';
import { sleep } from '@tdesign/internal-utils';

const INFO = '.t-textarea__info_wrapper';
const LIMIT = '.t-textarea__limit';
const TIPS = '.t-textarea__tips';

const computedStyleValues: Record<string, string> = {
  'border-bottom-width': '1px',
  'border-top-width': '1px',
  'box-sizing': 'border-box',
  'padding-bottom': '2px',
  'padding-top': '2px',
};

const getTextarea = (wrapper: VueWrapper) => wrapper.get<HTMLTextAreaElement>('textarea');

const invokeVueListener = (element: Element, listenerName: string, event: Event) => {
  const invokerKey = Object.getOwnPropertySymbols(element).find((key) => key.description === '_vei');
  if (!invokerKey) throw new Error('Vue event invokers were not found');
  const invokers = (element as unknown as Record<symbol, Record<string, (event: Event) => void>>)[invokerKey];
  invokers[listenerName](event);
};

const mockTextareaHeight = () => {
  vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: (property: string) => computedStyleValues[property] || '',
  } as CSSStyleDeclaration);
  vi.spyOn(HTMLTextAreaElement.prototype, 'scrollHeight', 'get').mockImplementation(function (
    this: HTMLTextAreaElement,
  ) {
    return this.value ? 48 : 20;
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Textarea', () => {
  describe('props', () => {
    it(':allowInputOverMax[boolean]', async () => {
      const maxlengthWrapper = mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: '', maxlength: 5 },
      });
      const maxlengthTextarea = getTextarea(maxlengthWrapper);

      expect(maxlengthTextarea.attributes('maxlength')).toBeUndefined();
      await maxlengthTextarea.setValue('123456');
      expect(maxlengthTextarea.element.value).toBe('123456');
      expect(maxlengthWrapper.get(LIMIT).text()).toBe('6/5');

      const maxcharacterWrapper = mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: '', maxcharacter: 4 },
      });
      const maxcharacterTextarea = getTextarea(maxcharacterWrapper);

      await maxcharacterTextarea.setValue('你好a');
      expect(maxcharacterTextarea.element.value).toBe('你好a');
      expect(maxcharacterWrapper.get(LIMIT).text()).toBe('5/4');
    });

    it(':autofocus[boolean]', async () => {
      const host = document.createElement('div');
      document.body.appendChild(host);
      const wrapper = mount(Textarea, {
        attachTo: host,
        props: { autofocus: true },
      });

      await nextTick();

      const textarea = getTextarea(wrapper);
      expect(textarea.attributes('autofocus')).toBeDefined();
      expect(document.activeElement).toBe(textarea.element);

      wrapper.unmount();
      host.remove();
    });

    it(':autosize[boolean]', async () => {
      mockTextareaHeight();

      const wrapper = mount(Textarea, {
        props: { autosize: true, defaultValue: 'content' },
      });
      await sleep(0);

      const textarea = getTextarea(wrapper);
      expect(textarea.classes()).toContain('t-hide-scrollbar');
      expect(textarea.classes()).not.toContain('t-resize-none');
      expect(textarea.element.style.height).toBe('50px');
      expect(textarea.element.style.minHeight).toBe('22px');

      await wrapper.setProps({ autosize: false });
      await sleep(0);

      expect(textarea.classes()).not.toContain('t-hide-scrollbar');
      // Current behavior is tracked by #6846. Autosize dimensions should be cleared after the source is fixed.
      expect(textarea.element.style.height).toBe('50px');
      expect(textarea.element.style.minHeight).toBe('22px');

      const defaultWrapper = mount(Textarea);
      await sleep(0);
      const defaultTextarea = getTextarea(defaultWrapper);
      expect(defaultTextarea.element.style.height).toBe('');
      expect(defaultTextarea.element.style.minHeight).toBe('');
    });

    it(':autosize[object]', async () => {
      mockTextareaHeight();

      const wrapper = mount(Textarea, {
        props: { autosize: { minRows: 2, maxRows: 6 }, defaultValue: 'content' },
      });
      await sleep(0);

      const textarea = getTextarea(wrapper);
      expect(textarea.classes()).toContain('t-resize-none');
      expect(textarea.classes()).not.toContain('t-hide-scrollbar');
      expect(textarea.element.style.height).toBe('50px');
      expect(textarea.element.style.minHeight).toBe('38px');

      await wrapper.setProps({ autosize: { minRows: 3, maxRows: 8 } });
      await sleep(0);
      expect(textarea.element.style.height).toBe('54px');
      expect(textarea.element.style.minHeight).toBe('54px');
    });

    it(':disabled[boolean]', () => {
      const onFocus = vi.fn();
      const onKeydown = vi.fn();
      const onKeypress = vi.fn();
      const onKeyup = vi.fn();
      const wrapper = mount(Textarea, {
        props: { disabled: true, onFocus, onKeydown, onKeypress, onKeyup },
      });
      const textarea = getTextarea(wrapper);

      expect(wrapper.classes()).toContain('t-is-disabled');
      expect(textarea.classes()).toContain('t-is-disabled');
      expect(textarea.attributes('disabled')).toBeDefined();

      invokeVueListener(textarea.element, 'onFocus', new FocusEvent('focus'));
      invokeVueListener(textarea.element, 'onKeydown', new KeyboardEvent('keydown'));
      invokeVueListener(textarea.element, 'onKeypress', new KeyboardEvent('keypress'));
      invokeVueListener(textarea.element, 'onKeyup', new KeyboardEvent('keyup'));

      expect(onFocus).not.toHaveBeenCalled();
      expect(onKeydown).not.toHaveBeenCalled();
      expect(onKeypress).not.toHaveBeenCalled();
      expect(onKeyup).not.toHaveBeenCalled();

      const formWrapper = mount(Textarea, {
        global: {
          provide: { formDisabled: { disabled: ref(true) } },
        },
      });
      expect(formWrapper.classes()).toContain('t-is-disabled');

      const overrideWrapper = mount(Textarea, {
        props: { disabled: false },
        global: {
          provide: { formDisabled: { disabled: ref(true) } },
        },
      });
      expect(overrideWrapper.classes()).not.toContain('t-is-disabled');
      expect(getTextarea(overrideWrapper).attributes('disabled')).toBeUndefined();
    });

    it(':maxcharacter[number]', async () => {
      const wrapper = mount(Textarea, {
        props: { defaultValue: '你好a', maxcharacter: 10 },
      });
      expect(wrapper.get(LIMIT).text()).toBe('5/10');

      const onChange = vi.fn();
      const truncateWrapper = mount(Textarea, {
        props: { defaultValue: '', maxcharacter: 4, onChange },
      });
      const textarea = getTextarea(truncateWrapper);

      await textarea.setValue('你好a');
      expect(textarea.element.value).toBe('你好');
      expect(onChange).toHaveBeenCalledWith('你好', { e: expect.objectContaining({ type: 'input' }) });
      expect(truncateWrapper.get(LIMIT).text()).toBe('4/4');

      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      const controlledWrapper = mount(Textarea, {
        props: { maxcharacter: 4, value: '' },
      });
      const controlledTextarea = getTextarea(controlledWrapper);

      await controlledTextarea.setValue('你好a');
      expect(controlledTextarea.element.value).toBe('你好');
      expect(controlledWrapper.emitted('update:value')).toEqual([['你好']]);
      // Current behavior is tracked by #6846. Reconciliation should not write to a readonly controlled prop.
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Set operation on key "value" failed: target is readonly'),
        expect.any(Object),
      );

      warnSpy.mockClear();
      const conflictWrapper = mount(Textarea, {
        props: { defaultValue: 'text', maxcharacter: 10, maxlength: 20 },
      });
      expect(warnSpy).toHaveBeenCalledWith('TDesign Input Warn: Pick one of maxlength and maxcharacter please.');
      expect(conflictWrapper.get(LIMIT).text()).toBe('4/10');

      const zeroWrapper = mount(Textarea, {
        props: { defaultValue: 'text', maxcharacter: 0 },
      });
      expect(zeroWrapper.find(LIMIT).exists()).toBe(false);
      expect(zeroWrapper.find(INFO).exists()).toBe(false);
    });

    it(':maxlength[string/number]', async () => {
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'test', maxlength: '10' },
      });
      const textarea = getTextarea(wrapper);
      const info = wrapper.get(INFO);

      expect(textarea.attributes('maxlength')).toBe('10');
      expect(wrapper.get(LIMIT).text()).toBe('4/10');
      expect(info.classes()).toContain('t-textarea__info_wrapper_align');

      const tipsWrapper = mount(Textarea, {
        props: { defaultValue: 'test', maxlength: 10, tips: 'Up to ten characters' },
      });
      const tipsInfo = tipsWrapper.get(INFO);
      expect(tipsInfo.get(TIPS).text()).toBe('Up to ten characters');
      expect(tipsInfo.get(LIMIT).text()).toBe('4/10');
      expect(tipsInfo.classes()).not.toContain('t-textarea__info_wrapper_align');

      const onValidate = vi.fn();
      const emojiWrapper = mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: '😊', maxlength: 1, onValidate },
      });
      await nextTick();
      // Current behavior is tracked by #6846. The counter and validation currently use different length rules.
      expect(emojiWrapper.get(LIMIT).text()).toBe('2/1');
      expect(onValidate).not.toHaveBeenCalled();
    });

    it(':name[string]', () => {
      const wrapper = mount(Textarea, { props: { name: 'description' } });
      expect(getTextarea(wrapper).attributes('name')).toBe('description');
    });

    it(':placeholder[string]', () => {
      const wrapper = mount(Textarea, { props: { placeholder: 'Describe the change' } });
      expect(getTextarea(wrapper).attributes('placeholder')).toBe('Describe the change');
    });

    it(':readonly[boolean]', () => {
      const wrapper = mount(Textarea, { props: { readonly: true } });
      expect(wrapper.classes()).toContain('t-is-readonly');
      expect(getTextarea(wrapper).attributes('readonly')).toBeDefined();

      const formWrapper = mount(Textarea, {
        global: {
          provide: { formReadonly: { readonly: ref(true) } },
        },
      });
      expect(formWrapper.classes()).toContain('t-is-readonly');

      const overrideWrapper = mount(Textarea, {
        props: { readonly: false },
        global: {
          provide: { formReadonly: { readonly: ref(true) } },
        },
      });
      expect(overrideWrapper.classes()).not.toContain('t-is-readonly');
      expect(getTextarea(overrideWrapper).attributes('readonly')).toBeUndefined();
    });

    it(':status[default/success/warning/error]', () => {
      const validateStatus = textareaProps.status.validator as (value?: string) => boolean;
      expect(validateStatus()).toBe(true);
      expect(validateStatus('')).toBe(true);
      expect(validateStatus('default')).toBe(true);
      expect(validateStatus('success')).toBe(true);
      expect(validateStatus('warning')).toBe(true);
      expect(validateStatus('error')).toBe(true);
      expect(validateStatus('loading')).toBe(false);

      const defaultWrapper = mount(Textarea);
      const defaultTextarea = getTextarea(defaultWrapper);
      expect(defaultWrapper.classes()).toContain('t-textarea');
      expect(defaultTextarea.classes()).toEqual(expect.arrayContaining(['t-textarea__inner', 't-is-default']));
      expect(defaultTextarea.element.value).toBe('');
      expect(defaultWrapper.find(INFO).exists()).toBe(false);

      for (const status of ['success', 'warning', 'error'] as const) {
        const wrapper = mount(Textarea, { props: { status } });
        expect(getTextarea(wrapper).classes()).toContain(`t-is-${status}`);
      }

      const overflowWrapper = mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: 'too long', maxlength: 3, status: 'success' },
      });
      expect(getTextarea(overflowWrapper).classes()).toContain('t-is-success');
      expect(getTextarea(overflowWrapper).classes()).not.toContain('t-is-error');
    });

    it(':tips[string]', () => {
      const wrapper = mount(Textarea, {
        props: { status: 'warning', tips: 'Check this value' },
      });
      const tips = wrapper.get(TIPS);

      expect(tips.text()).toBe('Check this value');
      expect(tips.classes()).toContain('t-textarea__tips--warning');

      const normalWrapper = mount(Textarea, {
        props: { status: '' as TextareaProps['status'], tips: 'Normal tips' },
      });
      expect(normalWrapper.get(TIPS).classes()).toContain('t-textarea__tips--normal');
    });

    it(':tips[slot/function]', () => {
      const tips = vi.fn((createElement: typeof h) =>
        createElement('span', { class: 'function-tips' }, 'Function tips'),
      );
      const functionWrapper = mount(Textarea, { props: { tips } });
      expect(functionWrapper.get('.function-tips').text()).toBe('Function tips');
      expect(tips).toHaveBeenCalledWith(expect.any(Function), {});

      const slotWrapper = mount(Textarea, {
        slots: { tips: () => <span class="slot-tips">Slot tips</span> },
      });
      expect(slotWrapper.get('.slot-tips').text()).toBe('Slot tips');

      const precedenceWrapper = mount(Textarea, {
        props: { tips: 'Prop tips' },
        slots: { tips: () => <span class="slot-tips">Slot tips</span> },
      });
      expect(precedenceWrapper.get(TIPS).text()).toBe('Prop tips');
      expect(precedenceWrapper.find('.slot-tips').exists()).toBe(false);
    });

    it(':value[string/number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Textarea, {
        props: { onChange, value: 'server value' },
      });
      const textarea = getTextarea(wrapper);

      expect(textarea.element.value).toBe('server value');
      await textarea.setValue('user value');
      expect(wrapper.emitted('update:value')).toEqual([['user value']]);
      expect(onChange).toHaveBeenCalledWith('user value', { e: expect.objectContaining({ type: 'input' }) });

      await wrapper.setProps({ value: 'next server value' });
      expect(textarea.element.value).toBe('next server value');

      const numberWrapper = mount(Textarea, { props: { value: 123 } });
      expect(getTextarea(numberWrapper).element.value).toBe('123');
    });

    it(':defaultValue[string/number]', async () => {
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'draft' },
      });
      const textarea = getTextarea(wrapper);

      expect(textarea.element.value).toBe('draft');
      await textarea.setValue('published');
      expect(textarea.element.value).toBe('published');

      const numberWrapper = mount(Textarea, { props: { defaultValue: 123 } });
      expect(getTextarea(numberWrapper).element.value).toBe('123');
    });

    it(':modelValue[string/number]', async () => {
      const wrapper = mount(Textarea, { props: { modelValue: 'first' } });
      const textarea = getTextarea(wrapper);

      await textarea.setValue('second');
      expect(wrapper.emitted('update:modelValue')).toEqual([['second']]);

      await wrapper.setProps({ modelValue: 3 });
      expect(textarea.element.value).toBe('3');

      const value = ref<TextareaValue>('model value');
      const modelWrapper = mount(() => <Textarea v-model={value.value} />);
      await getTextarea(modelWrapper).setValue('updated model value');
      await nextTick();
      expect(value.value).toBe('updated model value');
      expect(getTextarea(modelWrapper).element.value).toBe('updated model value');
    });

    // Current behavior is tracked by #6846. rows should be forwarded to the native textarea after the source is fixed.
    it(':rows[number] attr', async () => {
      const wrapper = mount(Textarea, { attrs: { rows: 4 } });
      await sleep(0);

      const textarea = getTextarea(wrapper);
      expect(textarea.element.style.height).toBe('auto');
      expect(textarea.element.style.minHeight).toBe('auto');
      expect(wrapper.attributes('rows')).toBe('4');
      expect(textarea.attributes('rows')).toBeUndefined();
    });

    it(':style[string/object] attr', async () => {
      const objectWrapper = mount(Textarea, {
        attrs: { style: { color: 'red', height: '80px' } },
      });
      await sleep(0);

      const objectTextarea = getTextarea(objectWrapper);
      expect(objectTextarea.element.style.color).toBe('red');
      expect(objectTextarea.element.style.height).toBe('80px');
      expect(objectWrapper.attributes('style')).toBeUndefined();

      const stringWrapper = mount(Textarea, {
        attrs: { style: 'height: 80px; color: red;' },
      });
      await sleep(0);
      // Current behavior is tracked by #6846. String styles should be forwarded after the source is fixed.
      expect(stringWrapper.attributes('style')).toBeUndefined();
      expect(getTextarea(stringWrapper).attributes('style')).toBeUndefined();
    });
  });

  describe('events', () => {
    it('blur', async () => {
      const onBlur = vi.fn();
      const handleBlur = vi.fn().mockResolvedValue(undefined);
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'content', onBlur },
        global: {
          provide: {
            [FormItemInjectionKey as symbol]: { handleBlur },
          },
        },
      });
      const textarea = getTextarea(wrapper);

      await textarea.trigger('focus');
      expect(textarea.classes()).toContain('t-is-focused');
      await textarea.trigger('blur');

      expect(textarea.classes()).not.toContain('t-is-focused');
      expect(onBlur).toHaveBeenCalledWith('content', { e: expect.any(FocusEvent) });
      expect(handleBlur).toHaveBeenCalledOnce();

      const defensiveBlur = vi.fn();
      const defensiveWrapper = mount(Textarea, { props: { onBlur: defensiveBlur } });
      invokeVueListener(getTextarea(defensiveWrapper).element, 'onBlur', new FocusEvent('blur'));
      expect(defensiveBlur).not.toHaveBeenCalled();
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Textarea, {
        props: { defaultValue: '', onChange },
      });
      const textarea = getTextarea(wrapper);

      await textarea.setValue('content');
      expect(onChange).toHaveBeenCalledWith('content', { e: expect.objectContaining({ type: 'input' }) });

      onChange.mockClear();
      await textarea.trigger('compositionstart');
      textarea.element.value = '中文';
      await textarea.trigger('input');
      await nextTick();
      expect(onChange).not.toHaveBeenCalled();

      await textarea.trigger('compositionend');
      expect(onChange).toHaveBeenCalledWith('中文', { e: expect.any(CompositionEvent) });

      const unmountWrapper = mount(Textarea, { props: { value: 'before' } });
      const unmountTextarea = getTextarea(unmountWrapper);
      unmountTextarea.element.value = 'after';
      const inputPromise = unmountTextarea.trigger('input');
      unmountWrapper.unmount();
      await expect(inputPromise).resolves.toBeUndefined();

      const initialOnChange = vi.fn();
      const latestOnChange = vi.fn();
      const currentOnChange = ref(initialOnChange);
      const latestWrapper = mount({
        setup: () => () => <Textarea defaultValue="" onChange={currentOnChange.value} />,
      });

      currentOnChange.value = latestOnChange;
      await nextTick();
      await getTextarea(latestWrapper).setValue('latest value');

      expect(initialOnChange).not.toHaveBeenCalled();
      expect(latestOnChange).toHaveBeenCalledWith('latest value', {
        e: expect.objectContaining({ type: 'input' }),
      });
    });

    it('focus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'content', onFocus },
      });
      const textarea = getTextarea(wrapper);

      await textarea.trigger('focus');
      expect(textarea.classes()).toContain('t-is-focused');
      expect(onFocus).toHaveBeenCalledWith('content', { e: expect.any(FocusEvent) });
    });

    it('keydown', async () => {
      const onKeydown = vi.fn();
      const wrapper = mount(Textarea, {
        props: { onKeydown, value: 123 },
      });

      await getTextarea(wrapper).trigger('keydown', { key: 'a' });
      expect(onKeydown).toHaveBeenCalledWith(123, { e: expect.any(KeyboardEvent) });
    });

    it('keypress', async () => {
      const onKeypress = vi.fn();
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'content', onKeypress },
      });

      await getTextarea(wrapper).trigger('keypress', { key: 'a' });
      expect(onKeypress).toHaveBeenCalledWith('content', { e: expect.any(KeyboardEvent) });
    });

    it('keyup', async () => {
      const onKeyup = vi.fn();
      const wrapper = mount(Textarea, {
        props: { defaultValue: 'content', onKeyup },
      });

      await getTextarea(wrapper).trigger('keyup', { key: 'a' });
      expect(onKeyup).toHaveBeenCalledWith('content', { e: expect.any(KeyboardEvent) });
    });

    it('validate', async () => {
      const onValidate = vi.fn();
      const wrapper = mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: '', maxcharacter: 4, onValidate },
      });
      const textarea = getTextarea(wrapper);

      await textarea.setValue('你好a');
      await nextTick();
      expect(onValidate).toHaveBeenLastCalledWith({ error: 'exceed-maximum' });

      await textarea.setValue('好');
      await nextTick();
      expect(onValidate).toHaveBeenLastCalledWith({ error: undefined });

      const initialValidate = vi.fn();
      mount(Textarea, {
        props: { allowInputOverMax: true, defaultValue: 'too long', maxlength: 3, onValidate: initialValidate },
      });
      await nextTick();
      expect(initialValidate).toHaveBeenCalledWith({ error: 'exceed-maximum' });
    });
  });

  describe('instanceFunctions', () => {
    it('blur', () => {
      const wrapper = mount(Textarea);
      const blurSpy = vi.spyOn(getTextarea(wrapper).element, 'blur');
      const exposed = wrapper.vm as unknown as { blur: () => void };

      exposed.blur();
      expect(blurSpy).toHaveBeenCalledOnce();
    });

    it('focus', () => {
      const wrapper = mount(Textarea);
      const focusSpy = vi.spyOn(getTextarea(wrapper).element, 'focus');
      const exposed = wrapper.vm as unknown as { focus: () => void };

      exposed.focus();
      expect(focusSpy).toHaveBeenCalledOnce();
    });
  });
});
