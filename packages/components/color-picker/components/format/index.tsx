import { defineComponent, PropType, ref, watch } from 'vue';
import { Color, getColorFormatOptions } from '@tdesign/common-js/color-picker/index';
import type { TdColorPickerProps } from '../../type';
import props from '../../props';
import { Select as TSelect, Option as TOption } from '../../../select';
import FormatInputs from './inputs';
import { useBaseClassName } from '../../hooks';
import type { TdSelectInputProps } from '../../../select-input/type';

export default defineComponent({
  name: 'FormatPanel',
  inheritAttrs: false,
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
    onModeChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    onInputChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const formatModel = ref<TdColorPickerProps['format']>(props.format);

    watch(
      () => [props.format],
      () => (formatModel.value = props.format),
    );

    /**
     * 格式化类型改变触发
     * @param v
     */
    const handleModeChange = (v: TdColorPickerProps['format']) => {
      formatModel.value = v;
      props.onModeChange(v);
    };

    return () => {
      const newProps = {
        ...props,
        format: formatModel.value,
      };
      const selectInputProps = {
        ...((props.selectInputProps as Object) || {}),
      };
      return (
        <div class={`${baseClassName.value}__format`}>
          <div class={`${baseClassName.value}__format--item`}>
            <TSelect
              size="small"
              class={`${baseClassName.value}__format-mode-select`}
              selectInputProps={{ ...selectInputProps }}
              popupProps={{
                overlayClassName: `${baseClassName.value}__select-options`,
                ...(selectInputProps as TdSelectInputProps).popupProps,
              }}
              v-model={formatModel.value}
              onChange={handleModeChange}
            >
              {getColorFormatOptions(props.enableAlpha).map((item) => (
                <TOption key={item} value={item} label={item} style={{ fontSize: '12px' }} />
              ))}
            </TSelect>
          </div>
          <div class={`${baseClassName.value}__format--item`}>
            <FormatInputs {...newProps} />
          </div>
        </div>
      );
    };
  },
});
