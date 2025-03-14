import { computed, defineComponent, PropType, reactive, watch } from 'vue';
import { throttle } from 'lodash-es';
import props from '../../props';
import { Color } from '../../utils';
import TInput from '../../../input';
import TInputNumber from '../../../input-number';
import { FORMAT_INPUT_CONFIG } from './config';

export default defineComponent({
  name: 'FormatInputs',
  inheritAttrs: false,
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
    onInputChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const inputConfigs = computed(() => {
      const configs = [...FORMAT_INPUT_CONFIG[props.format]];
      if (props.enableAlpha) {
        configs.push({
          type: 'inputNumber',
          key: 'a',
          min: 0,
          max: 100,
          format: (value: number) => `${value}%`,
          flex: 1.15,
        });
      }
      return configs;
    });

    const modelValue = reactive<any>({});
    const lastModelValue = reactive<any>({});

    /**
     * 获取不同格式的输入输出值
     * @param type 'encode' | 'decode'
     * @returns
     */
    const getFormatColorMap = (type: 'encode' | 'decode') => {
      const { color } = props;
      if (type === 'encode') {
        return {
          HSV: color.getHsva(),
          HSL: color.getHsla(),
          RGB: color.getRgba(),
          CMYK: color.getCmyk(),
          CSS: {
            css: color.css,
          },
          HEX: {
            hex: color.hex,
          },
        };
      }
      // decode
      return {
        HSV: Color.object2color(modelValue, 'HSV'),
        HSL: Color.object2color(modelValue, 'HSL'),
        RGB: Color.object2color(modelValue, 'RGB'),
        CMYK: Color.object2color(modelValue, 'CMYK'),
        CSS: modelValue.css,
        HEX: modelValue.hex,
      };
    };

    // 更新modelValue
    const updateModelValue = () => {
      const { format, color } = props;
      // @ts-ignore
      // TODO: 从类型上看，values 可能为空，那么下面就会报错，需要同步类型处理 1.getFormatColorMap 2. format 前置过滤
      const values = getFormatColorMap('encode')[format];
      values.a = Math.round(color.alpha * 100);
      Object.keys(values).forEach((key) => {
        modelValue[key] = values[key];
        lastModelValue[key] = values[key];
      });
    };

    updateModelValue();

    const throttleUpdate = throttle(updateModelValue, 100);

    watch(() => {
      const { saturation, hue, value, alpha, css } = props.color;
      return [saturation, hue, value, alpha, css, props.format];
    }, throttleUpdate);

    const handleChange = (key: string, v: number | string) => {
      if (v === lastModelValue[key]) {
        return;
      }
      // @ts-ignore
      // TODO: 如上
      const value = getFormatColorMap('decode')[props.format];
      props.onInputChange(value, modelValue.a / 100, key, v);
    };

    return () => {
      const inputProps = {
        ...((props.inputProps as any) || {}),
      };
      return (
        <div class="input-group">
          {inputConfigs.value.map((config) => {
            return (
              <div
                class="input-group__item"
                key={config.key}
                style={{
                  flex: config.flex || 1,
                }}
              >
                {config.type === 'input' ? (
                  <TInput
                    {...inputProps}
                    align="center"
                    size="small"
                    disabled={props.disabled}
                    v-model={modelValue[config.key]}
                    maxlength={props.format === 'HEX' ? 9 : undefined}
                    title={modelValue[config.key]}
                    onBlur={(v: string) => handleChange(config.key, v)}
                    onEnter={(v: string) => handleChange(config.key, v)}
                  />
                ) : (
                  <TInputNumber
                    {...inputProps}
                    align="center"
                    size="small"
                    disabled={props.disabled}
                    v-model={modelValue[config.key]}
                    title={modelValue[config.key]}
                    min={config.min}
                    max={config.max}
                    step={1}
                    format={config.format}
                    theme="normal"
                    onBlur={(v: number) => handleChange(config.key, v)}
                    onEnter={(v: number) => handleChange(config.key, v)}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
