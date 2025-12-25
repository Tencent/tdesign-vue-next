import {
  VNode,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  computed,
  onMounted,
  watch,
  nextTick,
  toRefs,
  onUnmounted,
} from 'vue';
import { isNil, isEqual, isString, isNumber, throttle, isFunction } from 'lodash-es';

import props from './radio-group-props';
import type { RadioOptionObj, RadioOption, TdRadioGroupProps } from './type';
import TRadio from './radio';
import TRadioButton from './radio-button';
import { RadioGroupInjectionKey } from './consts';
import {
  useVModel,
  usePrefixClass,
  useTNodeDefault,
  useResizeObserver,
  useCommonClassName,
} from '@tdesign/shared-hooks';

import { useKeyboard } from './hooks';

import { useMutationObserver } from '../watermark/hooks';
import type { UseMutationObserverReturn } from '../watermark/hooks';

export default defineComponent({
  name: 'TRadioGroup',
  props,
  setup(props) {
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, 'onChange');

    /** calculate bar style */
    const radioGroupRef = ref<HTMLElement>();
    const radioBtnName = usePrefixClass('radio-button');
    const { STATUS, SIZE } = useCommonClassName();

    const updateInnerValue: TdRadioGroupProps['onChange'] = (value, context) => {
      if (isEqual(value, innerValue.value)) return;
      setInnerValue(value, context);
    };

    // 键盘操作
    useKeyboard(radioGroupRef, updateInnerValue);

    const checkedClassName = computed(() => `.${radioBtnName.value}.${STATUS.value.checked}`);

    const barStyle = ref({ width: '0px', height: '0px', left: '0px', top: '0px', 'transition-property': 'none' });

    const calcDefaultBarStyle = () => {
      const div = document.createElement('div');
      div.setAttribute('style', 'position: absolute; visibility: hidden;');
      div.appendChild(radioGroupRef.value.cloneNode(true));
      document.body.appendChild(div);

      const defaultCheckedRadio: HTMLElement = div.querySelector(checkedClassName.value);
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = defaultCheckedRadio;
      barStyle.value = {
        ...barStyle.value,
        width: `${offsetWidth}px`,
        height: `${offsetHeight}px`,
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
      };
      document.body.removeChild(div);
    };

    const calcBarStyle = (disableAnimation = false) => {
      if (props.variant === 'outline') return;

      const checkedRadio: HTMLElement = radioGroupRef.value.querySelector(checkedClassName.value);

      const transitionProperty = disableAnimation ? 'none' : 'all';
      if (!checkedRadio) {
        barStyle.value = {
          'transition-property': transitionProperty,
          width: '0px',
          height: '9px',
          left: '0px',
          top: '0px',
        };
        return;
      }

      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = checkedRadio;
      // current node is not rendered，fallback to default render
      if (!offsetWidth) {
        calcDefaultBarStyle();
      } else {
        barStyle.value = {
          'transition-property': transitionProperty,
          width: `${offsetWidth}px`,
          height: `${offsetHeight}px`,
          left: `${offsetLeft}px`,
          top: `${offsetTop}px`,
        };
      }
    };

    let observerReturn: UseMutationObserverReturn;

    watch(innerValue, async () => {
      await nextTick();
      calcBarStyle();
    });

    onMounted(() => {
      calcBarStyle(true);
      useResizeObserver(
        radioGroupRef,
        throttle(async () => {
          await nextTick();
          calcBarStyle();
        }, 300),
      );

      const checkedRadioLabel: HTMLElement = radioGroupRef.value.querySelector(
        `${checkedClassName.value} .${radioBtnName.value}__label`,
      );
      if (checkedRadioLabel) {
        observerReturn = useMutationObserver(
          checkedRadioLabel,
          (mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.type === 'characterData') {
                calcBarStyle();
              }
            });
          },
          {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true,
          },
        );
      }
    });
    onUnmounted(() => {
      observerReturn?.stop();
    });
    /** calculate bar style end */

    const { name, disabled, readonly } = toRefs(props);
    provide(
      RadioGroupInjectionKey,
      reactive({
        name,
        disabled,
        readonly,
        value: innerValue,
        allowUncheck: props.allowUncheck,
        setValue: updateInnerValue,
      }),
    );

    const radioGroupName = usePrefixClass('radio-group');
    const renderSlot = useTNodeDefault();
    const renderBlock = (): VNode => {
      if (props.variant.includes('filled') && !isNil(innerValue.value))
        return <div style={barStyle.value} class={`${radioGroupName.value}__bg-block`} />;
    };
    const renderOptions = (): VNode[] => {
      return props.options?.map((option: RadioOption) => {
        let opt = option as RadioOptionObj;
        if (isNumber(option) || isString(option)) {
          opt = { value: option, label: option.toString() };
        }
        const RadioComponent = props.theme === 'button' ? TRadioButton : TRadio;
        return (
          <RadioComponent
            key={`radio-group-options-${opt.value}-${Math.random()}`}
            name={props.name}
            checked={innerValue.value === opt.value}
            disabled={'disabled' in opt ? opt.disabled : props.disabled}
            value={opt.value}
          >
            {isFunction(opt.label) ? opt.label(h) : opt.label}
          </RadioComponent>
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
