import { defineComponent, h, VNodeChild, computed, watch, toRefs } from 'vue';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import TLoading from '../loading';
import props from './props';
import { TNodeReturnValue } from '../common';

// hooks
import { useFormDisabled } from '../form/hooks';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TSwitch',
  props: { ...props },

  setup(props, { slots }) {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('switch');
    const { STATUS, SIZE } = useCommonClassName();
    // values
    const { value, modelValue } = toRefs(props);
    const [innerValue, setSwitchVal] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const activeValue = computed(() => {
      if (props.customValue && props.customValue.length > 0) {
        return props.customValue[0];
      }
      return true;
    });
    const inactiveValue = computed(() => {
      if (props.customValue && props.customValue.length > 1) {
        return props.customValue[1];
      }
      return false;
    });

    // methods
    function handleToggle() {
      const checked = innerValue.value === activeValue.value ? inactiveValue.value : activeValue.value;
      // emits
      setSwitchVal(checked);
    }

    function toggle() {
      if (disabled.value || props.loading) {
        return;
      }
      handleToggle();
    }

    // classes
    const classes = computed(() => [
      `${COMPONENT_NAME.value}`,
      SIZE.value[props.size],
      {
        [STATUS.value.disabled]: disabled.value,
        [STATUS.value.loading]: props.loading,
        [STATUS.value.checked]: innerValue.value === activeValue.value || props.modelValue === activeValue.value,
      },
    ]);
    const nodeClasses = computed(() => {
      return [
        `${COMPONENT_NAME.value}__handle`,
        {
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.loading]: props.loading,
        },
      ];
    });
    const contentClasses = computed(() => {
      return [
        `${COMPONENT_NAME.value}__content`,
        SIZE.value[props.size],
        {
          [STATUS.value.disabled]: disabled.value,
        },
      ];
    });

    watch(
      innerValue,
      (val) => {
        if (props.customValue && props.customValue.length && !props.customValue.includes(val)) {
          throw new Error(`value is not in ${JSON.stringify(props.customValue)}`);
        }
      },
      {
        immediate: true,
      },
    );

    const content = computed<VNodeChild>(() => {
      if (typeof props.label === 'function') {
        return props.label(h, { value: innerValue.value });
      }
      if (typeof props.label === 'string') {
        return props.label;
      }
      if (Array.isArray(props.label)) {
        const label = innerValue.value === activeValue.value ? props.label[0] : props.label[1];
        if (!label) return;
        if (typeof label === 'string') {
          return label;
        }
        if (typeof label === 'function') {
          return label(h);
        }
      }
      if (slots.label) {
        return slots.label({ value: innerValue.value });
      }
      return null;
    });
    return () => {
      let switchContent: VNodeChild;
      let loadingContent: TNodeReturnValue;
      if (props.loading) {
        loadingContent = <TLoading size="small" />;
      } else if (content.value) {
        switchContent = content.value;
      }

      return (
        <div class={classes.value} disabled={disabled.value} onClick={toggle}>
          <span class={nodeClasses.value}>{loadingContent}</span>
          <div class={contentClasses.value}>{switchContent}</div>
        </div>
      );
    };
  },
});
