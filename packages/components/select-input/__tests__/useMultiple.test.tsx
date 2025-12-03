// @ts-nocheck
import { SelectInput } from '@tdesign/components';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { getSelectInputMultipleMount } from './mount';

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('useMultiple hooks', () => {
  describe('value handling', () => {
    it('should handle value as object correctly', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: { label: 'tdesign-vue', value: 1 },
          multiple: true,
        },
      });

      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(1);
      expect(tags[0].text()).toContain('tdesign-vue');
    });

    it('should handle value as primitive correctly', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: 'tdesign',
          multiple: true,
        },
      });

      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(1);
    });

    it('should handle custom keys configuration', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: [{ name: 'tdesign-vue', id: 1 }],
          multiple: true,
          keys: { label: 'name', key: 'id' },
        },
      });

      const tags = wrapper.findAll('.t-tag');
      expect(tags.length).toBe(1);
      expect(tags[0].text()).toContain('tdesign-vue');
    });
  });

  describe('placeholder handling', () => {
    it('should show placeholder when no tags', () => {
      const placeholder = '请选择';
      const wrapper = mount(SelectInput, {
        props: {
          value: [],
          multiple: true,
          placeholder,
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe(placeholder);
    });

    it('should hide placeholder when has tags', () => {
      const wrapper = mount(SelectInput, {
        props: {
          value: [{ label: 'tdesign-vue', value: 1 }],
          multiple: true,
          placeholder: '请选择',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe('');
    });
  });

  describe('input change triggers', () => {
    it('should not trigger input change on enter or blur', async () => {
      const onInputChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        onInputChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'enter',
        e: new Event('input'),
      });

      expect(onInputChange).not.toBeCalled();
    });

    it('should handle input change with valid trigger', async () => {
      const onInputChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        onInputChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });

      // 测试非 enter/blur 的 trigger,应该触发
      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'input',
        e: new Event('input'),
      });

      expect(onInputChange).toBeCalled();
    });

    it('should not trigger input change on enter trigger', async () => {
      const onInputChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        onInputChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'enter',
        e: new Event('input'),
      });

      expect(onInputChange).not.toBeCalled();
    });

    it('should not trigger input change on blur trigger', async () => {
      const onInputChange = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        allowInput: true,
        onInputChange,
      });

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('input-change', 'new value', {
        trigger: 'blur',
        e: new Event('input'),
      });

      expect(onInputChange).not.toBeCalled();
    });
  });

  describe('blur with overlay hover', () => {
    it('should not trigger blur when overlay is hovering', async () => {
      const onBlur = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onBlur,
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('blur', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'blur',
        e: new Event('blur'),
      });

      expect(onBlur).not.toBeCalled();
    });

    it('should trigger blur when overlay is not hovering', async () => {
      const onBlur = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onBlur,
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: false });
      }

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('blur', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'blur',
        e: new Event('blur'),
      });

      expect(onBlur).toBeCalled();
    });
  });

  describe('focus with overlay hover', () => {
    it('should not trigger focus when already focused', async () => {
      const onFocus = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onFocus,
      });

      // First focus
      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('focus', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'focus',
        e: new Event('focus'),
      });

      onFocus.mockClear();

      // Second focus should not trigger
      await tagInput.vm.$emit('focus', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'focus',
        e: new Event('focus'),
      });

      expect(onFocus).not.toBeCalled();
    });

    it('should not trigger focus when overlay is hovering', async () => {
      const onFocus = vi.fn();
      const wrapper = getSelectInputMultipleMount(SelectInput, {
        value: [{ label: 'tdesign-vue', value: 1 }],
        onFocus,
      });

      const popupRef = wrapper.vm.popupRef;
      if (popupRef) {
        popupRef.getOverlayState = vi.fn().mockReturnValue({ hover: true });
      }

      const tagInput = wrapper.findComponent({ name: 'TTagInput' });
      await tagInput.vm.$emit('focus', [{ label: 'tdesign-vue', value: 1 }], {
        trigger: 'focus',
        e: new Event('focus'),
      });

      expect(onFocus).not.toBeCalled();
    });
  });
});
