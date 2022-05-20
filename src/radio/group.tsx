import { VNode, defineComponent, h, provide, reactive, ref, computed, onMounted, watch, nextTick, toRefs } from 'vue';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import props from './radio-group-props';
import { RadioOptionObj, RadioOption } from './type';
import Radio from './radio';
import { RadioGroupInjectionKey } from './constants';

import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';
import { useTNodeDefault } from '../hooks/tnode';

export default defineComponent({
  name: 'TRadioGroup',
  props: { ...props },
  setup(props) {
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    /** calculate bar style */
    const radioGroupRef = ref<HTMLElement>();
    const radioBtnName = usePrefixClass('radio-button');
    const { STATUS, SIZE } = useCommonClassName();

    const checkedClassName = computed(() => `.${radioBtnName.value}.${STATUS.value.checked}`);

    const barStyle = ref({ width: '0px', left: '0px' });

    const calcDefaultBarStyle = () => {
      const div = document.createElement('div');
      div.setAttribute('style', 'position: absolute; visibility: hidden;');
      div.appendChild(radioGroupRef.value.cloneNode(true));
      document.body.appendChild(div);

      const defaultCheckedRadio: HTMLElement = div.querySelector(checkedClassName.value);
      const { offsetWidth, offsetLeft } = defaultCheckedRadio;
      barStyle.value = { width: `${offsetWidth}px`, left: `${offsetLeft}px` };
      document.body.removeChild(div);
    };

    const calcBarStyle = () => {
      if (props.variant === 'outline') return;

      const checkedRadio: HTMLElement = radioGroupRef.value.querySelector(checkedClassName.value);
      if (!checkedRadio) return;

      const { offsetWidth, offsetLeft } = checkedRadio;
      // current node is not rendered，fallback to default render
      if (!offsetWidth) {
        calcDefaultBarStyle();
      } else {
        barStyle.value = { width: `${offsetWidth}px`, left: `${offsetLeft}px` };
      }
    };

    watch(innerValue, async () => {
      await nextTick();
      calcBarStyle();
    });
    onMounted(() => {
      calcBarStyle();
    });
    /** calculate bar style end */

    const { name, disabled } = toRefs(props);
    provide(
      RadioGroupInjectionKey,
      reactive({
        name,
        disabled,
        value: innerValue,
        setValue: setInnerValue,
      }),
    );

    const radioGroupName = usePrefixClass('radio-group');
    const renderSlot = useTNodeDefault();
    const renderBlock = (): VNode => {
      if (props.variant.includes('filled'))
        return <div style={barStyle.value} class={`${radioGroupName.value}__bg-block`} />;
    };
    const renderOptions = (): VNode[] => {
      return props.options?.map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (isNumber(option) || isString(option)) {
          opt = { value: option, label: option.toString() };
        }
        return (
          <Radio
            key={`radio-group-options-${opt.value}-${Math.random()}`}
            name={props.name}
            checked={innerValue.value === opt.value}
            disabled={'disabled' in opt ? opt.disabled : props.disabled}
            value={opt.value}
          >
            {typeof opt.label === 'function' ? opt.label(h) : opt.label}
          </Radio>
        );
      });
    };

    const groupClass = computed(() => [
      `${radioGroupName.value}`,
      SIZE.value[props.size],
      {
        [`${radioGroupName.value}__outline`]: props.variant === 'outline',
        [`${radioGroupName.value}--filled`]: props.variant.includes('filled'),
        [`${radioGroupName.value}--primary-filled`]: props.variant === 'primary-filled',
      },
    ]);

    return () => (
      <div ref={radioGroupRef} class={groupClass.value}>
        {renderSlot('default') || renderOptions()}
        {renderBlock()}
      </div>
    );
  },
});
