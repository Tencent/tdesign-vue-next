import {
  defineComponent,
  VNode,
  ref,
  reactive,
  provide,
  computed,
  onBeforeUnmount,
  onMounted,
  watch,
  toRefs,
} from 'vue';
import props from './props';
import InputNumber from '../input-number/index';
import TSliderMark from './slider-mark';
import TSliderButton from './slider-button';
import { SliderValue } from './type';
// hooks
import { useFormDisabled } from '../form/hooks';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useSliderMark } from './hooks/useSliderMark';
import { useSliderInput } from './hooks/useSliderInput';
import { formatSlderValue, getStopStyle } from './util/common';
import { sliderPropsInjectKey } from './util/constants';
import useVModel from '../hooks/useVModel';

interface SliderButtonType {
  setPosition: (param: number) => {};
}
export default defineComponent({
  name: 'TSlider',
  components: {
    TSliderMark,
    TInputNumber: InputNumber,
    TSliderButton,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: { ...props },

  setup(props, ctx) {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('slider');
    const { STATUS } = useCommonClassName();
    const { value, modelValue } = toRefs(props) as any;
    const [sliderValue, setSliderValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const sliderContainerRef = ref<HTMLDivElement>();
    const sliderRef = ref<HTMLDivElement>();
    const firstButtonRef = ref<SliderButtonType>();
    const secondButtonRef = ref<SliderButtonType>();

    const sliderState = reactive({
      prevValue: 0 as SliderValue,
      showSteps: false,
    });
    const firstValue = ref(formatSlderValue(sliderValue.value, 'first'));
    const secondValue = ref(formatSlderValue(sliderValue.value, 'second'));
    const dragging = ref(false);
    const sliderSize = ref(1);

    const vertical = computed(() => {
      return props.layout === 'vertical';
    });

    /** ----------------- 样式计算 start ------------- */
    const containerClass = computed(() => [`${COMPONENT_NAME.value}__container`, { 'is-vertical': vertical.value }]);
    const sliderClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        {
          'is-vertical': vertical.value,
          [`${COMPONENT_NAME.value}--with-input`]: props.inputNumberProps,
          [`${COMPONENT_NAME.value}--vertical`]: vertical.value,
          [STATUS.value.disabled]: disabled.value,
        },
      ];
    });
    const sliderRailClass = computed(() => [
      `${COMPONENT_NAME.value}__rail`,
      { 'show-input': props.inputNumberProps, disabled: disabled.value },
    ]);
    const runwayStyle = computed(() => {
      return vertical.value ? { height: '100%' } : {};
    });
    const barStyle = computed(() => {
      const barStart = props.range ? `${(100 * (minValue.value - props.min)) / rangeDiff.value}%` : '0%';
      const cuttentDiff = props.range ? maxValue.value - minValue.value : firstValue.value - props.min;
      const barSize = `${(100 * cuttentDiff) / rangeDiff.value}%`;
      return vertical.value
        ? {
            height: barSize,
            bottom: barStart,
          }
        : {
            width: barSize,
            left: barStart,
          };
    });
    /** ----------------- 样式计算 end ------------- */

    // 差值范围
    const rangeDiff = computed(() => {
      return props.max - props.min;
    });
    const minValue = computed(() => {
      return Math.min(firstValue.value, secondValue.value);
    });
    const maxValue = computed(() => {
      return Math.max(firstValue.value, secondValue.value);
    });
    const steps = computed(() => {
      if (!sliderState.showSteps || props.min > props.max) return [];
      if (props.step === 0) {
        console.warn('[Element Warn][Slider]step should not be 0.');
        return [];
      }
      const stepCount = rangeDiff.value / props.step;
      const stepWidth = (100 * props.step) / rangeDiff.value;
      const result = [];
      for (let i = 1; i < stepCount; i++) {
        result.push(i * stepWidth);
      }
      if (props.range) {
        return result.filter(
          (step) =>
            step < (100 * (minValue.value - props.min)) / rangeDiff.value ||
            props.step > (100 * (maxValue.value - props.min)) / rangeDiff.value,
        );
      }
      return result.filter((step) => step > (100 * (firstValue.value - props.min)) / rangeDiff.value);
    });
    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimalArr = `${item}`.split('.');
        return decimalArr[1] ? decimalArr[1].length : 0;
      });
      return Math.max.apply(null, precisions);
    });
    // 防止值越级
    const setValues = (value: SliderValue): SliderValue => {
      const [min, max] = [props.min, props.max];
      if (min > max) {
        console.warn('[Slider] max should be greater than min.');
        return;
      }
      // 双向滑块
      if (props.range && Array.isArray(value)) {
        let [maxLimit, minLimit] = [Math.min(...value), Math.max(...value)];
        if (maxLimit > max) {
          maxLimit = firstValue.value;
        }
        if (maxLimit < min) {
          maxLimit = min;
        }
        if (minLimit < min) {
          minLimit = secondValue.value;
        }
        if (minLimit > max) {
          minLimit = max;
        }
        [firstValue.value, secondValue.value] = [maxLimit, minLimit];
        return [maxLimit, minLimit];
      }
      let preValue = value;
      if (preValue < min) {
        preValue = min;
      }
      if (preValue > max) {
        preValue = max;
      }
      return preValue;
    };
    // 只要触发修改就要有这个方法抛出change事件
    const emitChange = (value: SliderValue) => {
      let changeValue = value;
      if (changeValue === undefined) {
        if (props.range) {
          changeValue = [firstValue.value, secondValue.value];
        } else {
          changeValue = sliderState.prevValue;
        }
      }
      const fixValue: SliderValue = setValues(changeValue);
      setSliderValue(fixValue);
    };

    const resetSize = () => {
      if (sliderRef.value) {
        sliderSize.value = sliderRef.value[`client${vertical.value ? 'Height' : 'Width'}`];
      }
    };

    // 初始化传入的value
    const init = () => {
      let valuetext: string | number;
      if (props.range) {
        if (Array.isArray(sliderValue.value)) {
          firstValue.value = Math.max(props.min || 0, sliderValue.value[0]);
          secondValue.value = Math.min(props.max || 100, sliderValue.value[1]);
        } else {
          firstValue.value = props.min || 0;
          secondValue.value = props.max || 100;
        }
        sliderState.prevValue = [firstValue.value, secondValue.value];
        valuetext = `${firstValue.value}-${secondValue.value}`;
      } else {
        if (typeof sliderValue.value !== 'number') {
          firstValue.value = props.min;
        } else {
          firstValue.value = Math.min(props.max, Math.max(props.min, sliderValue.value as number));
        }
        sliderState.prevValue = firstValue.value;
        valuetext = String(firstValue.value);
      }
      if (sliderContainerRef.value) {
        sliderContainerRef.value.setAttribute('aria-valuetext', valuetext);
      }
      resetSize();
      window.addEventListener('resize', resetSize);
    };
    // 相应button的位置
    const setPosition = (percent: number): void => {
      let targetValue = (percent * rangeDiff.value) / 100;
      targetValue = props.min + targetValue;
      if (!props.range && firstButtonRef.value) {
        firstButtonRef.value.setPosition(percent);
        return;
      }
      let button;
      if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
        button = firstValue.value < secondValue.value ? 'button1' : 'button2';
      } else {
        button = firstValue.value > secondValue.value ? 'button1' : 'button2';
      }
      if (button === 'button1' && firstButtonRef.value) {
        firstButtonRef.value.setPosition(percent);
      }
      if (button === 'button2' && secondButtonRef.value) {
        secondButtonRef.value.setPosition(percent);
      }
    };

    // 全局点击
    const onSliderClick = (event: MouseEvent): void => {
      if (disabled.value || dragging.value) {
        return;
      }
      if (!sliderRef.value) return;
      resetSize();
      let value = 0;
      if (vertical.value) {
        const sliderOffsetBottom = sliderRef.value.getBoundingClientRect().bottom;
        value = ((sliderOffsetBottom - event.clientY) / sliderSize.value) * 100;
        setPosition(value);
      } else {
        const sliderOffsetLeft = sliderRef.value.getBoundingClientRect().left;
        value = ((event.clientX - sliderOffsetLeft) / sliderSize.value) * 100;
        setPosition(value);
      }
    };

    // mark 点击触发修改事件
    const changeValue = (point: number) => {
      if (disabled.value || dragging.value) {
        return;
      }
      resetSize();
      const value = Number((point / rangeDiff.value) * 100);
      setPosition(value);
      emitChange(point);
    };

    /** 副作用监听 */
    watch(
      () => sliderValue.value,
      (newVal) => {
        if (dragging.value === true) return;
        if (Array.isArray(newVal) && props.range) {
          [firstValue.value, secondValue.value] = newVal;
        } else {
          firstValue.value = newVal as number;
        }
      },
    );

    watch([firstValue, secondValue, dragging], (newStates, prevStates) => {
      if (newStates[0] !== prevStates[0]) {
        if (props.range) {
          emitChange([minValue.value, maxValue.value]);
        } else {
          emitChange(firstValue.value);
        }
      }
      if (newStates[1] !== prevStates[1]) {
        if (props.range) {
          emitChange([minValue.value, maxValue.value]);
        }
      }
      if (newStates[2] !== prevStates[2] && newStates[2] === false) {
        init();
      }
    });

    /** 挂载&卸载 */
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resetSize);
    });

    /** -------------------------- 渲染相关逻辑 start --------------------------  */
    const markConfig = computed(() => ({
      max: props.max,
      min: props.min,
      marks: props.marks,
      vertical: vertical.value,
      prefixName: COMPONENT_NAME.value,
    }));
    const renderMask = useSliderMark(markConfig);

    const inputConfig = computed(() => ({
      max: props.max,
      min: props.min,
      inputNumberProps: props.inputNumberProps,
      step: props.step,
      prefixName: COMPONENT_NAME.value,
      vertical: vertical.value,
      disabled: disabled.value,
    }));
    const renderInputNumber = useSliderInput(inputConfig);

    const renderInputButton = (): VNode => {
      const firstInputVal = props.range ? firstValue.value : (sliderState.prevValue as number);
      const firstInputOnChange = (v: number) => {
        firstValue.value = v;
        props.range ? (firstValue.value = v) : (sliderState.prevValue = v);
      };
      const secondInputVal = secondValue.value;
      const secondInputOnChange = (v: number) => {
        secondValue.value = v;
      };
      return (
        <div
          class={[
            `${COMPONENT_NAME.value}__input-container`,
            {
              'is-vertical': vertical.value,
            },
          ]}
        >
          {renderInputNumber(firstInputVal, firstInputOnChange)}
          {props.range && <div class={`${COMPONENT_NAME.value}__center-line`} />}
          {props.range && renderInputNumber(secondInputVal, secondInputOnChange)}
        </div>
      );
    };
    /** -------------------------- 渲染相关逻辑 end --------------------------  */

    /** 父子共用状态&方法 */
    const toggleDragging = (toState: boolean) => {
      dragging.value = toState;
    };

    const { min, max, step } = toRefs(props);
    provide(
      sliderPropsInjectKey,
      reactive({
        min,
        max,
        step,
        dragging,
        toggleDragging,
        precision,
        disabled,
        resetSize,
        sliderSize,
      }),
    );

    return () => (
      <div class={containerClass.value} ref={sliderContainerRef}>
        <div
          class={sliderClass.value}
          role="slider"
          aria-valuemin={props.min}
          aria-valuemax={props.max}
          aria-orientation={props.layout}
          aria-disabled={disabled.value}
          tooltip-props={props.tooltipProps}
        >
          <div class={sliderRailClass.value} style={runwayStyle.value} onClick={onSliderClick} ref={sliderRef}>
            <div class={`${COMPONENT_NAME.value}__track`} style={barStyle.value} />
            <t-slider-button
              vertical={vertical.value}
              value={firstValue.value}
              ref={firstButtonRef}
              disabled={disabled.value}
              tooltip-props={props.tooltipProps}
              onInput={(v: number) => {
                firstValue.value = v;
              }}
            />
            {props.range && (
              <t-slider-button
                vertical={vertical.value}
                value={secondValue.value}
                ref={secondButtonRef}
                disabled={disabled.value}
                tooltip-props={props.tooltipProps}
                onInput={(v: number) => {
                  secondValue.value = v;
                }}
              />
            )}
            {sliderState.showSteps && (
              <div>
                {steps.value.map((item, key) => (
                  <div class={`${COMPONENT_NAME.value}__stop`} key={key} style={getStopStyle(item, vertical.value)} />
                ))}
              </div>
            )}
            {renderMask(changeValue)}
          </div>
        </div>
        {props.inputNumberProps && renderInputButton()}
      </div>
    );
  },
});
