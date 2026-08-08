import { flushPromises, mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { afterEach, expect, vi } from 'vitest';

import { Radio, RadioButton, RadioGroup } from '@tdesign/components/radio';
import radioGroupProps from '@tdesign/components/radio/radio-group-props';
import type { RadioGroupProps } from '@tdesign/components/radio';

const RADIO = '.t-radio';
const RADIO_BUTTON = '.t-radio-button';
const RADIO_GROUP = '.t-radio-group';
const BG_BLOCK = '.t-radio-group__bg-block';

const GROUP_OPTIONS: RadioGroupProps['options'] = [
  { label: 'Radio 1', value: 1 },
  { label: 'Radio 2', value: '2' },
  { label: (createElement: typeof h) => createElement('span', { class: 'function-label' }, 'Radio 3'), value: 3 },
  { label: 'Radio 4', value: 4, disabled: true },
];

const OFFSET_KEYS = ['offsetWidth', 'offsetHeight', 'offsetLeft', 'offsetTop'] as const;
let restoreOffset: (() => void) | undefined;

function mountGroupWithOptions(props: RadioGroupProps = {}) {
  return mount(RadioGroup, {
    props: { options: GROUP_OPTIONS, ...props },
  });
}

function mountGroupWithChildren(props: RadioGroupProps = {}) {
  return mount(
    <RadioGroup {...props}>
      <Radio value={1}>Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value={3}>
        <span class="slot-label">Radio 3</span>
      </Radio>
      <Radio value={4} disabled>
        Radio 4
      </Radio>
    </RadioGroup>,
  );
}

function mockOffsetSize(initial = { width: 80, height: 32, left: 10, top: 0 }) {
  const size = { ...initial };
  const originals = OFFSET_KEYS.map((key) => Object.getOwnPropertyDescriptor(HTMLElement.prototype, key));

  const getters = [() => size.width, () => size.height, () => size.left, () => size.top];

  OFFSET_KEYS.forEach((key, index) => {
    Object.defineProperty(HTMLElement.prototype, key, {
      configurable: true,
      get: getters[index],
    });
  });

  restoreOffset = () => {
    OFFSET_KEYS.forEach((key, index) => {
      const descriptor = originals[index];
      if (descriptor) {
        Object.defineProperty(HTMLElement.prototype, key, descriptor);
      } else {
        delete (HTMLElement.prototype as unknown as Record<string, unknown>)[key];
      }
    });
  };

  return size;
}

afterEach(() => {
  restoreOffset?.();
  restoreOffset = undefined;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('RadioGroup', () => {
  describe('props', () => {
    it(':allowUncheck[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroupWithChildren({
        allowUncheck: true,
        onChange,
        value: 1,
      });

      expect(wrapper.get(`${RADIO} input`).attributes('data-allow-uncheck')).toBe('true');
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).toHaveBeenCalledWith(undefined, {
        e: expect.any(MouseEvent),
        name: '',
      });

      const checkedChange = vi.fn();
      const checkedWrapper = mountGroupWithChildren({ onChange: checkedChange, value: 1 });
      await checkedWrapper.get(RADIO).trigger('click');
      expect(checkedChange).not.toHaveBeenCalled();
    });

    it(':direction[horizontal/vertical]', async () => {
      const validateDirection = radioGroupProps.direction.validator as (value?: string) => boolean;
      expect(validateDirection()).toBe(true);
      expect(validateDirection('')).toBe(true);
      expect(validateDirection('horizontal')).toBe(true);
      expect(validateDirection('vertical')).toBe(true);
      expect(validateDirection('diagonal')).toBe(false);

      const wrapper = mountGroupWithOptions();
      expect(wrapper.get(RADIO_GROUP).classes()).not.toContain('t-radio-group--vertical');

      await wrapper.setProps({ direction: 'vertical' });
      expect(wrapper.get(RADIO_GROUP).classes()).toContain('t-radio-group--vertical');
    });

    it(':disabled[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroupWithOptions({ disabled: true, onChange });

      expect(wrapper.findAll(`${RADIO}.t-is-disabled`)).toHaveLength(4);
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      const overrideWrapper = mount(RadioGroup, {
        props: {
          disabled: true,
          options: [
            { disabled: false, label: 'Enabled', value: 1 },
            { label: 'Disabled', value: 2 },
          ],
        },
      });
      expect(overrideWrapper.findAll(RADIO)[0].classes()).not.toContain('t-is-disabled');
      expect(overrideWrapper.findAll(RADIO)[1].classes()).toContain('t-is-disabled');
    });

    it(':name[string]', () => {
      for (const wrapper of [
        mountGroupWithOptions({ name: 'radio-group-name' }),
        mountGroupWithChildren({ name: 'radio-group-name' }),
      ]) {
        const inputs = wrapper.findAll(`${RADIO} input`);
        expect(inputs).toHaveLength(4);
        inputs.forEach((input) => {
          expect(input.attributes('name')).toBe('radio-group-name');
        });
      }
    });

    it(':options[array]', () => {
      const functionLabel = vi.fn((createElement: typeof h) =>
        createElement('span', { class: 'custom-label' }, 'Function option'),
      );
      const wrapper = mount(RadioGroup, {
        props: {
          options: ['string-option', 2, { disabled: true, label: functionLabel, value: false }],
        },
      });
      const radios = wrapper.findAll(RADIO);

      expect(radios).toHaveLength(3);
      expect(radios[0].get('.t-radio__label').text()).toBe('string-option');
      expect(radios[0].get<HTMLInputElement>('input').element.value).toBe('string-option');
      expect(radios[1].get('.t-radio__label').text()).toBe('2');
      expect(radios[2].classes()).toContain('t-is-disabled');
      expect(wrapper.get('.custom-label').text()).toBe('Function option');
      expect(functionLabel).toHaveBeenCalledWith(expect.any(Function));

      const emptyWrapper = mount(RadioGroup, { props: { options: [] } });
      expect(emptyWrapper.findAll(RADIO)).toHaveLength(0);
    });

    it(':readonly[boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroupWithChildren({ onChange, readonly: true });

      expect(wrapper.get(`${RADIO} input`).attributes('readonly')).toBeDefined();
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':size[small/medium/large]', async () => {
      const validateSize = radioGroupProps.size.validator as (value?: string) => boolean;
      expect(validateSize()).toBe(true);
      expect(validateSize('')).toBe(true);
      expect(validateSize('small')).toBe(true);
      expect(validateSize('medium')).toBe(true);
      expect(validateSize('large')).toBe(true);
      expect(validateSize('extra-large')).toBe(false);

      const wrapper = mountGroupWithOptions();
      for (const [size, className] of [
        ['small', 't-size-s'],
        ['medium', 't-size-m'],
        ['large', 't-size-l'],
      ] as const) {
        await wrapper.setProps({ size });
        expect(wrapper.get(RADIO_GROUP).classes()).toContain(className);
      }
    });

    it(':theme[radio/button]', async () => {
      const validateTheme = radioGroupProps.theme.validator as (value?: string) => boolean;
      expect(validateTheme()).toBe(true);
      expect(validateTheme('')).toBe(true);
      expect(validateTheme('radio')).toBe(true);
      expect(validateTheme('button')).toBe(true);
      expect(validateTheme('card')).toBe(false);

      const wrapper = mountGroupWithOptions({ theme: 'radio' });
      expect(wrapper.findAllComponents(Radio)).toHaveLength(4);
      expect(wrapper.findAllComponents(RadioButton)).toHaveLength(0);
      expect(wrapper.findAll(RADIO)).toHaveLength(4);

      await wrapper.setProps({ theme: 'button' });
      expect(wrapper.findAllComponents(RadioButton)).toHaveLength(4);
      expect(wrapper.findAll(RADIO_BUTTON)).toHaveLength(4);
      expect(wrapper.findAll(RADIO)).toHaveLength(0);
    });

    it(':value[string/number/boolean]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(RadioGroup, {
        props: {
          name: 'controlled-group',
          onChange,
          options: ['first', 'second'],
          value: 'first',
        },
      });

      expect(wrapper.findAll(RADIO)[0].classes()).toContain('t-is-checked');
      await wrapper.findAll(RADIO)[1].trigger('click');
      expect(wrapper.emitted('update:value')).toEqual([['second']]);
      expect(onChange).toHaveBeenCalledWith('second', {
        e: expect.any(MouseEvent),
        name: 'controlled-group',
      });
      expect(wrapper.findAll(RADIO)[0].classes()).toContain('t-is-checked');

      await wrapper.setProps({ value: 'second' });
      expect(wrapper.findAll(RADIO)[1].classes()).toContain('t-is-checked');

      const numberWrapper = mountGroupWithOptions({ value: 1 });
      expect(numberWrapper.findAll(RADIO)[0].classes()).toContain('t-is-checked');

      const booleanWrapper = mount(RadioGroup, {
        props: { options: [{ label: 'False', value: false }], value: false },
      });
      expect(booleanWrapper.get(RADIO).classes()).toContain('t-is-checked');
    });

    it(':defaultValue[string/number/boolean]', async () => {
      const wrapper = mount(RadioGroup, {
        props: { defaultValue: 1, options: [1, 2] },
      });

      expect(wrapper.findAll(RADIO)[0].classes()).toContain('t-is-checked');
      await wrapper.findAll(RADIO)[1].trigger('click');
      expect(wrapper.findAll(RADIO)[1].classes()).toContain('t-is-checked');
      expect(wrapper.emitted('update:value')).toBeUndefined();

      const stringWrapper = mount(RadioGroup, {
        props: { defaultValue: 'first', options: ['first'] },
      });
      expect(stringWrapper.get(RADIO).classes()).toContain('t-is-checked');

      const booleanWrapper = mount(RadioGroup, {
        props: { defaultValue: false, options: [{ label: 'False', value: false }] },
      });
      expect(booleanWrapper.get(RADIO).classes()).toContain('t-is-checked');

      const implicitBooleanWrapper = mount(RadioGroup, {
        props: { options: [{ label: 'False', value: false }] },
      });
      expect(implicitBooleanWrapper.get(RADIO).classes()).not.toContain('t-is-checked');
    });

    it(':modelValue[string/number/boolean]', async () => {
      const wrapper = mount(RadioGroup, {
        props: {
          modelValue: 'first',
          options: ['first', 'second'],
          value: 'second',
        },
      });

      expect(wrapper.findAll(RADIO)[0].classes()).toContain('t-is-checked');
      await wrapper.findAll(RADIO)[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toEqual([['second']]);
      expect(wrapper.emitted('update:value')).toBeUndefined();

      await wrapper.setProps({ modelValue: 'second' });
      expect(wrapper.findAll(RADIO)[1].classes()).toContain('t-is-checked');

      const numberWrapper = mount(RadioGroup, {
        props: { modelValue: 1, options: [1] },
      });
      expect(numberWrapper.get(RADIO).classes()).toContain('t-is-checked');

      const booleanWrapper = mount(RadioGroup, {
        props: { modelValue: false, options: [{ label: 'False', value: false }] },
      });
      expect(booleanWrapper.get(RADIO).classes()).toContain('t-is-checked');
    });

    it(':variant[outline/primary-filled/default-filled]', async () => {
      const validateVariant = radioGroupProps.variant.validator as (value?: string) => boolean;
      expect(validateVariant()).toBe(true);
      expect(validateVariant('')).toBe(true);
      expect(validateVariant('outline')).toBe(true);
      expect(validateVariant('primary-filled')).toBe(true);
      expect(validateVariant('default-filled')).toBe(true);
      expect(validateVariant('filled')).toBe(false);

      const wrapper = mountGroupWithOptions({ value: 1 });
      expect(wrapper.get(RADIO_GROUP).classes()).toContain('t-radio-group__outline');
      expect(wrapper.find(BG_BLOCK).exists()).toBe(false);

      await wrapper.setProps({ variant: 'primary-filled' });
      expect(wrapper.get(RADIO_GROUP).classes()).toContain('t-radio-group--filled');
      expect(wrapper.get(RADIO_GROUP).classes()).toContain('t-radio-group--primary-filled');
      expect(wrapper.find(BG_BLOCK).exists()).toBe(true);

      await wrapper.setProps({ variant: 'default-filled' });
      expect(wrapper.get(RADIO_GROUP).classes()).toContain('t-radio-group--filled');
      expect(wrapper.get(RADIO_GROUP).classes()).not.toContain('t-radio-group--primary-filled');
    });

    it(':variant[filled] bar style', async () => {
      mockOffsetSize();
      const value = ref<string | undefined>('first');
      const wrapper = mount(() => (
        <RadioGroup variant="primary-filled" value={value.value}>
          <RadioButton value="first">First</RadioButton>
          <RadioButton value="second">Second</RadioButton>
        </RadioGroup>
      ));
      await nextTick();

      const initialStyle = wrapper.get(BG_BLOCK).attributes('style');
      expect(initialStyle).toContain('width: 80px');
      expect(initialStyle).toContain('height: 32px');
      expect(initialStyle).toContain('left: 10px');
      expect(initialStyle).toContain('transition-property: none');

      value.value = 'second';
      await nextTick();
      await nextTick();
      await nextTick();
      expect(wrapper.get(BG_BLOCK).attributes('style')).toContain('transition-property: all');

      value.value = undefined;
      await nextTick();
      await nextTick();
      expect(wrapper.find(BG_BLOCK).exists()).toBe(false);

      restoreOffset?.();
      restoreOffset = undefined;
      const fallbackWrapper = mount(
        <RadioGroup variant="primary-filled" value="first">
          <RadioButton value="first">First</RadioButton>
        </RadioGroup>,
      );
      await nextTick();
      expect(fallbackWrapper.get(BG_BLOCK).attributes('style')).toContain('width: 0px');

      const noButtonWrapper = mount(RadioGroup, {
        props: { options: ['first'], value: 'first', variant: 'primary-filled' },
      });
      await nextTick();
      expect(noButtonWrapper.get(BG_BLOCK).attributes('style')).toContain('height: 9px');

      const emptyWrapper = mount(RadioGroup, {
        props: { options: ['first'], variant: 'primary-filled' },
      });
      await nextTick();
      expect(emptyWrapper.find(BG_BLOCK).exists()).toBe(false);

      const explicitFalseWrapper = mount(RadioGroup, {
        props: {
          defaultValue: false,
          options: [{ label: 'False', value: false }],
          theme: 'button',
          variant: 'primary-filled',
        },
      });
      await nextTick();
      expect(explicitFalseWrapper.get(RADIO_BUTTON).classes()).toContain('t-is-checked');
      expect(explicitFalseWrapper.find(BG_BLOCK).exists()).toBe(true);

      const outlineWrapper = mount(
        <RadioGroup variant="outline" value="first">
          <RadioButton value="first">First</RadioButton>
        </RadioGroup>,
      );
      await nextTick();
      expect(outlineWrapper.find(BG_BLOCK).exists()).toBe(false);
    });

    it(':variant[filled] observers', async () => {
      const size = mockOffsetSize();
      let resizeCallback: ResizeObserverCallback | undefined;
      let mutationCallback: MutationCallback | undefined;
      const resizeDisconnect = vi.fn();
      const mutationDisconnect = vi.fn();

      class ResizeObserverMock {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }

        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = resizeDisconnect;
      }

      class MutationObserverMock {
        constructor(callback: MutationCallback) {
          mutationCallback = callback;
        }

        observe = vi.fn();
        disconnect = mutationDisconnect;
        takeRecords = vi.fn(() => []);
      }

      vi.stubGlobal('ResizeObserver', ResizeObserverMock);
      vi.stubGlobal('MutationObserver', MutationObserverMock);

      const wrapper = mount(
        <RadioGroup variant="primary-filled" value="first">
          <RadioButton value="first">First</RadioButton>
        </RadioGroup>,
      );
      await nextTick();
      await flushPromises();

      expect(resizeCallback).toEqual(expect.any(Function));
      expect(mutationCallback).toEqual(expect.any(Function));

      size.width = 96;
      resizeCallback?.([], {} as ResizeObserver);
      await nextTick();
      await flushPromises();
      expect(wrapper.get(BG_BLOCK).attributes('style')).toContain('width: 96px');

      size.width = 112;
      mutationCallback?.([{ type: 'characterData' } as MutationRecord], {} as MutationObserver);
      await nextTick();
      expect(wrapper.get(BG_BLOCK).attributes('style')).toContain('width: 112px');

      mutationCallback?.([{ type: 'childList' } as MutationRecord], {} as MutationObserver);
      wrapper.unmount();
      expect(resizeDisconnect).toHaveBeenCalledOnce();
      expect(mutationDisconnect).toHaveBeenCalledOnce();
    });

    it(':default[slot]', () => {
      const wrapper = mount(RadioGroup, {
        props: { options: ['option'] },
        slots: {
          default: () => <Radio value="slot">Slot radio</Radio>,
        },
      });

      expect(wrapper.findAll(RADIO)).toHaveLength(1);
      expect(wrapper.get('.t-radio__label').text()).toBe('Slot radio');
    });
  });

  describe('events', () => {
    it('mouse change preserves boolean false', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <RadioGroup onChange={onChange}>
          <Radio value={false}>False</Radio>
        </RadioGroup>,
      );

      expect(wrapper.get(RADIO).classes()).not.toContain('t-is-checked');
      await wrapper.get(RADIO).trigger('click');
      expect(onChange).toHaveBeenCalledWith(false, {
        e: expect.any(MouseEvent),
        name: '',
      });
      expect(wrapper.get(RADIO).classes()).toContain('t-is-checked');
    });

    it('keyboard change preserves boolean, string, and number values', async () => {
      const onChange = vi.fn();
      const wrapper = mount(
        <RadioGroup onChange={onChange}>
          <Radio value={true}>True</Radio>
          <Radio value={false}>False</Radio>
          <Radio value="false">String false</Radio>
          <Radio value={0}>Zero</Radio>
        </RadioGroup>,
      );
      const radios = wrapper.findAll(RADIO);

      radios.forEach((radio) => {
        expect(radio.classes()).not.toContain('t-is-checked');
      });

      await radios[1].trigger('keydown', { code: 'Space' });
      expect(onChange).toHaveBeenLastCalledWith(false, {
        e: expect.any(KeyboardEvent),
      });
      expect(radios[1].classes()).toContain('t-is-checked');

      await radios[2].trigger('keydown', { code: 'Space' });
      expect(onChange).toHaveBeenLastCalledWith('false', {
        e: expect.any(KeyboardEvent),
      });
      expect(radios[1].classes()).not.toContain('t-is-checked');
      expect(radios[2].classes()).toContain('t-is-checked');

      await radios[3].trigger('keydown', { code: 'Space' });
      expect(onChange).toHaveBeenLastCalledWith(0, {
        e: expect.any(KeyboardEvent),
      });
      expect(radios[2].classes()).not.toContain('t-is-checked');
      expect(radios[3].classes()).toContain('t-is-checked');
    });

    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountGroupWithOptions({
        name: 'radio-group',
        onChange,
        value: 3,
      });

      await wrapper.get(RADIO).trigger('click');
      expect(onChange).toHaveBeenCalledWith(1, {
        e: expect.any(MouseEvent),
        name: 'radio-group',
      });

      onChange.mockClear();
      await wrapper.findAll(RADIO)[2].trigger('click');
      expect(onChange).not.toHaveBeenCalled();

      await wrapper.findAll(RADIO)[2].trigger('keydown', { code: 'Space' });
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
