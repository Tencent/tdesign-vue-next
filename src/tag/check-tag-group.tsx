import { computed, defineComponent, toRefs, h } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './check-tag-group-props';
import CheckTag from './check-tag';
import useVModel from '../hooks/useVModel';
import { CheckTagGroupValue, TdCheckTagProps } from './type';
import isFunction from 'lodash/isFunction';

export default defineComponent({
  name: 'TCheckTagGroup',

  props,

  setup(props) {
    const { value, modelValue, options } = toRefs(props);
    const componentName = usePrefixClass('check-tag-group');
    const checkTagGroupClasses = computed(() => [componentName.value]);

    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const onChange: TdCheckTagProps['onChange'] = (checked, ctx) => {
      const target = ctx.e.target as HTMLElement;
      const value = target.dataset.type === 'number' ? Number(target.dataset.value) : target.dataset.value;
      if (checked) {
        if (props.multiple) {
          setInnerValue(innerValue.value.concat(value), { e: ctx.e, type: 'check' });
        } else {
          setInnerValue([value], { e: ctx.e, type: 'check' });
        }
      } else {
        let newValue: CheckTagGroupValue = [];
        if (props.multiple) {
          newValue = innerValue.value.filter((t) => t !== value);
        }
        setInnerValue(newValue, { e: ctx.e, type: 'uncheck' });
      }
    };

    return () => {
      return (
        <div class={checkTagGroupClasses.value}>
          {options.value.map((option) => (
            <CheckTag
              key={option.value}
              checkedProps={props.checkedProps}
              uncheckedProps={props.uncheckedProps}
              checked={innerValue.value.includes(option.value)}
              onChange={onChange}
              data-value={option.value}
              data-type={typeof option.value}
              disabled={option.disabled}
              size={option.size}
            >
              {isFunction(option.content) ? option.content(h) : option.label}
            </CheckTag>
          ))}
        </div>
      );
    };
  },
});
