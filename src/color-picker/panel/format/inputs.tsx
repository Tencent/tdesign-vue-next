import { computed, defineComponent, PropType, reactive, watch } from 'vue';

import throttle from 'lodash/throttle';

import TInput from '../../../input';
import TInputNumber from '../../../input-number';
import props from '../../props';
import { Color } from '../../utils';

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
      const values: any = getFormatColorMap('encode')[format];
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
      const value = getFormatColorMap('decode')[props.format];
      props.onInputChange(value, modelValue.a / 100, key, v);
    };

    return {
      modelValue,
      inputConfigs,
      handleChange,
    };
  },
  render() {
    const inputProps = {
      ...((this.inputProps as any) || {}),
    };
    return (
      <div class="input-group">
        {this.inputConfigs.map((config) => {
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
                  disabled={this.disabled}
                  v-model={this.modelValue[config.key]}
                  maxlength={this.format === 'HEX' ? 9 : undefined}
                  title={this.modelValue[config.key]}
                  onBlur={(v: string) => this.handleChange(config.key, v)}
                  onEnter={(v: string) => this.handleChange(config.key, v)}
                />
              ) : (
                <TInputNumber
                  {...inputProps}
                  align="center"
                  size="small"
                  disabled={this.disabled}
                  v-model={this.modelValue[config.key]}
                  title={this.modelValue[config.key]}
                  min={config.min}
                  max={config.max}
                  step={1}
                  format={config.format}
                  theme="normal"
                  onBlur={(v: number) => this.handleChange(config.key, v)}
                  onEnter={(v: number) => this.handleChange(config.key, v)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
