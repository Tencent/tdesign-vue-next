import { ref, defineComponent, type SetupContext } from 'vue';
import { mount } from '@vue/test-utils';
import { expect } from 'vitest';
import { useFormDisabled } from '@tdesign/components/form/hooks';

describe('Form hooks', () => {
  describe('useFormDisabled', () => {
    const TestComponent = defineComponent({
      props: {
        disabled: Boolean,
      },
      setup(_, { expose }: SetupContext) {
        const disabledState = useFormDisabled(ref(false));
        expose({ disabledState });
        return () => <div></div>;
      },
    });

    it('props disabled', async () => {
      const wrapper = mount(TestComponent, {
        props: { disabled: true },
      });
      expect(wrapper.vm.disabledState).toBe(true);
    });

    it('provide props', async () => {
      const wrapper = mount(TestComponent, {
        props: { disabled: false },
        global: {
          provide: {
            formDisabled: { disabled: ref(true) },
          },
        },
      });
      expect(wrapper.vm.disabledState).toBe(true);
    });

    it('extend props', async () => {
      const wrapper = mount(TestComponent, {
        props: { disabled: false },
        global: {
          provide: {
            formDisabled: { disabled: ref(false) },
          },
        },
        setup() {
          const extendDisabled = ref(true);
          const disabledState = useFormDisabled(extendDisabled);
          return { disabledState };
        },
      });
      expect(wrapper.vm.disabledState).toBe(true);
    });

    it('return falsee when all conditions are not met', async () => {
      const wrapper = mount(TestComponent, {
        props: { disabled: false },
        global: {
          provide: {
            formDisabled: { disabled: ref(false) },
          },
        },
        setup() {
          const extendDisabled = ref(false);
          const disabledState = useFormDisabled(extendDisabled);
          return { disabledState };
        },
      });
      expect(wrapper.vm.disabledState).toBe(false);
    });
  });
});
