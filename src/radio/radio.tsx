import { defineComponent, inject, toRefs, computed } from 'vue';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { omit } from '../utils/helper';
import props from './props';
import { RadioGroupInjectionKey, RadioButtonInjectionKey } from './constants';

// hooks
import { useFormDisabled } from '../form/hooks';
import useVModel, { UPDATE_MODEL } from '../hooks/useVModel';
import { useContent } from '../hooks/tnode';

function getValidAttrs(obj: Record<string, any>): Record<string, any> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TRadio',
  inheritAttrs: false,
  props: { ...props },
  emits: [UPDATE_MODEL],

  setup(props, { attrs }) {
    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(checked, modelValue, props.defaultChecked, props.onChange);
    const radioChecked = computed(() => (radioGroup ? props.value === radioGroup.value : innerChecked.value));

    const radioGroup = inject(RadioGroupInjectionKey, undefined);

    /** Event */
    const handleChange = (e: Event) => {
      if (radioGroup?.setValue) {
        radioGroup.setValue(props.value, { e });
      } else {
        const { checked } = e.target as HTMLInputElement;
        setInnerChecked(checked, { e });
      }
    };
    const handleClick = (e: MouseEvent) => {
      props.onClick?.({ e });
      if (!radioChecked.value || !props.allowUncheck) return;
      if (radioGroup) {
        radioGroup.setValue(undefined, { e });
      } else {
        setInnerChecked(false, { e });
      }
    };
    const inputEvents = computed(() =>
      getValidAttrs({
        focus: attrs.onFocus,
        blur: attrs.onBlur,
        keydown: attrs.onKeydown,
        keyup: attrs.onKeyup,
        keypresss: attrs.onKeypresss,
      }),
    );
    const wrapperAttrs = computed(() => {
      const events = [...Object.keys(inputEvents.value), 'input', 'change'].map(
        (str) => `on${str[0].toUpperCase()}${str.slice(1)}`,
      );
      return omit(attrs, events);
    });
    /** Event END */

    // extend radioGroup disabled props
    const groupDisabled = computed(() => radioGroup?.disabled);
    const disabled = useFormDisabled(groupDisabled);

    // attribute
    const inputProps = computed(() => ({
      name: radioGroup ? radioGroup.name : props.name,
      checked: radioChecked.value,
      disabled: disabled.value,
      value: props.value,
    }));

    /** Style */
    const { STATUS } = useCommonClassName();
    const radioButton = inject(RadioButtonInjectionKey, undefined);
    const radioBtnName = usePrefixClass('radio-button');
    const COMPONENT_NAME = usePrefixClass('radio');
    const prefixCls = computed(() => (radioButton ? radioBtnName.value : COMPONENT_NAME.value));
    const inputClass = computed(() => [
      `${prefixCls.value}`,
      {
        [STATUS.value.checked]: inputProps.value.checked,
        [STATUS.value.disabled]: inputProps.value.disabled,
      },
    ]);
    /** Style END */

    const renderContent = useContent();

    return () => (
      <label class={inputClass.value} {...wrapperAttrs.value}>
        <input
          type="radio"
          class={`${prefixCls.value}__former`}
          {...inputEvents.value}
          {...inputProps.value}
          onChange={handleChange}
          onClick={handleClick}
        />
        <span class={`${prefixCls.value}__input`}></span>
        <span class={`${prefixCls.value}__label`}>{renderContent('default', 'label')}</span>
      </label>
    );
  },
});
