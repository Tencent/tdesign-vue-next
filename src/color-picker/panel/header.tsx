import { defineComponent, inject, PropType, ref, watch } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import props from '../props';
import {
  COLOR_MODES,
  COMPONENT_NAME,
  TdColorMode,
  TdColorPickerPopupProvide,
  TD_COLOR_PICKER_POPUP_PROVIDE,
} from '../const';
import { Select as TSelect, Option as TOption } from '../../select';

export default defineComponent({
  name: 'ColorPickerHeader',
  components: {
    TSelect,
    TOption,
    CloseIcon,
  },
  inject: [TD_COLOR_PICKER_POPUP_PROVIDE],
  inheritAttrs: false,
  props: {
    ...props,
    mode: {
      type: String as PropType<TdColorMode>,
      default: 'color',
    },
  },
  emits: ['mode-change'],
  setup(props, { emit }) {
    const { setVisible } = inject<TdColorPickerPopupProvide>(TD_COLOR_PICKER_POPUP_PROVIDE);
    const modeValue = ref(props.mode);
    const handleClosePopup = () => setVisible(false);
    const handleModeChange = (v: string) => emit('mode-change', v);
    watch(
      () => props.mode,
      (v) => (modeValue.value = v),
    );
    return {
      modeValue,
      handleModeChange,
      handleClosePopup,
    };
  },
  render() {
    return (
      <div className={`${COMPONENT_NAME}__head`}>
        <div className={`${COMPONENT_NAME}__mode`}>
          {this.colorModes?.length === 1 ? (
            COLOR_MODES[this.colorModes[0]]
          ) : (
            <t-select bordered={false} v-model={this.modeValue} onChange={this.handleModeChange}>
              {Object.keys(COLOR_MODES).map((key) => (
                <t-option key={key} value={key} label={COLOR_MODES[key]} />
              ))}
            </t-select>
          )}
        </div>
        {this.closeBtn ? (
          <span role="button" className={`${COMPONENT_NAME}__close`} onClick={this.handleClosePopup}>
            <close-icon />
          </span>
        ) : null}
      </div>
    );
  },
});
