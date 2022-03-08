import { computed, defineComponent, PropType, reactive, watch } from 'vue';
import { throttle } from 'lodash';
import props from '../../props';
import Color from '../../utils/color';
import { Select as TSelect, Option as TOption } from '../../../select';
import TInput from '../../../input';
import TInputNumber from '../../../input-number';
import { FORMAT_INPUT_CONFIG } from './config';

export default defineComponent({
  name: 'FormatInputs',
  components: {
    TSelect,
    TOption,
    TInput,
    TInputNumber,
  },
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const inputConfig = computed(() => {
      const configs = [...FORMAT_INPUT_CONFIG[props.format]];
      if (props.enableAlpha) {
        configs.push({
          type: 'inputNumber',
          key: 'a',
          min: 0,
          max: 1,
        });
      }
      return configs;
    });

    const modelValue = reactive<any>({});
    const lastModelValue = reactive<any>({});

    const updateModelValue = () => {
      const { format, color } = props;
      let values: any = {};
      switch (format) {
        case 'HSV':
          values = color.getHsva();
          break;
        case 'HSL':
          values = color.getHsla();
          break;
        case 'RGB':
          values = color.getRgba();
          break;
        case 'CMYK':
          values = color.getCmyk();
          break;
        case 'CSS':
          values = {
            css: props.color.css,
          };
          break;
        case 'HEX':
          values = {
            hex: props.color.hex,
          };
          break;
      }
      values.a = Math.round(color.alpha * 100) / 100;
      Object.keys(values).forEach((key) => {
        modelValue[key] = values[key];
        lastModelValue[key] = values[key];
      });
    };

    updateModelValue();

    const throttleUpdate = throttle(updateModelValue, 100);

    watch(() => {
      const { saturation, hue, value, alpha } = props.color;
      return [saturation, hue, value, alpha, props.format];
    }, throttleUpdate);

    const handleChange = (key: string, v: number | string) => {
      if (v === lastModelValue[key]) {
        return;
      }
      let value = null;
      switch (props.format) {
        case 'HSV':
        case 'HSL':
        case 'RGB':
        case 'CMYK':
          value = Color.object2color(modelValue, props.format);
          break;
        case 'CSS':
          value = modelValue.css;
          break;
        case 'HEX':
          value = modelValue.hex;
          break;
      }
      emit('change', value, modelValue.a, key, v);
    };

    return {
      modelValue,
      inputConfig,
      handleChange,
    };
  },
  render() {
    const inputProps = {
      ...(this.inputProps || {}),
    };
    return (
      <div class={['input-group']}>
        {this.inputConfig.map((config) => {
          return (
            <div
              class="input-group__item"
              key={config.key}
              style={{
                flex: config.flex || 1,
              }}
            >
              {config.type === 'input' ? (
                <t-input
                  {...inputProps}
                  disabled={this.disabled}
                  v-model={this.modelValue[config.key]}
                  maxlength={this.format === 'HEX' ? 9 : undefined}
                  title={this.modelValue[config.key]}
                  onBlur={(v: string) => this.handleChange(config.key, v)}
                />
              ) : (
                <t-input-number
                  {...inputProps}
                  disabled={this.disabled}
                  v-model={this.modelValue[config.key]}
                  title={this.modelValue[config.key]}
                  min={config.min}
                  max={config.max}
                  theme="normal"
                  onBlur={(v: number) => this.handleChange(config.key, v)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
});
