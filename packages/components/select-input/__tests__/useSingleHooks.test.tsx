// @ts-nocheck
import { SelectInput } from '@tdesign/components';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('useSingle hooks', () => {
  describe('value display handling', () => {
    it('should render value display when not popup visible', () => {
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          popupVisible={false}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      expect(wrapper.find('.custom-value').exists()).toBe(true);
    });

    it('should use input display when popup visible and allowInput', async () => {
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          popupVisible={true}
          allowInput={true}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      await wrapper.vm.$nextTick();
      const input = wrapper.find('input');
      expect(input.exists()).toBe(true);
    });

    it('should handle valueDisplayOptions.useInputDisplay when popup closed', () => {
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          popupVisible={false}
          allowInput={true}
          valueDisplayOptions={{ useInputDisplay: true }}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      // 当 popupVisible 为 false 时,会使用 valueDisplay
      expect(wrapper.find('.custom-value').exists()).toBe(true);
    });

    it('should handle valueDisplayOptions.usePlaceholder with value', () => {
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          popupVisible={false}
          allowInput={false}
          placeholder="请选择"
          valueDisplayOptions={{ usePlaceholder: true }}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe('');
    });
  });

  describe('placeholder handling', () => {
    it('should show placeholder when allowInput and popupVisible', () => {
      const placeholder = '请输入';
      const wrapper = mount(() => (
        <SelectInput
          value={{ label: 'tdesign-vue', value: 1 }}
          popupVisible={true}
          allowInput={true}
          placeholder={placeholder}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe(placeholder);
    });

    it('should show placeholder when no value with valueDisplay', () => {
      const placeholder = '请选择';
      const wrapper = mount(() => (
        <SelectInput
          value={null}
          popupVisible={false}
          placeholder={placeholder}
          v-slots={{ valueDisplay: () => <span class="custom-value">Custom Display</span> }}
        />
      ));

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe(placeholder);
    });
  });

  describe('overlay states interaction', () => {
    it('should not trigger focus when already focused in single mode', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
          onFocus,
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');

      onFocus.mockClear();

      await input.trigger('focus');
      expect(onFocus).not.toBeCalled();
    });

    it('should not trigger focus when overlay is hovering in single mode', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
          onFocus,
        },
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      const input = wrapper.find('input');
      await input.trigger('focus');

      expect(onFocus).not.toBeCalled();
    });

    it('should not trigger blur when overlay is hovering in single mode', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
          onBlur,
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      await input.trigger('blur');

      expect(onBlur).not.toBeCalled();
    });

    it('should trigger blur when overlay is not hovering in single mode', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          allowInput: true,
          onBlur,
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await wrapper.vm.$nextTick();

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: false });
      }

      await input.trigger('blur');
      await wrapper.vm.$nextTick();

      expect(onBlur).toBeCalled();
    });
  });
});
