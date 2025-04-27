import { defineComponent, PropType, reactive, watch } from 'vue';
import { throttle } from 'lodash-es';
import { Color, getColorFormatInputs, getColorFormatMap } from '@tdesign/common-js/color-picker/index';
import props from '../../props';
import TInput from '../../../input';
import TInputNumber from '../../../input-number';

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
    const modelValue = reactive<any>({});
    const lastModelValue = reactive<any>({});

    // 更新 modelValue
    const updateModelValue = () => {
      const { format, color } = props;
      if (!color) return;
      const values = getColorFormatMap(color, 'encode')[format];
      // @ts-ignore
      values.a = Math.round(color.alpha * 100);
      Object.keys(values).forEach((key) => {
        // @ts-ignore
        modelValue[key] = values[key];
        // @ts-ignore
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
      if (v === lastModelValue[key]) return;

      if (key === 'a') {
        // 透明通道
        // eslint-disable-next-line vue/no-mutating-props, no-param-reassign
        props.color.alpha = (v as number) / 100;
      } else if (key === 'hex' || key === 'css') {
        // 纯字符串类型的格式
        props.color.update(v as string);
      } else {
        // 需要进一步转换的格式
        props.color.update(Color.object2color(props.color.alpha, props.format));
      }

      const value = getColorFormatMap(props.color, 'decode')[props.format];
      props.onInputChange(value, props.color.alpha, key, v);
    };

    return () => {
      const inputProps = {
        ...((props.inputProps as any) || {}),
      };
      return (
        <div class="input-group">
          {getColorFormatInputs(props.format, props.enableAlpha).map((config) => {
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
