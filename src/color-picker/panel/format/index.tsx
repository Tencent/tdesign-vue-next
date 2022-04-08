import { defineComponent, PropType, ref, watch } from 'vue';
import upperCase from 'lodash/upperCase';
import { TdColorPickerProps } from '../../type';
import props from '../../props';
import { FORMATS } from '../../const';
import { Color } from '../../utils';
import { Select as TSelect, Option as TOption } from '../../../select';
import { Input as TInput } from '../../../input';
import FormatInputs from './inputs';
import { useBaseClassName } from '../../hooks';

export default defineComponent({
  name: 'FormatPanel',
  components: {
    TSelect,
    TInput,
    TOption,
    FormatInputs,
  },
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
      <div className={`${baseClassName}__format`}>
        <div className={`${baseClassName}__format--item`}>
          <t-select
            {...selectInputProps}
            popupProps={{
              overlayClassName: `${baseClassName}__select-options`,
            }}
            v-model={this.formatModel}
            onChange={handleModeChange}
          >
            {formats.map((item) => (
              <t-option key={item} value={item} label={upperCase(item)} style={{ fontSize: '12px' }} />
            ))}
          </t-select>
        </div>
        <div className={`${baseClassName}__format--item`}>
          <format-inputs {...newProps} />
        </div>
      </div>
    );
  },
});
