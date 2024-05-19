import { isFunction } from 'lodash-es';
import { computed, defineComponent, toRefs, H } from '@td/adapter-vue';

import { usePrefixClass, useVModel } from '@td/adapter-hooks';
import props from '@td/intel/components/tag/check-tag-group-props';
import type { CheckTagGroupOption, CheckTagGroupValue, TdCheckTagProps } from '@td/intel/components/tag/type';

import CheckTag from './check-tag';

export default defineComponent({
  name: 'TCheckTagGroup',
  props,
  setup(props, context) {
    const { value, modelValue, options } = toRefs(props);
    const componentName = usePrefixClass('check-tag-group');
    const checkTagGroupClasses = computed(() => [componentName.value]);

    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const onCheckTagChange: TdCheckTagProps['onChange'] = (checked, ctx) => {
      const value = ctx.value;
      if (checked) {
        if (props.multiple) {
          setInnerValue(innerValue.value.concat(value), { e: ctx.e, type: 'check', value });
        } else {
          setInnerValue([value], { e: ctx.e, type: 'check', value });
        }
      } else {
        let newValue: CheckTagGroupValue = [];
        if (props.multiple) {
          newValue = innerValue.value.filter((t) => t !== value);
        }
        setInnerValue(newValue, { e: ctx.e, type: 'uncheck', value });
      }
    };

    const getTagContent = (option: CheckTagGroupOption) => {
      if (context.slots.option) return context.slots.option(option);
      if (context.slots.label) return context.slots.label(option);
      if (option.label) {
        return isFunction(option.label) ? option.label(H) : option.label;
      }
      if (option.content && isFunction(option.content)) return option.content(H);
      if (option.default && isFunction(option.default)) return option.default(H);
      return option.value;
    };

    return () => {
      return (
        <div class={checkTagGroupClasses.value}>
          {(options.value || []).map((option) => (
            <CheckTag
              key={option.value}
              value={option.value}
              checkedProps={props.checkedProps}
              uncheckedProps={props.uncheckedProps}
              checked={innerValue.value.includes(option.value)}
              onChange={onCheckTagChange}
              disabled={option.disabled}
              size={option.size}
              data-value={option.value}
            >
              {getTagContent(option)}
            </CheckTag>
          ))}
        </div>
      );
    };
  },
});
