import type { PropType } from '@td/adapter-vue';
import { defineComponent, ref, watch } from '@td/adapter-vue';
import { upperCase } from 'lodash-es';
import props from '@td/intel/components/color-picker/props';
import type { TdSelectInputProps } from '@td/intel/components/select-input/type';
import type { TdColorPickerProps } from '@td/intel/components/color-picker/type';
import { FORMATS } from '../../const';
import type { Color } from '../../utils';
import { Option as TOption, Select as TSelect } from '../../../select';
import { useBaseClassName } from '../../hooks';
import FormatInputs from './inputs';

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

    return {
      formatModel,
      baseClassName,
      handleModeChange,
    };
  },
  render() {
    const formats: TdColorPickerProps['format'][] = [...FORMATS];
    const { baseClassName, handleModeChange } = this;
    const newProps = {
      ...this.$props,
      format: this.formatModel,
    };
    const selectInputProps = {
      ...((this.selectInputProps as Object) || {}),
    };
    return (
      <div class={`${baseClassName}__format`}>
        <div class={`${baseClassName}__format--item`}>
          <TSelect
            size="small"
            class={`${baseClassName}__format-mode-select`}
            {...selectInputProps}
            popupProps={{
              overlayClassName: `${baseClassName}__select-options`,
              ...(selectInputProps as TdSelectInputProps).popupProps,
            }}
            v-model={this.formatModel}
            onChange={handleModeChange}
          >
            {formats.map(item => (
              <TOption key={item} value={item} label={upperCase(item)} style={{ fontSize: '12px' }} />
            ))}
          </TSelect>
        </div>
        <div class={`${baseClassName}__format--item`}>
          <FormatInputs {...newProps} />
        </div>
      </div>
    );
  },
});
