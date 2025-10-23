import { defineComponent, ref, type SetupContext } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import useDropdownOptions from '@tdesign/components/dropdown/hooks/useDropdownOptions';
import type { DropdownOption } from '@tdesign/components/dropdown/type';

describe('Dropdown hooks', () => {
  describe('useDropdownOptions', () => {
    it('returns options from props', () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [] as Array<DropdownOption>,
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const options: DropdownOption[] = [
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ];

      const wrapper = mount(TestComponent, {
        props: { options },
      });

      expect(wrapper.vm.dropdownOptions).toEqual(options);
    });

    it('returns empty array when no options provided', () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [],
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const wrapper = mount(TestComponent, {
        props: { options: [] },
      });

      expect(wrapper.vm.dropdownOptions).toEqual([]);
    });

    it('prioritizes props options over slot children', () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [] as Array<DropdownOption>,
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const propsOptions: DropdownOption[] = [
        { content: 'Props Option 1', value: 'p1' },
        { content: 'Props Option 2', value: 'p2' },
      ];

      const wrapper = mount(TestComponent, {
        props: { options: propsOptions },
      });

      // props options 应该优先
      expect(wrapper.vm.dropdownOptions).toEqual(propsOptions);
    });

    it('reactive options update', async () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [] as Array<DropdownOption>,
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const options = ref<DropdownOption[]>([
        { content: 'Option 1', value: '1' },
        { content: 'Option 2', value: '2' },
      ]);

      const wrapper = mount(TestComponent, {
        props: { options: options.value },
      });

      expect(wrapper.vm.dropdownOptions).toEqual(options.value);

      // 更新 options
      options.value = [
        { content: 'New Option 1', value: 'new1' },
        { content: 'New Option 2', value: 'new2' },
        { content: 'New Option 3', value: 'new3' },
      ];

      await wrapper.setProps({ options: options.value });
      expect(wrapper.vm.dropdownOptions).toEqual(options.value);
    });

    it('handles options with nested children', () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [] as Array<DropdownOption>,
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const options: DropdownOption[] = [
        {
          content: 'Parent',
          value: 'parent',
          children: [
            { content: 'Child 1', value: 'child1' },
            { content: 'Child 2', value: 'child2' },
          ],
        },
      ];

      const wrapper = mount(TestComponent, {
        props: { options },
      });

      expect(wrapper.vm.dropdownOptions).toEqual(options);
    });

    it('handles options with different properties', () => {
      const TestComponent = defineComponent({
        props: {
          options: {
            type: Array,
            default: () => [] as Array<DropdownOption>,
          },
        },
        setup(props, { expose }: SetupContext) {
          const dropdownOptions = useDropdownOptions(props as any);
          expose({ dropdownOptions });
          return () => <div></div>;
        },
      });

      const options: DropdownOption[] = [
        { content: 'Active', value: '1', active: true },
        { content: 'Disabled', value: '2', disabled: true },
        { content: 'With Divider', value: '3', divider: true },
        { content: 'Error Theme', value: '4', theme: 'error' },
      ];

      const wrapper = mount(TestComponent, {
        props: { options },
      });

      expect(wrapper.vm.dropdownOptions).toEqual(options);
    });
  });
});
