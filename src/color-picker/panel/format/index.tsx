import { defineComponent, PropType, ref, watch } from 'vue';
import { upperCase } from 'lodash';
import { TdColorPickerProps } from '../../type';
import props from '../../props';
import { COMPONENT_NAME, FORMATS } from '../../const';
import Color from '../../utils/color';
import { Select as TSelect, Option as TOption } from '../../../select';
import { Input as TInput } from '../../../input';
import FormatInputs from './inputs';

export default defineComponent({
  name: 'FormatPanel',
  components: {
    TSelect,
    TInput,
    TOption,
    FormatInputs,
  },
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
  },
  emits: ['mode-change', 'change'],
  setup(props, { emit }) {
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
      emit('mode-change', v);
    };

    /**
     * 颜色变化时触发
     * @param input
     * @param alpha
     */
    const handleColorChange = (input: string, alpha?: number) => {
      emit('change', input, alpha);
    };

    return {
      formatModel,
      handleModeChange,
      handleColorChange,
    };
  },
  render() {
    const formats: TdColorPickerProps['format'][] = [...FORMATS];
    const { handleModeChange, handleColorChange } = this;
    const newProps = {
      ...this.$props,
      format: this.formatModel,
    };
    const selectInputProps = {
      ...((this.selectInputProps as Object) || {}),
    };
    delete newProps.onChange;
    delete newProps.onPaletteBarChange;
    return (
      <div className={`${COMPONENT_NAME}__format`}>
        <div className={`${COMPONENT_NAME}__format--item`}>
          <t-select {...selectInputProps} v-model={this.formatModel} onChange={handleModeChange}>
            {formats.map((item) => (
              <t-option key={item} value={item} label={upperCase(item)} style={{ fontSize: '12px' }} />
            ))}
          </t-select>
        </div>
        <div className={`${COMPONENT_NAME}__format--item`}>
          <format-inputs {...newProps} onChange={handleColorChange} />
        </div>
      </div>
    );
  },
});
