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
import { RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../../radio';

export default defineComponent({
  name: 'ColorPickerHeader',
  components: {
    CloseIcon,
    TRadioGroup,
    TRadioButton,
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
            <t-radio-group
              variant="default-filled"
              size="small"
              v-model={this.modeValue}
              onChange={this.handleModeChange}
            >
              {Object.keys(COLOR_MODES).map((key) => (
                <t-radio-button key={key} value={key}>
                  {COLOR_MODES[key]}
                </t-radio-button>
              ))}
            </t-radio-group>
          )}
        </div>
        {this.closeBtn ? (
          <span
            role="button"
            class={[`${COMPONENT_NAME}__icon`, `${COMPONENT_NAME}__close`]}
            onClick={this.handleClosePopup}
          >
            <close-icon />
          </span>
        ) : null}
      </div>
    );
  },
});
