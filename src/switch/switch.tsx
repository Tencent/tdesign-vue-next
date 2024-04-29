import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import { defineComponent, h, VNodeChild, computed, watch, toRefs } from 'vue';

import { TNodeReturnValue } from '../common';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useDisabled } from '../hooks/useDisabled';
import useVModel from '../hooks/useVModel';
import TLoading from '../loading';

import props from './props';

// hooks

export default defineComponent({
  name: 'TSwitch',
  props: { ...props },

  setup(props, { slots }) {
    const disabled = useDisabled();
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
    function handleToggle(e: MouseEvent) {
      const checked = innerValue.value === activeValue.value ? inactiveValue.value : activeValue.value;
      // emits
      setSwitchVal(checked, { e });
    }

    function toggle(e: MouseEvent) {
      if (disabled.value || props.loading) {
        return;
      }
      handleToggle(e);
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
      if (isFunction(props.label)) {
        return props.label(h, { value: innerValue.value });
      }
      if (isString(props.label)) {
        return props.label;
      }
      if (isArray(props.label) && props.label.length) {
        const label = innerValue.value === activeValue.value ? props.label[0] : props.label[1];
        if (!label) return;
        if (isString(label)) {
          return label;
        }
        if (isFunction(label)) {
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
