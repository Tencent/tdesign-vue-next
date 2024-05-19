import { defineComponent, inject, toRefs, computed, ref } from '@td/adapter-vue';
import { omit } from '@td/adapter-utils';
import { usePrefixClass, useCommonClassName, useVModel, useContent } from '@td/adapter-hooks';
import props from '@td/intel/components/radio/props';
import { RadioGroupInjectionKey, RadioButtonInjectionKey } from './constants';

// hooks
import { isUndefined } from 'lodash-es';
import { isString } from 'lodash-es';

function getValidAttrs(obj: Record<string, any>): Record<string, any> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!isUndefined(obj[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TRadio',
  inheritAttrs: false,
  props,

  setup(props, { attrs }) {
    const inputRef = ref();
    const { checked, modelValue } = toRefs(props);
    const [innerChecked, setInnerChecked] = useVModel(
      checked,
      modelValue,
      props.defaultChecked,
      props.onChange,
      'checked',
    );

    const radioChecked = computed(() => (radioGroup ? props.value === radioGroup.value : innerChecked.value));

    const radioGroup = inject(RadioGroupInjectionKey, undefined);

    const allowUncheck = computed(() => Boolean(props.allowUncheck || radioGroup?.allowUncheck));

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const onLabelClick = (e: MouseEvent) => {
      if (disabled.value || props.readonly) return;
      props.onClick?.({ e });

      if (radioChecked.value && !allowUncheck.value) return;

      if (radioGroup) {
        const value = radioChecked.value && allowUncheck.value ? undefined : props.value;
        radioGroup.setValue(value, { e });
      } else {
        const value = allowUncheck.value ? !radioChecked.value : true;
        setInnerChecked(value, { e });
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
    // const disabled = useFormDisabled(groupDisabled);
    // vue23:! 
    const disabled = ref(false);

    // attribute
    const inputProps = computed(() => ({
      name: radioGroup ? radioGroup.name : props.name,
      checked: radioChecked.value,
      disabled: disabled.value,
      readonly: props.readonly,
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
      <label
        ref={inputRef}
        class={inputClass.value}
        {...wrapperAttrs.value}
        tabindex={disabled.value ? undefined : '0'}
        onClick={onLabelClick}
      >
        <input
          type="radio"
          class={`${prefixCls.value}__former`}
          {...inputEvents.value}
          {...inputProps.value}
          onClick={handleClick}
          tabindex="-1"
          data-value={isString(props.value) ? `'${props.value}'` : props.value}
          data-allow-uncheck={allowUncheck.value || undefined}
        />
        <span class={`${prefixCls.value}__input`}></span>
        <span class={`${prefixCls.value}__label`}>{renderContent('default', 'label')}</span>
      </label>
    );
  },
});
